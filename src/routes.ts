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
  signIn: (redirectUrl?: string) =>
    redirectUrl ? `/sign-in?redirectUrl=${redirectUrl}` : "/sign-in",
  rsc: {
    users: "/rsc/users",
    user: (id: string) => `/rsc/users/${id}`,
  },
  reactQuery: {
    users: "/rq/users",
    user: (id: string) => `/rq/users/${id}`,
  },
} as const satisfies Routes;
