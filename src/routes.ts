export type RouteFn = (...args: any[]) => string;
export type RoutePath = string | RouteFn;

export type RouteValue =
  | RoutePath
  | {
      path: RoutePath;
      key: any[] | ((...args: any[]) => any[]);
    };

export type Routes = Record<string, RouteValue | Record<string, RouteValue>>;

export const routes = {
  home: "/",
  docs: "/docs",
  blog: "/blog",
  about: "/about",
  signIn: (redirectUrl?: string) =>
    redirectUrl ? `/sign-in?redirectUrl=${redirectUrl}` : "/sign-in",
  pricing: "/pricing",
  integrations: "/integrations",
} as const satisfies Routes;
