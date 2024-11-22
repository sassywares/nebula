import { PropsWithChildren } from "react";

export type PageParams<T = {}> = T & {
  locale: string;
};

export type PageProps<Params = PageParams> = Readonly<{
  params: Promise<Params>;
}>;

export type LayoutProps<Params = PageParams> = Readonly<
  PropsWithChildren<{
    params: Promise<Params>;
  }>
>;
