const getBackendBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '';
  if (configuredUrl) {
    return configuredUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return 'http://localhost:5000';
};

export const normalizeImageUrl = (url) => {
  if (!url) return null;

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (url.startsWith('/uploads/') || url.startsWith('/api/uploads/')) {
    const backendBaseUrl = getBackendBaseUrl();
    return `${backendBaseUrl}${url.startsWith('/') ? url : `/${url}`}`;
  }

  return url;
};