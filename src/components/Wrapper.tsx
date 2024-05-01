import { cn } from "@/utils/lib/utils";

const Wrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("mx-auto max-w-7xl w-11/12", className)}>{children}</div>;
};

export default Wrapper;
