"use server";

import { prefix } from "@/storage";
import { cookies } from "next/headers";

const key = `${prefix}.token`;

export async function getTokenFromCookies(): Promise<string | null> {
  return (await cookies()).get(key)?.value ?? null;
}

export async function setTokenInCookies(value: string): Promise<void> {
  (await cookies()).set(key, value);
}

export async function removeTokenFromCookies(): Promise<void> {
  (await cookies()).delete(key);
}
