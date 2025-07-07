import DesktopView from "@/components/layout/DesktopView";
import MobileView from "@/components/layout/MobileView";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DesktopView>{children}</DesktopView>
      <MobileView>{children}</MobileView>
    </div>
  );
}
export const metadata = {
  title: "Dashboard - Coalight",
  description: "Your dashboard for managing courses, students, and more.",
};
