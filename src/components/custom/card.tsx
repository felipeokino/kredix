import { cn } from '../../lib/utils';

type CardProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
export const Card = ({ children, ...props }: CardProps) => {
  return (
    <div {...props} className={cn(["bg-neutral-800 rounded-lg shadow-md p-6 w-full", props.className])} >
      {children}
    </div>
  );
}