"use server";

import { cookies } from "next/headers";

export async function saveCookieConsent(
  choice: "accepted" | "rejected"
) {
  // Validasi pilihan pengguna
  if (choice !== "accepted" && choice !== "rejected") {
    throw new Error("Pilihan cookies tidak valid.");
  }

  const cookieStore = await cookies();

  // Simpan pilihan sebagai session cookie
  cookieStore.set("cookie_consent", choice, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return { success: true };
}
