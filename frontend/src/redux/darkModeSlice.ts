// features/darkModeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface DarkModeState {
  isDarkMode: boolean;
}

const initialState: DarkModeState = {
  isDarkMode: JSON.parse(localStorage.getItem('darkMode') ?? 'false'), // 초기값을 localStorage에서 불러옴
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.isDarkMode)); // 상태를 localStorage에 저장
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
