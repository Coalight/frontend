import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, resetLogoutState } from "@/redux/features/auth/authSlice";
import { LogOut } from "lucide-react";

export default function LogoutBtn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { logoutStatus } = useAppSelector((state) => state.auth.logout);

  const handleLogout = async () => {
    const res = await dispatch(logout());
    const { success, error } = res.payload || {};
    if (success) {
      dispatch(resetLogoutState());
      router.push("/");
    } else {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={logoutStatus === "LOADING"}
      className="flex items-center  group gap-2 text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <LogOut className="h-4 w-4 text-red-500 group-hover:text-red-600" />
      {logoutStatus === "LOADING" ? "Logging out..." : "Logout"}
    </button>
  );
}
