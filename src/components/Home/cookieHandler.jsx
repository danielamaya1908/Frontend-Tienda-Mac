import Cookies from 'js-cookie';

// Cookie consent handler
const handleCookieConsent = () => {
  // Set a cookie to remember user's consent
  if (!Cookies.get('cookie-consent')) {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
  }
  
  // Configure default cookie settings to minimize warnings
  const cookieConfig = {
    SameSite: 'Lax',
    Secure: window.location.protocol === 'https:',
    expires: 365
  };

  // Set essential cookies with secure attributes
  Cookies.set('session-cookie', 'true', cookieConfig);
  
  // Optional: Remove non-essential cookies
  const removeNonEssentialCookies = () => {
    const cookies = Cookies.get();
    Object.keys(cookies).forEach(cookie => {
      if (!['cookie-consent', 'session-cookie'].includes(cookie)) {
        Cookies.remove(cookie);
      }
    });
  };
  
  return {
    setSecureCookie: (name, value) => {
      Cookies.set(name, value, cookieConfig);
    },
    removeNonEssentialCookies,
    hasConsent: () => !!Cookies.get('cookie-consent')
  };
};

export default handleCookieConsent;