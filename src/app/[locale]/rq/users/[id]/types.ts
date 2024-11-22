import { PageParams as Params, PageProps as Props } from "@/app/[locale]/types";

export type PageParams = Params<{
  id: string;
}>;

export type PageProps = Props<PageParams>;
