import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false,
  };

  export const ReducerDataHandle = createSlice({
    name: 'ReducerDataHandle',
    initialState,
    reducers: {
     SidebarHandle(state, action) {
      state.isVisible = action.payload;
    },
}
  })

  export const { SidebarHandle } = ReducerDataHandle.actions

  export default ReducerDataHandle.reducer;