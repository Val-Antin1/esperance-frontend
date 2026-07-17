import api from './api';

const VISITOR_ID_KEY = 'esperance_visitor_id';
const ADMIN_DEVICE_KEY = 'esperance_admin_device_id';
const SESSION_START_KEY = 'esperance_session_start';

// Generate a unique visitor ID
const generateVisitorId = () => {
  return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create visitor ID
const getVisitorId = () => {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
};

// Get screen resolution
const getScreenResolution = () => {
  return `${window.screen.width}x${window.screen.height}`;
};

// Detect referrer
const getReferrer = () => {
  const referer = document.referrer;
  if (!referer) return 'Direct';
  
  if (referer.includes('google')) return 'Google';
  if (referer.includes('facebook')) return 'Facebook';
  if (referer.includes('instagram')) return 'Instagram';
  return 'Other';
};

// Check if running in incognito mode
const isIncognitoMode = () => {
  return new Promise((resolve) => {
    const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
    if (!fs) {
      // Fallback method
      resolve(false);
      return;
    }

    fs(
      window.TEMPORARY,
      100,
      () => resolve(false),
      () => resolve(true)
    );
  });
};

// Get or create admin device ID (for marking device as admin)
export const markAsAdminDevice = () => {
  const visitorId = getVisitorId();
  localStorage.setItem(ADMIN_DEVICE_KEY, visitorId);
};

export const isAdminDevice = () => {
  const adminDeviceId = localStorage.getItem(ADMIN_DEVICE_KEY);
  const visitorId = getVisitorId();
  return adminDeviceId === visitorId;
};

// Record a visitor hit
export const recordVisit = async (currentPage = window.location.pathname) => {
  try {
    const isAdmin = isAdminDevice();
    
    // Don't record admin visits
    if (isAdmin) {
      console.log('[Analytics] Admin device - visit not recorded');
      return;
    }

    const visitorId = getVisitorId();
    const incognito = await isIncognitoMode();

    const sessionStart = localStorage.getItem(SESSION_START_KEY);
    let sessionDuration = 0;
    if (!sessionStart) {
      localStorage.setItem(SESSION_START_KEY, Date.now().toString());
    } else {
      sessionDuration = Math.floor((Date.now() - parseInt(sessionStart)) / 1000);
    }

    const visitData = {
      visitorId,
      currentPage,
      screenResolution: getScreenResolution(),
      referrer: getReferrer(),
      isIncognito: incognito,
      sessionDuration,
      isAdminDevice: isAdmin,
    };

    const response = await api.post('/analytics/record', visitData);
    
    console.log('[Analytics] Visit recorded successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('[Analytics] Error recording visit:', error);
  }
};

// Initialize visitor tracking on page load
export const initializeTracking = () => {
  // Record visit when component mounts
  recordVisit();

  // Re-record visit on route change (handled by useEffect in pages)
  return getVisitorId();
};

// Reset session on page unload
export const resetSession = () => {
  localStorage.removeItem(SESSION_START_KEY);
};
