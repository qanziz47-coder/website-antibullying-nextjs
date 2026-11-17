"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function simpanLaporan(formData: FormData) {
  const jenis = formData.get("jenis") as string;
  const kronologi = formData.get("kronologi") as string;
  const nama = formData.get("nama") as string;
  const anonim = formData.get("anonim") === "on";

  const kode = "LAP-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    await prisma.laporan.create({
      data: {
        kode: kode,
        jenis: jenis,
        kronologi: kronologi,
        anonim: anonim,
        nama_pelapor: anonim ? null : nama,
      },
    });
    
    return { success: true, kode: kode };
  } catch (error: any) {
    // TAMPILKAN ERROR ASLINYA DI TERMINAL VS CODE
    console.error("=== ERROR DATABASE ===");
    console.error(error.message);
    
    // Kirim pesan error ke frontend
    return { success: false, message: error.message || "Gagal mengirim laporan." };
  }
}