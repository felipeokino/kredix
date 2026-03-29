export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-kredix-card rounded-lg shadow-md p-6">
      {children}
    </div>
  );
}