import { IEvent, IResource } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HistoryState {
  isLoading: boolean;
  events: IEvent[];
  resources: IResource[];
  error: string | null;
  page: number;
  itemsPerPage: number;
}

const initialState: HistoryState = {
  isLoading: true,
  events: [],
  resources: [],
  error: null,
  page: 0,
  itemsPerPage: 30,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },

    loadEvents: (state) => {
      state.isLoading = true;
    },
    loadEventsSuccess: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload;
      state.isLoading = false;
    },
    loadEventsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    loadResources: (state) => {
      state.isLoading = true;
    },
    loadResourcesSuccess: (state, action: PayloadAction<IResource[]>) => {
      state.resources.concat(action.payload);
      state.isLoading = false;
    },
    loadResourcesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const historyActions = historySlice.actions;

export default historySlice.reducer;
