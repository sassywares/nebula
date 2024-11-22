import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { userService } from "@/modules/user/user.service";
import { routes } from "@/routes";

export default async function UsersPage() {
  const t = await getTranslations("sentences");

  const users = await userService.get();

  if (!users) return <div>{t("somethingWentWrong")}</div>;

  return (
    <div className="prose dark:prose-invert">
      <h1>Users</h1>
      <ul>
        {users.map((user: { id: string; name: string }) => (
          <li key={user.id}>
            <button>
              <Link href={routes.rsc.user(user.id)}>{user.name}</Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
