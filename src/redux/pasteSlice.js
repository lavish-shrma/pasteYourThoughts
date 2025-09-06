import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    pastes: localStorage.getItem("pastes")
      ? JSON.parse(localStorage.getItem("pastes"))
      : []
  },
  reducers: {
    addToPaste: (state, action) => {
      let paste = action.payload;
      // Ensure createdAt is set
      if (!paste.createdAt) {
        paste = { ...paste, createdAt: new Date().toISOString() };
      }
      console.log('addToPaste:', paste);
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("paste created successfully");
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        const originalPaste = state.pastes[index];
        state.pastes[index] = {
          ...paste,
          createdAt: paste.createdAt || originalPaste.createdAt || new Date().toISOString(),
        };
        console.log('updateToPaste:', state.pastes[index]);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste updated successfully");
      }
    },
    resetAllPaste: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) =>
        item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("paste deleted successfully");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste,
  resetAllPaste, removeFromPaste } = pasteSlice.actions;

export default pasteSlice.reducer