import { MemberFolderInfo, MemberFolderState } from 'types/api/folder';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MemberFolderState = {
  folders: [],
};

const memberFolderSlice = createSlice({
  name: 'memberFolder',
  initialState,
  reducers: {
    setMemberFolder: (state, action: PayloadAction<MemberFolderInfo[]>) => {
      state.folders = action.payload;
    },
  },
});

export const { setMemberFolder } = memberFolderSlice.actions;
export default memberFolderSlice.reducer;
