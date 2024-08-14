import { createSlice } from '@reduxjs/toolkit';

// Create a slice for managing content state
export const contentSlice = createSlice({
  // Name of the slice
  name: 'content',
  // Initial state for the slice
  initialState: {
    content: '',
  },
  // Reducers to handle actions and update state
  reducers: {
    setContent: (state,action) => {
      state.content =action.payload;// Update the state with the payload from the action
    },
    loadContent: (state,action) => {
      state.content =action.payload;// Update the state with the payload from the action
    },
    
  },
});

export const { setContent,loadContent } = contentSlice.actions;

export default contentSlice.reducer;

/*
this code defines a slice of the Redux state called content with an initial state and a reducer to update the content. It also exports the necessary action creator and reducer to be used in the application.
*/