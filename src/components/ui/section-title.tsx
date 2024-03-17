import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const SectionTitle = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => {
  return (
    <p className={cn("font-bold uppercase lg:text-xl", className)} {...props}>
      {children}
    </p>
  );
};

export default SectionTitle;
