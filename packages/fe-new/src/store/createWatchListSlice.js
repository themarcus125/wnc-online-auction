const createWatchListSlice = (set) => ({
  watchList: [],
  setWatchList: (list) => {
    set(() => ({ watchList: list }));
  },
  clearWatchList: () => {
    set(() => ({ watchList: [] }));
  },
  removeItemFromWatchList: (itemId) => {
    set((state) => ({
      watchList: state.watchList.filter((item) => item._id !== itemId),
    }));
  },
  addItemToWatchList: (item) => {
    set((state) => ({ watchList: [...state.watchList, item] }));
  },
});

export default createWatchListSlice;
