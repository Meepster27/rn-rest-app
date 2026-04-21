import Constants from 'expo-constants';

function getExtra() {
  const anyConst = Constants as any;
  // expoConfig is available in newer Expo; manifest in older SDKs
  const expoConfig = anyConst.expoConfig ?? anyConst.manifest;
  return expoConfig?.extra || {};
}

const EXTRA = getExtra();
const API_KEY = EXTRA.TMDB_API_KEY || process.env.TMDB_API_KEY || '';

const BASE = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies(page = 1) {
  const url = \`\${BASE}/movie/popular?api_key=\${API_KEY}&language=en-US&page=\${page}\`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(\`TMDB fetch failed \${res.status}: \${body}\`);
  }
  return res.json();
}

export async function fetchMovieDetails(id: number | string) {
  const url = \`\${BASE}/movie/\${id}?api_key=\${API_KEY}&language=en-US\`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(\`TMDB fetch failed \${res.status}: \${body}\`);
  }
  return res.json();
}

export function getPosterUrl(path: string | null, size = 'w500') {
  return path ? \`https://image.tmdb.org/t/p/\${size}\${path}\` : null;
}

/**
 * Fetch a TMDB list by id (user-created list)
 * Example usage: fetchList(8644544)
 */
export async function fetchList(listId: number | string) {
  const url = \`\${BASE}/list/\${listId}?api_key=\${API_KEY}&language=en-US\`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(\`TMDB list fetch failed \${res.status}: \${body}\`);
  }
  return res.json();
}

/**
 * Fetch a TMDB list by id (user-created list)
 * Example usage: fetchList(8644544)
 */
export async function fetchList(listId: number | string) {
  const url = \`\${BASE}/list/\${listId}?api_key=\${API_KEY}&language=en-US\`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(\`TMDB list fetch failed \${res.status}: \${body}\`);
  }
  return res.json();
}
