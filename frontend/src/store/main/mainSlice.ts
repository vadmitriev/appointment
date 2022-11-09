import { createSlice } from '@reduxjs/toolkit';

interface MainState {
  isLoading: boolean;
  error: string | null;
}

const initialState: MainState = {
  isLoading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export default appSlice.reducer;
