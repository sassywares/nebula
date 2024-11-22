import { Storage } from "@/storage";
import { User } from "./user.types";

export const userStorage = new Storage<User>("user");
