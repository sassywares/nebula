"use client";

import { usePathname, useRouter } from "@/i18n/routing";
// eslint-disable-next-line no-restricted-imports
import { useSearchParams as useNextSearchParams } from "next/navigation";

/**
 * A hook that supercharges the `useSearchParams` hook from `next/navigation` with some extra functionality
 *
 * @example
 * const searchParams = useSearchParams();
 *
 * const redirectUrl = searchParams.get("redirectUrl");
 * const hasRedirectUrl = searchParams.has("redirectUrl");
 *
 * // Set
 * searchParams.set({ hello: "world" });
 *
 * // Set and navigate
 * searchParams.set({ hello: "world" }, "/sassywares");
 *
 * // Delete
 * searchParams.delete(["hello"]);
 *
 * // Delete multiple
 * searchParams.delete(["hello", "gentlemen"]);
 *
 * // Delete and navigate
 * searchParams.delete(["hello"], "/sassywares");
 */
export function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useNextSearchParams();

  /**
   * Sets the search parameters in the URL
   * @param params - The search parameters to set
   * @param pushUrl - The URL to push to, router.replace is called if not provided, can be used to navigate and set search parameters at the same time
   */
  function setSearchParams(params: Record<string, string>, pushUrl?: string) {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    for (const key in params) {
      updatedSearchParams.set(key, params[key]);
    }

    // If pushUrl is provided, we use the push method, otherwise we use the replace method
    const action = pushUrl ? "push" : "replace";
    const path = pushUrl ?? pathname;

    router[action](`${path}?${updatedSearchParams.toString()}`);
  }

  /**
   * Deletes the search parameters and replaces the URL
   * @param keys - The search parameters to delete
   * @param pushUrl - The URL to push to, router.replace is called if not provided, can be used to navigate and delete search parameters at the same time
   */
  function deleteSearchParams(keys: string[], pushUrl?: string) {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    for (const key of keys) {
      updatedSearchParams.delete(key);
    }

    // If pushUrl is provided, we use the push method, otherwise we use the replace method
    const action = pushUrl ? "push" : "replace";
    const path = pushUrl ?? pathname;
    router[action](`${path}?${updatedSearchParams.toString()}`);
  }

  return {
    ...searchParams,
    set: setSearchParams,
    delete: deleteSearchParams,
  };
}
