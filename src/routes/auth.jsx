export const isAuthenticated = () => {
  return !!localStorage.getItem("admintoken");
};
