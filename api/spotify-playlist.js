import { handleOptions, jsonResponse } from './_cors.js';

const DEFAULT_PLAYLIST_ID = '0cF2K9ACAqGr0nDEIBNo6F';
const PLAYLIST_ID_RE = /^[A-Za-z0-9]{15,32}$/;
const BROWSER_UA = 'Mozilla/5.0';

function formatDuration(ms) {
  const totalSec = Math.max(0, Math.round((Number(ms) || 0) / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = String(totalSec % 60).padStart(2, '0');
  return `${String(min).padStart(2, '0')}:${sec}`;
}

function decodeHtmlEntities(text) {
  if (!text) return '';
  return String(text)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function parsePlaylistInitialState(html, playlistId) {
  const match = html.match(/<script\s+id="initialState"[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) return null;

  const decoded = Buffer.from(match[1].trim(), 'base64').toString('utf8');
  const parsed = JSON.parse(decoded);
  const plKey = `spotify:playlist:${playlistId}`;
  const playlist = parsed?.entities?.items?.[plKey];
  if (!playlist) return null;

  const rawItems = Array.isArray(playlist?.content?.items) ? playlist.content.items : [];
  const tracks = rawItems
    .map((entry, idx) => {
      const data = entry?.itemV2?.data;
      if (!data || !data.uri) return null;
      const trackId = String(data.uri).split(':').pop() || '';
      const artists = Array.isArray(data?.artists?.items)
        ? data.artists.items.map((a) => a?.profile?.name).filter(Boolean).join(', ')
        : '';
      const covers = Array.isArray(data?.albumOfTrack?.coverArt?.sources)
        ? data.albumOfTrack.coverArt.sources
        : [];
      const smallCover =
        covers.find((c) => c.width === 64)?.url ||
        covers.find((c) => c.width === 300)?.url ||
        covers[0]?.url ||
        '';
      const durationMs = Number(data?.duration?.totalMilliseconds) || 0;
      const previewUrl = data?.previews?.audioPreviews?.items?.[0]?.url || '';
      return {
        index: idx + 1,
        id: trackId,
        uri: data.uri,
        url: trackId ? `https://open.spotify.com/track/${trackId}` : '',
        title: data.name || 'Untitled',
        artists,
        durationMs,
        durationFormatted: formatDuration(durationMs),
        coverUrl: smallCover,
        previewUrl,
        isExplicit: data?.contentRating?.label === 'EXPLICIT',
      };
    })
    .filter(Boolean);

  const playlistCover =
    playlist?.images?.items?.[0]?.sources?.[0]?.url || '';

  return {
    id: playlistId,
    name: playlist.name || 'Focus Coding',
    owner: playlist?.ownerV2?.data?.name || 'cynicc',
    coverUrl: playlistCover,
    totalCount: Number(playlist?.content?.totalCount) || tracks.length,
    tracks,
  };
}

function parsePlaylistHtmlFallback(html, playlistId) {
  const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i);
  const ogDesc = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i);
  const ogImg = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);

  const countMatch = ogDesc?.[1]?.match(/(\d+)\s+items?/i);
  const rows = html.match(/data-testid="track-row"[\s\S]*?(?=data-testid="track-row"|data-testid="bottom-spacer|$)/g) || [];

  const tracks = rows
    .map((row, idx) => {
      const idMatch = row.match(/href="\/track\/([A-Za-z0-9]+)"/);
      const titleMatch = row.match(/href="\/track\/[A-Za-z0-9]+"[^>]*>([\s\S]*?)<\/a>/);
      const artistMatches = [...row.matchAll(/href="\/artist\/[A-Za-z0-9]+"[^>]*>([\s\S]*?)<\/a>/g)];
      const coverMatch = row.match(/src="(https:\/\/i\.scdn\.co\/image\/[^"]+)"/);
      const id = idMatch?.[1] || '';
      const title = decodeHtmlEntities((titleMatch?.[1] || '').replace(/<[^>]+>/g, '')).trim();
      const artists = artistMatches
        .map((m) => decodeHtmlEntities(m[1].replace(/<[^>]+>/g, '')).trim())
        .filter(Boolean)
        .join(', ');
      if (!id || !title) return null;
      return {
        index: idx + 1,
        id,
        uri: `spotify:track:${id}`,
        url: `https://open.spotify.com/track/${id}`,
        title,
        artists,
        durationMs: 0,
        durationFormatted: '',
        coverUrl: coverMatch?.[1] || '',
        previewUrl: '',
        isExplicit: false,
      };
    })
    .filter(Boolean);

  return {
    id: playlistId,
    name: decodeHtmlEntities(ogTitle?.[1] || 'Focus Coding'),
    owner: 'cynicc',
    coverUrl: ogImg?.[1] || '',
    totalCount: countMatch ? Number(countMatch[1]) : tracks.length,
    tracks,
  };
}

async function fetchExtraEmbedTracks(playlistId, initialTracks, totalCount) {
  try {
    const urls = [
      `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`,
      `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=oembed`,
      `https://open.spotify.com/embed/playlist/${playlistId}`,
    ];
    const results = await Promise.allSettled(
      urls.map((u) =>
        fetch(u, { headers: { 'User-Agent': BROWSER_UA }, cache: 'no-store' }).then((r) =>
          r.ok ? r.text() : ''
        )
      )
    );

    const lastIdx = initialTracks.length - 1;
    const expectedLastId = initialTracks[lastIdx]?.id;
    let bestList = null;

    for (const r of results) {
      if (r.status !== 'fulfilled' || !r.value) continue;
      const nextMatch = r.value.match(/<script\s+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i);
      if (!nextMatch) continue;
      const nextData = JSON.parse(nextMatch[1]);
      const list = nextData?.props?.pageProps?.state?.data?.entity?.trackList;
      if (!Array.isArray(list) || list.length <= initialTracks.length) continue;

      const embedIdAtLast = String(list[lastIdx]?.uri || '').split(':').pop();
      if (expectedLastId && embedIdAtLast !== expectedLastId) continue;

      if (!bestList || list.length > bestList.length) {
        bestList = list;
      }
    }

    if (!bestList) return initialTracks;

    const extra = bestList.slice(initialTracks.length).map((t, offset) => {
      const id = String(t.uri || '').split(':').pop() || '';
      const durationMs = Number(t.duration) || 0;
      return {
        index: initialTracks.length + offset + 1,
        id,
        uri: t.uri || `spotify:track:${id}`,
        url: id ? `https://open.spotify.com/track/${id}` : '',
        title: t.title || 'Untitled',
        artists: String(t.subtitle || '').replace(/\u00a0/g, ' '),
        durationMs,
        durationFormatted: formatDuration(durationMs),
        coverUrl: '',
        previewUrl: t?.audioPreview?.url || '',
        isExplicit: Boolean(t.isExplicit),
      };
    });

    return [...initialTracks, ...extra].slice(0, Math.max(totalCount, initialTracks.length + extra.length));
  } catch (err) {
    console.error('Embed overflow merge failed:', err);
    return initialTracks;
  }
}

export async function OPTIONS(request) {
  return handleOptions(request);
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedId = searchParams.get('id') || DEFAULT_PLAYLIST_ID;
    const playlistId = PLAYLIST_ID_RE.test(requestedId) ? requestedId : DEFAULT_PLAYLIST_ID;

    const res = await fetch(`https://open.spotify.com/playlist/${playlistId}`, {
      headers: { 'User-Agent': BROWSER_UA },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Spotify playlist fetch non-OK:', res.status);
      return jsonResponse(request, { error: 'Gagal mengambil playlist Spotify.' }, 502);
    }

    const html = await res.text();
    let payload = parsePlaylistInitialState(html, playlistId);
    if (!payload || !payload.tracks.length) {
      payload = parsePlaylistHtmlFallback(html, playlistId);
    }

    if (payload.totalCount > payload.tracks.length && payload.tracks.length > 0) {
      payload.tracks = await fetchExtraEmbedTracks(playlistId, payload.tracks, payload.totalCount);
    }

    return jsonResponse(
      request,
      {
        ...payload,
        url: `https://open.spotify.com/playlist/${playlistId}`,
        syncedAt: new Date().toISOString(),
      },
      200,
      {
        'Cache-Control': 'public, max-age=0, s-maxage=15, stale-while-revalidate=30',
      }
    );
  } catch (err) {
    console.error('GET /api/spotify-playlist error:', err);
    return jsonResponse(
      request,
      { error: 'Terjadi kesalahan saat menyinkronkan playlist Spotify.' },
      500,
      { 'Cache-Control': 'no-store' }
    );
  }
}
