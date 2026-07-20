import { http } from '@/api/http';

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8000';

export function resolveStorageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const origin = baseURL.replace(/\/api\/?$/, '');
  return path.startsWith('/') ? `${origin}${path}` : `${origin}/${path}`;
}

export const mediaService = {
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    // Let the browser set multipart boundary — do not force Content-Type
    const res = await http.post('/media', formData, {
      headers: { 'Content-Type': undefined },
      transformRequest: [(data, headers) => {
        if (headers && typeof headers === 'object') {
          delete headers['Content-Type'];
          delete headers['content-type'];
        }
        return data;
      }],
    });
    return res.data;
  },
};
