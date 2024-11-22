import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

// This page only renders when the app is built statically (output: 'export')
export default async function RootPage() {
  const locale = await getLocale();
  redirect({ locale, href: "/" });
}
