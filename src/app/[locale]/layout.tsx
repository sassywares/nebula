import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { getLangDir } from "rtl-detect";

import { config } from "@/config";
import { routing } from "@/i18n/routing";
import { QueryClientProvider } from "@/providers/query-client.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProgressBarProvider } from "@/providers/progress-bar.provider";
import { Toaster } from "sonner";
import { LayoutProps } from "./types";

import { BelowTopbar, Topbar } from "@/components/topbar";
import { Bricolage_Grotesque } from "next/font/google";

const Font = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export function generateStaticParams() {
  return config.i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { locale } = await params;

  const direction = getLangDir(locale);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body dir={direction} className={Font.className}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <QueryClientProvider>
              <Topbar />
              <BelowTopbar>{children}</BelowTopbar>
            </QueryClientProvider>
            <Toaster richColors position="top-center" />
          </NextIntlClientProvider>
          <ProgressBarProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
