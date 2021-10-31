import create from 'zustand';

import createWatchListSlice from './createWatchListSlice';
import createAuthSlice from './createAuthSlice';

const useStore = create((set) => ({
  ...createWatchListSlice(set),
  ...createAuthSlice(set),
}));

export default useStore;
