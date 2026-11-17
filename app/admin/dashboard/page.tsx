import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const prisma = new PrismaClient();

async function DaftarLaporan() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) redirect("/login");

  const laporan = await prisma.laporan.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalLaporan = laporan.length;
  const totalSelesai = laporan.filter((l) => l.status === "selesai").length;
  const totalDiproses = laporan.filter((l) => l.status === "diproses").length;

  return (
    <>
      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 font-serif">
        <div className="bg-white p-6 border-2 border-slate-800 shadow-[4px_4px_0px_#1e3a5f]">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 font-sans">Total Laporan</p>
          <h3 className="text-4xl font-black text-[#1e3a5f]">{totalLaporan}</h3>
        </div>
        <div className="bg-white p-6 border-2 border-slate-800 shadow-[4px_4px_0px_#eab308]">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 font-sans">Sedang Diproses</p>
          <h3 className="text-4xl font-black text-yellow-600">{totalDiproses}</h3>
        </div>
        <div className="bg-white p-6 border-2 border-slate-800 shadow-[4px_4px_0px_#10b981]">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 font-sans">Laporan Selesai</p>
          <h3 className="text-4xl font-black text-emerald-600">{totalSelesai}</h3>
        </div>
      </div>

      {/* Tabel Laporan */}
      <div className="bg-white border-2 border-slate-800 shadow-[8px_8px_0px_#1e3a5f] overflow-hidden">
        <div className="p-6 border-b-2 border-slate-800 bg-[#fdfbf7]">
          <h2 className="font-black text-2xl text-[#1e3a5f] uppercase tracking-tighter">Arsip Laporan Masuk</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-600 border-b border-gray-300">
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">Kode</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">Jenis</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">Pelapor</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">Tanggal</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {laporan.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 italic">Belum ada laporan yang masuk.</td>
                </tr>
              ) : (
                laporan.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 font-bold text-[#1e3a5f]">{l.kode}</td>
                    <td className="py-4 px-6">{l.jenis}</td>
                    <td className="py-4 px-6">
                      {l.anonim ? (
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-bold uppercase">Anonim</span>
                      ) : (
                        l.nama_pelapor
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider border ${
                        l.status === 'selesai' ? 'border-green-600 text-green-700 bg-green-50' : 
                        l.status === 'diproses' ? 'border-yellow-600 text-yellow-700 bg-yellow-50' : 
                        'border-gray-600 text-gray-700 bg-gray-50'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {new Date(l.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-4 px-6">
                      <Link href={`/admin/dashboard/${l.id}`} className="text-[#1e3a5f] font-bold hover:underline uppercase text-xs tracking-wider">
                        Periksa &rarr;
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] font-serif">
      <nav className="bg-[#1e3a5f] text-white px-6 py-4 flex justify-between items-center border-b-4 border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black uppercase tracking-tighter">Meja Redaksi</span>
        </div>
        <div className="flex items-center gap-4 font-sans text-sm">
          <span className="hidden md:inline text-blue-200">Halo, <strong className="text-white">Admin</strong></span>
          <Link href="/" className="border border-white/30 px-4 py-2 hover:bg-white hover:text-[#1e3a5f] transition font-bold uppercase tracking-wider text-xs">
            Lihat Website
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 mt-6">
        <Suspense fallback={<div className="text-center py-20 font-sans text-slate-500">Memuat arsip...</div>}>
          <DaftarLaporan />
        </Suspense>
      </div>
    </div>
  );
}