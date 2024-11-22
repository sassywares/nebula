"use client";

import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

import { Link } from "@/i18n/routing";
import { userService } from "@/modules/user/user.service";
import { routes } from "@/routes";
import { useQuery } from "@tanstack/react-query";

export default function UsersPage() {
  const t = useTranslations();

  const { data, isError, isLoading } = useQuery({
    queryKey: [userService.key],
    queryFn: () => userService.get(),
  });

  if (isError) return <div>{t("sentences.somethingWentWrong")}</div>;

  if (isLoading) return <div>{t("words.loading")}...</div>;

  if (!data) {
    notFound();
  }

  return (
    <div className="prose dark:prose-invert">
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <button>
              <Link href={routes.reactQuery.user(user.id)}>{user.name}</Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
