import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  firstname: string;
  lastname: string;
  role: 'owner' | 'user';
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      sessionStorage.removeItem('user');
    },
    setUserFromStorage: (state) => {
      const user = sessionStorage.getItem('user');
      if (user) {
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { setUser, clearUser, setUserFromStorage } = userSlice.actions;

export default userSlice.reducer;
