// utils/auth.js

// Get token from local storage
export const getToken = () => localStorage.getItem('token');

// Decode payload from JWT
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

// Check if token is valid and not expired
export const isLoggedIn = () => {
  const token = getToken();
  if (!token) return false;

  const payload = decodeToken(token);
  if (!payload || !payload.exp) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp > currentTime;
};

// Get decoded user from token
export const getUser = () => {
  const token = getToken();
  if (!token) return null;

  const payload = decodeToken(token);
  const currentTime = Math.floor(Date.now() / 1000);

  if (!payload || !payload.exp || payload.exp < currentTime) {
    logout(); // remove expired token
    return null;
  }

  return payload;
};

// Remove token from storage
export const logout = () => {
  localStorage.removeItem('token');
};
