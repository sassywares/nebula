import { getLocale, getTranslations } from "next-intl/server";

/** Get translations for the current locale */
export async function getLocaleTranslations(
  options?: Omit<Parameters<typeof getTranslations>[0], "locale">,
) {
  const locale = await getLocale();
  return getTranslations({ locale, ...options });
}
