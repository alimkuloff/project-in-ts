import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikesState {
  likedCars: string[];
}

const initialState: LikesState = {
  likedCars: []
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const carId = action.payload;
      if (state.likedCars.includes(carId)) {
        state.likedCars = state.likedCars.filter(id => id !== carId);
      } else {
        state.likedCars.push(carId);
      }
    }
  }
});

export const { toggleLike } = likesSlice.actions;
export default likesSlice.reducer;
