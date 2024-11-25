import { ComponentPropsWithAsChild } from "@/types";
import { cn } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const containerVariants = cva("container mx-auto px-6 md:px-8 xl:px-10", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ContainerProps = ComponentPropsWithAsChild<
  "div",
  VariantProps<typeof containerVariants>
>;

/**
 * We can all agree that the tailwind container is weird.
 * This component aims to make it a bit more pleasant to use.
 *
 * - [Source](https://tailwindcss.com/docs/container)
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(containerVariants({ size }), className)}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";

export { Container, containerVariants };
