import { userService } from "@/modules/user/user.service";

export async function GET(
  _: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;

  const { id } = params;

  const user = await userService.getById(id);
  return Response.json(user);
}
