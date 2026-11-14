import { randomUUID } from 'node:crypto';
import { get, list, put } from '@vercel/blob';
import { handleOptions, jsonResponse } from './_cors.js';

const COMMENTS_PREFIX = 'comments/';
const MAX_COMMENTS = 50;
const AVATAR_DATA_URL_RE = /^data:image\/(webp|png|jpeg|gif);base64,[A-Za-z0-9+/=]+$/;
const MAX_AVATAR_LEN = 65536;

function normalizeIsoDate(raw) {
  if (typeof raw !== 'string' || !raw.trim()) return new Date().toISOString();
  const ms = Date.parse(raw);
  if (!Number.isFinite(ms)) return new Date().toISOString();
  const now = Date.now();
  const safeMs = ms > now + 60000 ? now : ms;
  return new Date(safeMs).toISOString();
}

function makeBlobPathname(createdAtIso, id) {
  const ts = Math.max(0, Date.parse(createdAtIso) || Date.now());
  const inverted = String(9999999999999 - ts).padStart(13, '0');
  return `${COMMENTS_PREFIX}${inverted}-${id}.json`;
}

async function readCommentBlob(pathname) {
  try {
    const res = await get(pathname, { access: 'private' });
    if (!res || res.statusCode !== 200 || !res.stream) return null;
    const data = await new Response(res.stream).json();
    if (!data || typeof data.name !== 'string' || typeof data.message !== 'string') return null;
    return {
      id: String(data.id || pathname),
      name: data.name.slice(0, 80),
      message: data.message.slice(0, 1000),
      avatar: typeof data.avatar === 'string' && AVATAR_DATA_URL_RE.test(data.avatar) ? data.avatar : '',
      createdAt: normalizeIsoDate(data.createdAt),
    };
  } catch (err) {
    console.error('Failed reading comment blob:', pathname, err);
    return null;
  }
}

async function fetchLatestComments(limit = MAX_COMMENTS) {
  const { blobs } = await list({ prefix: COMMENTS_PREFIX, limit });
  if (!blobs.length) return [];
  const items = await Promise.all(blobs.map((b) => readCommentBlob(b.pathname)));
  return items
    .filter(Boolean)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export async function OPTIONS(request) {
  return handleOptions(request);
}

export async function GET(request) {
  try {
    const comments = await fetchLatestComments(MAX_COMMENTS);
    return jsonResponse(
      request,
      { comments },
      200,
      { 'Cache-Control': 'no-store, max-age=0' }
    );
  } catch (err) {
    console.error('GET /api/comments error:', err);
    return jsonResponse(
      request,
      { error: 'Gagal memuat komentar.' },
      500,
      { 'Cache-Control': 'no-store' }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return jsonResponse(request, { error: 'Payload komentar tidak valid.' }, 400);
    }

    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 80) : '';
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 1000) : '';
    if (!name || !message) {
      return jsonResponse(request, { error: 'Nama dan komentar wajib diisi.' }, 400);
    }

    let avatar = '';
    if (typeof body.avatar === 'string' && body.avatar.trim()) {
      const candidate = body.avatar.trim();
      if (candidate.length > MAX_AVATAR_LEN || !AVATAR_DATA_URL_RE.test(candidate)) {
        return jsonResponse(request, { error: 'Format foto profil tidak didukung atau terlalu besar.' }, 400);
      }
      avatar = candidate;
    }

    const createdAt = normalizeIsoDate(body.createdAt);

    // Prevent accidental double-submission or duplicate migration
    const recent = await fetchLatestComments(15);
    const dup = recent.find(
      (item) =>
        item.name === name &&
        item.message === message &&
        Math.abs(Date.parse(item.createdAt) - Date.parse(createdAt)) < 60000
    );
    if (dup) {
      return jsonResponse(request, { comment: dup, deduplicated: true }, 200, { 'Cache-Control': 'no-store' });
    }

    const id = randomUUID().replace(/-/g, '').slice(0, 16);
    const entry = { id, name, message, avatar, createdAt };
    const pathname = makeBlobPathname(createdAt, id);

    await put(pathname, JSON.stringify(entry), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
    });

    return jsonResponse(
      request,
      { comment: entry },
      201,
      { 'Cache-Control': 'no-store' }
    );
  } catch (err) {
    console.error('POST /api/comments error:', err);
    return jsonResponse(
      request,
      { error: 'Gagal menyimpan komentar ke server.' },
      500,
      { 'Cache-Control': 'no-store' }
    );
  }
}
