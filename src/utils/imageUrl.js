export const normalizeImageUrl = (url) => {
  if (!url) return null;
  
  // If it's already a full URL (Cloudinary or other external), use as is
  if (url.startsWith('http')) {
    // Replace localhost with production backend URL
    if (url.includes('localhost:5000')) {
      return url.replace('http://localhost:5000', 'https://esperance-backend.onrender.com');
    }
    return url;
  }
  
  // If it's a relative path, construct full URL
  if (url.startsWith('/uploads/')) {
    return `https://esperance-backend.onrender.com${url}`;
  }
  
  return url;
};