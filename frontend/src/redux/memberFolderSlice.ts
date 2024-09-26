import { MemberFolderList } from 'types/api/folder';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MemberFolderList = {
  folders: [],
};

const memberFolderSlice = createSlice({
  name: 'memberFolder',
  initialState,
  reducers: {
    setMemberFolder: (state, action: PayloadAction<MemberFolderList>) => {
      state.folders = action.payload.folders;
    },
  },
});

export const { setMemberFolder } = memberFolderSlice.actions;
export default memberFolderSlice.reducer;
