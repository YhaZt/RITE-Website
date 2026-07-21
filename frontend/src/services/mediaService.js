import { http } from '@/api/http';

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8000';

/** Skip re-encode when already small enough for typical nginx defaults. */
const SKIP_COMPRESS_UNDER_BYTES = 900 * 1024;
const MAX_EDGE = 1920;
const OUTPUT_QUALITY = 0.82;

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

/**
 * Resize + compress in the browser so uploads fit low nginx/PHP limits
 * (often 1MB default). Server still converts to WebP on save.
 */
export async function compressImageForUpload(file) {
  if (!(file instanceof File) && !(file instanceof Blob)) {
    return file;
  }

  const type = (file.type || '').toLowerCase();
  if (type && !type.startsWith('image/')) {
    return file;
  }

  // GIFs may be animated — leave alone
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

    const preferWebp = typeof canvas.toBlob === 'function';
    let blob = null;
    if (preferWebp) {
      try {
        blob = await canvasToBlob(canvas, 'image/webp', OUTPUT_QUALITY);
      } catch {
        blob = null;
      }
    }
    if (!blob || blob.size === 0) {
      blob = await canvasToBlob(canvas, 'image/jpeg', OUTPUT_QUALITY);
    }

    // If compression somehow got larger, keep original
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

export const mediaService = {
  async uploadImage(file) {
    const prepared = await compressImageForUpload(file);
    const formData = new FormData();
    formData.append('file', prepared);
    // Let the browser set multipart boundary — do not force Content-Type
    const res = await http.post('/media', formData, {
      headers: { 'Content-Type': undefined },
      transformRequest: [
        (data, headers) => {
          if (headers && typeof headers === 'object') {
            delete headers['Content-Type'];
            delete headers['content-type'];
          }
          return data;
        },
      ],
    });
    return res.data;
  },
};
