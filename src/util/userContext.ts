export const getUserContext = () => {
  try {
    // Get the data from the local storage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const expires = localStorage.getItem('expires');

    // If there is no user or token return
    if (!user || !expires || !token) return undefined;

    // Check if the token expired
    const date = new Date(expires);
    if (date < new Date()) return undefined;

    // Returns the data
    return { token, user: JSON.parse(user), expires };
  } catch { return null; }
};
