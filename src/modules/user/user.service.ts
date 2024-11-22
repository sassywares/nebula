import { Service } from "@/service";
import { User } from "./user.types";

export const userService = new Service<User>(
  "https://jsonplaceholder.typicode.com",
  "users",
);
