import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { i18nConfig } from "./config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: i18nConfig.locales,

  // Used when no locale matches
  defaultLocale: i18nConfig.defaultLocale,
});

// Lightweight wrappers around Next.js' navigation APIs that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
