import { User } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

type State = "IDLE" | "LOADING" | "SUCCEEDED" | "FAILED";
interface LogOutState {
  logoutStatus: State;
  error: string | null;
}
interface AuthState {
  isVerified: boolean;
  user: null | { name: string; email: string };
  isAccountEnabled: boolean;
  logout: LogOutState;
}

const initialState: AuthState = {
  isVerified: false,
  user: null,
  isAccountEnabled: false,
  logout: {
    logoutStatus: "IDLE",
    error: null,
  },
};

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Logout failed");
        throw new Error(data.message || "Logout failed");
      }

      toast.success(data.message || "Logged out successfully");

      return data;
    } catch (error) {
      let errorMessage = "An unknown error occurred during logout";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
    },
    verifyUser: (state) => {
      state.isVerified = true;
    },
    resetLogoutState: (state) => {
      state.logout.logoutStatus = "IDLE";
      state.logout.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.logout.logoutStatus = "LOADING";
        state.logout.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isVerified = false;
        state.isAccountEnabled = false;
        state.logout.logoutStatus = "SUCCEEDED";
      })
      .addCase(logout.rejected, (state, action) => {
        state.logout.logoutStatus = "FAILED";
        state.logout.error = (action.payload as string) || "Logout failed";
      });
  },
});

export const { setUser, verifyUser, resetLogoutState } = authSlice.actions;
export default authSlice.reducer;
