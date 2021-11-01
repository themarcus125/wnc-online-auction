import create from 'zustand';

import createWatchListSlice from './createWatchListSlice';
import createAuthSlice from './createAuthSlice';
import createProductSlice from './createProductSlice';

const useStore = create((set, get) => ({
  ...createWatchListSlice(set),
  ...createAuthSlice(set),
  ...createProductSlice(set, get),
}));

export default useStore;
