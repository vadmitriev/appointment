import { IEvent, IResource } from '@/interfaces';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HistoryState {
  isLoading: boolean;
  events: IEvent[];
  resources: IResource[];
  error: string | null;
}

const initialState: HistoryState = {
  isLoading: false,
  events: [],
  resources: [],
  error: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
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
