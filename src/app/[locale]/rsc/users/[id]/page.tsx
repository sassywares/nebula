import { userService } from "@/modules/user/user.service";
import { notFound } from "next/navigation";
import { PageProps } from "./types";

export default async function UserPage(props: PageProps) {
  const { id } = await props.params;

  const user = await userService.getById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="prose dark:prose-invert">
      <h1>User</h1>
      <p>{user.name}</p>
    </div>
  );
}
