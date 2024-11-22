import { userService } from "@/modules/user/user.service";

export async function GET() {
  const users = await userService.get();
  return Response.json(users);
}
