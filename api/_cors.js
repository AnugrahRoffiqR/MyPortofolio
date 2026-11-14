const ALLOWED_METHODS = 'GET, POST, OPTIONS';
const ALLOWED_HEADERS = 'Content-Type';

export function buildCorsHeaders(request, extra = {}) {
  const origin = request.headers.get('origin');
  const headers = new Headers({
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': ALLOWED_METHODS,
    'Access-Control-Allow-Headers': ALLOWED_HEADERS,
    'Vary': 'Origin',
    ...extra,
  });
  return headers;
}

export function jsonResponse(request, data, status = 200, extraHeaders = {}) {
  const headers = buildCorsHeaders(request, {
    'Content-Type': 'application/json; charset=utf-8',
    ...extraHeaders,
  });
  return new Response(JSON.stringify(data), { status, headers });
}

export function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: buildCorsHeaders(request),
  });
}
