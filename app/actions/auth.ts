"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs"; // Import bcrypt

const prisma = new PrismaClient();

export async function loginAdmin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Cari admin berdasarkan username
    const admin = await prisma.admin.findUnique({
      where: { username: username },
    });

    // 2. Jika admin tidak ditemukan
    if (!admin) {
      return { error: "Username tidak ditemukan." };
    }

    // 3. Cek password menggunakan bcrypt.compare
    const passwordCocok = await bcrypt.compare(password, admin.password);

    if (!passwordCocok) {
      return { error: "Password salah." };
    }

    // 4. Jika cocok, buat cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", admin.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 hari
      path: "/",
    });
    
  } catch (error) {
    console.error(error);
    return { error: "Terjadi kesalahan pada server." };
  }

  // Redirect di luar try-catch
  redirect("/admin/dashboard");
}