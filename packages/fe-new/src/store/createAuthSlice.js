const createAuthSlice = (set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => {
    set(() => ({ isLoggedIn: status }));
  },
});

export default createAuthSlice;
