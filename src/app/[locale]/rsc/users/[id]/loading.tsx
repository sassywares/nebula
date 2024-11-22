"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations();

  return <div>{t("words.loading")}...</div>;
}
