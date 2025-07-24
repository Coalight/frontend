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
  controller: {
    forceWindowRefresh: number;
  };
}

const initialState: UIState = {
  desktop: {
    isSideBarCollapsed: true,
  },
  mobile: {
    isSideBarOpen: false,
  },
  controller: {
    forceWindowRefresh: 0,
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
    forceRefresh: (state) => {
      state.controller.forceWindowRefresh += 1;
    },
  },
});

export const {
  toggleDesktopSidebar,
  toggleMobileSidebar,
  closeMobileSidebar,
  forceRefresh,
} = uiSlice.actions;
export default uiSlice.reducer;
