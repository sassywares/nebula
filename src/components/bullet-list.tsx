import { ComponentPropsWithAsChild } from "@/types";
import { cn } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

export type BulletListProps = ComponentPropsWithAsChild<
  "ul",
  React.HTMLAttributes<HTMLUListElement>
>;

const BulletList = React.forwardRef<HTMLUListElement, BulletListProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "ul";
    return (
      <Comp
        ref={ref}
        className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
        {...props}
      />
    );
  },
);
BulletList.displayName = "BulletList";

export { BulletList };
