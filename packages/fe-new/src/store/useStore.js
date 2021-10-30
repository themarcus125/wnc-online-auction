import create from 'zustand';

import createWatchListSlice from './createWatchListSlice';

const useStore = create((set) => ({
  ...createWatchListSlice(set),
}));

export default useStore;
