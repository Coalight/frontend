export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
      {" "}
      {children}
    </div>
  );
}
