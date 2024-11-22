import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations();

  return (
    <>
      <h1>{t("phrases.notFound")}</h1>
      <p>{t("sentences.pageNotFound")}</p>
    </>
  );
}
