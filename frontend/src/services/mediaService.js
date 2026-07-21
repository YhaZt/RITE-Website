import { http, csrf, syncXsrfHeader } from '@/api/http';

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8000';

const SKIP_COMPRESS_UNDER_BYTES = 350 * 1024;
const MAX_EDGE = 1600;
const OUTPUT_QUALITY = 0.8;

export function resolveStorageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const origin = baseURL.replace(/\/api\/?$/, '');
  return path.startsWith('/') ? `${origin}${path}` : `${origin}/${path}`;
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image file.'));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error('Image compression failed.'));
        else resolve(blob);
      },
      type,
      quality
    );
  });
}

export async function compressImageForUpload(file) {
  if (!(file instanceof File) && !(file instanceof Blob)) {
    return file;
  }

  const type = (file.type || '').toLowerCase();
  if (type && !type.startsWith('image/')) {
    return file;
  }

  if (type === 'image/gif') {
    return file;
  }

  if (file.size > 0 && file.size <= SKIP_COMPRESS_UNDER_BYTES) {
    return file;
  }

  try {
    const img = await loadImageFromFile(file);
    let { width, height } = img;

    if (width > MAX_EDGE || height > MAX_EDGE) {
      if (width >= height) {
        height = Math.max(1, Math.round((height * MAX_EDGE) / width));
        width = MAX_EDGE;
      } else {
        width = Math.max(1, Math.round((width * MAX_EDGE) / height));
        height = MAX_EDGE;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    let blob = null;
    try {
      blob = await canvasToBlob(canvas, 'image/jpeg', OUTPUT_QUALITY);
    } catch {
      blob = null;
    }
    if (!blob || blob.size === 0) {
      blob = await canvasToBlob(canvas, 'image/webp', OUTPUT_QUALITY);
    }

    if (blob.size >= file.size) {
      return file;
    }

    const baseName = (file.name || 'image').replace(/\.[^.]+$/, '');
    const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
    return new File([blob], `${baseName}.${ext}`, {
      type: blob.type,
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}

function uploadError(err) {
  const status = err?.response?.status;
  const serverMsg = err?.response?.data?.message || err?.response?.data?.error;

  if (status === 413) {
    return 'Image is too large for the server upload limit (nginx/PHP).';
  }
  if (status === 419) {
    return 'Upload blocked by CSRF (419). Pull latest backend (media CSRF exception), then refresh and try again.';
  }
  if (status === 401) {
    return 'Upload unauthorized (401). You are not authenticated to the API — log out, clear cookies for minsuibibes.com, log in again.';
  }
  return serverMsg || 'Failed to upload image.';
}

export const mediaService = {
  async uploadImage(file) {
    // Keep session cookies warm; CSRF is not required for api/media anymore
    try {
      await csrf();
      syncXsrfHeader();
    } catch {
      // Continue — media route does not require CSRF; auth cookie still needed
    }

    const prepared = await compressImageForUpload(file);
    const formData = new FormData();
    formData.append('file', prepared);

    try {
      const res = await http.post('/media', formData, {
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        transformRequest: [
          (data, headers) => {
            // Must not force application/json on FormData
            if (headers && typeof headers.set === 'function') {
              headers.delete('Content-Type');
            } else if (headers && typeof headers === 'object') {
              delete headers['Content-Type'];
              delete headers['content-type'];
            }
            return data;
          },
        ],
      });
      return res.data;
    } catch (err) {
      err.userMessage = uploadError(err);
      throw err;
    }
  },
};
