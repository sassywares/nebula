import { isServer } from "@tanstack/react-query";
import { i18nConfig } from "./i18n/config";

export type WindowWithConfig = typeof window & {
  config: Config;
};

export type Config = {
  baseUrl: string;
  serviceUrl: string;
  i18n: typeof i18nConfig;
  defaults: {
    staleMilliseconds: number;
    debounceMilliseconds: number;
    copyTimeoutMilliseconds: number;
  };
};

export const config: Config = (() => {
  const config = {
    baseUrl: getConfig("NEXT_PUBLIC_BASE_URL", "http://localhost:3000"),
    serviceUrl: getConfig(
      "NEXT_PUBLIC_BASE_SERVICE_URL",
      "http://localhost:3000/api/v1",
    ),
    i18n: i18nConfig,
    defaults: {
      staleMilliseconds: 1000 * 60 * 30, // 30 minutes,
      debounceMilliseconds: 500,
      copyTimeoutMilliseconds: 3000,
    },
  } as const;

  if (!isServer) {
    // Inject public config into window object for client-side access
    // There's no need to keep this private because it's not secret anyways
    (window as WindowWithConfig).config = config;
  }

  return config;
})();

export function getConfig(key: string, defaultValue = ""): string {
  return process.env[key] ?? defaultValue;
}
