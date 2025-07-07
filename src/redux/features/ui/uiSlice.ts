// features/ui/uiSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface DesktopView {
  isSideBarCollapsed: boolean;
}

interface MobileView {
  isSideBarOpen: boolean;
}

interface UIState {
  desktop: DesktopView;
  mobile: MobileView;
}

const initialState: UIState = {
  desktop: {
    isSideBarCollapsed: true,
  },
  mobile: {
    isSideBarOpen: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDesktopSidebar: (state) => {
      state.desktop.isSideBarCollapsed = !state.desktop.isSideBarCollapsed;
    },
    toggleMobileSidebar: (state) => {
      state.mobile.isSideBarOpen = !state.mobile.isSideBarOpen;
    },
    closeMobileSidebar: (state) => {
      state.mobile.isSideBarOpen = false;
    },
  },
});

export const { toggleDesktopSidebar, toggleMobileSidebar, closeMobileSidebar } =
  uiSlice.actions;
export default uiSlice.reducer;
