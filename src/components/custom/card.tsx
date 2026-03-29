export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-neutral-800 rounded-lg shadow-md p-6">
      {children}
    </div>
  );
}