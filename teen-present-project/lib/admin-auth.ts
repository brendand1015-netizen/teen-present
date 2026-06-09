import { cookies } from "next/headers";
import { createHash } from "node:crypto";

const COOKIE_NAME = "teen-present-admin";

function digest(value: string) {
  const secret = process.env.ADMIN_COOKIE_SECRET || process.env.ADMIN_PASSWORD;
  return createHash("sha256").update(`${value}:${secret}`).digest("hex");
}

export function isAdminAuthenticated() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return false;
  }

  return cookies().get(COOKIE_NAME)?.value === digest(password);
}

export function setAdminCookie(password: string) {
  cookies().set(COOKIE_NAME, digest(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export function clearAdminCookie() {
  cookies().delete(COOKIE_NAME);
}

export function verifyAdminPassword(password: string) {
  return Boolean(process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD);
}
