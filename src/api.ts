import { isServer } from "@tanstack/react-query";
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { redirect } from "./i18n/routing";
import {
  getTokenFromCookies,
  removeTokenFromCookies,
} from "./modules/shared/token/token.cookie";
import { tokenStorage } from "./modules/shared/token/token.storage";
import { routes } from "./routes";

async function withAccessToken(config: InternalAxiosRequestConfig) {
  const token = isServer ? await getTokenFromCookies() : tokenStorage.get();

  if (token) {
    // Set the Authorization header if token exists
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

async function with401Redirect(error: AxiosError) {
  if (isAxiosError(error) && error.response?.status === 401) {
    // Remove the token and redirect to the sign-in page, implementation differs between server and client
    if (isServer) {
      await removeTokenFromCookies();
      redirect({ href: routes.signIn(), locale: await getLocale() });
    } else {
      tokenStorage.invalidate();
      window.location.href = routes.signIn(window.location.pathname);
    }
  }

  return Promise.reject(error);
}

/**
 * Create an AxiosInstance with a base URL.
 * Also adds interceptors for setting the Authorization header and handling 401 responses.
 */
export function createApi(baseURL: string) {
  const api = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(withAccessToken);
  api.interceptors.response.use(undefined, with401Redirect);

  return api;
}

/**
 * Get an error message from an unknown error.
 * @param error - The error to get the message from.
 * @param handler - A custom handler to get the message from the error.
 * @returns The error message.
 */
export function useApiErrorMessage(
  error: unknown,
  handler?: (error: AxiosError) => string,
): string {
  const t = useTranslations("sentences");

  if (isAxiosError(error)) {
    if (handler) {
      // Pass the error to the handler if it exists
      return handler(error);
    }

    // Return the error message from the error response
    return error.response?.data.message ?? error.message;
  }

  // Return a generic error message if the error is not an Axios error
  return t("somethingWentWrong");
}
