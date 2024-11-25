export enum Theme {
  Dark = "dark",
  Light = "light",
}

// Update these as per your tailwind config
export enum Breakpoint {
  sm = 540,
  md = 768,
  lg = 1024,
  xl = 1280,
  "2xl" = 1536,
}

export type PropsWithAsChild<Props = {}> = Props & {
  asChild?: boolean;
};

export type ComponentPropsWithAsChild<
  ElementType extends React.ElementType,
  Props = {},
> = PropsWithAsChild<Props> & React.ComponentPropsWithoutRef<ElementType>;
