import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kode = searchParams.get("kode");

  if (!kode) {
    return NextResponse.json({ message: "Kode wajib diisi" }, { status: 400 });
  }

  try {
    const laporan = await prisma.laporan.findUnique({
      where: { kode: kode },
    });

    if (!laporan) {
      return NextResponse.json({ message: "Laporan tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ laporan }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server." }, { status: 500 });
  }
}