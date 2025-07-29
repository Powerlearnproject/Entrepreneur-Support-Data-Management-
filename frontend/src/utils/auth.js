export const getToken = () => localStorage.getItem('token');

export const isLoggedIn = () => !!getToken();

export const logout = () => {
  localStorage.removeItem('token');
};

// Optionally decode user info from token (if needed)
   export const getUser = () => {
     const token = getToken();
     console.log(token);
     if (!token) return null;
     try {
       return JSON.parse(atob(token.split('.')[1]));
     } catch {
       return null;
     }
   }; 