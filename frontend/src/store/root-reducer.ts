import historySlice from './history/historySlice';
import mainSlice from './main/mainSlice';

export const rootReducer = {
  history: historySlice,
  main: mainSlice,
};
