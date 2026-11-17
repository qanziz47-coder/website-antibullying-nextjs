import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export default async function DetailLaporan({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await params (karena Next.js 15+ menjadikannya Promise)
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  // 2. Cek Login
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session) redirect("/login");

  // 3. Ambil data laporan berdasarkan ID
  const laporan = await prisma.laporan.findUnique({
    where: { id: id },
  });

  if (!laporan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] font-serif">
        <h1 className="text-xl font-bold text-slate-600">Laporan tidak ditemukan.</h1>
      </div>
    );
  }

  // 4. Fungsi Server Action untuk Menyimpan Perubahan
  async function simpanPerubahan(formData: FormData) {
    "use server";
    
    const statusBaru = formData.get("status") as string;
    const balasanBaru = formData.get("balasan") as string;

    await prisma.laporan.update({
      where: { id: id },
      data: {
        status: statusBaru,
        balasan_admin: balasanBaru,
      },
    });

    // Refresh halaman agar data terbaru langsung muncul
    revalidatePath(`/admin/dashboard/${id}`);
    revalidatePath("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-serif text-slate-800 py-10 px-4 relative overflow-hidden">
      
      {/* Ornamen Latar Belakang (Titik-titik halus) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Tombol Kembali */}
        <Link href="/admin/dashboard" className="inline-flex items-center text-[#1e3a5f] font-bold hover:underline mb-6 font-sans uppercase tracking-widest text-xs">
          <span className="mr-2">&larr;</span> Kembali ke Arsip
        </Link>

        {/* Kertas Laporan */}
        <div className="bg-white border-2 border-slate-800 shadow-[8px_8px_0px_#1e3a5f] p-6 md:p-10">
          
          {/* Header Laporan */}
          <div className="border-b-4 border-double border-slate-800 pb-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-black text-[#1e3a5f] uppercase tracking-tighter mb-1">Lembar Investigasi</h1>
                <p className="font-sans text-sm text-slate-500">Kode: {laporan.kode}</p>
              </div>
              <div className="text-right font-sans text-xs text-slate-500 uppercase tracking-widest border border-gray-300 p-2">
                <p>Tanggal Masuk</p>
                <p className="font-bold text-slate-800">{new Date(laporan.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Info Laporan */}
          <div className="space-y-4 font-sans text-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-200 pb-2">
              <div className="text-slate-500 uppercase tracking-wider font-bold text-xs">Jenis Laporan</div>
              <div className="md:col-span-2 font-bold text-slate-800">{laporan.jenis}</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-200 pb-2">
              <div className="text-slate-500 uppercase tracking-wider font-bold text-xs">Status Pelapor</div>
              <div className="md:col-span-2 font-bold text-slate-800">
                {laporan.anonim ? "Anonim (Dirahasiakan)" : laporan.nama_pelapor}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-200 pb-2">
              <div className="text-slate-500 uppercase tracking-wider font-bold text-xs">Kontak</div>
              <div className="md:col-span-2">{laporan.anonim ? "-" : (laporan.kontak || "-")}</div>
            </div>
          </div>

          {/* Kronologi */}
          <div className="mb-8">
            <div className="text-slate-500 uppercase tracking-wider font-bold text-xs mb-2 font-sans">Kronologi Kejadian:</div>
            <div className="bg-[#fdfbf7] p-5 border border-gray-300 text-slate-800 whitespace-pre-wrap font-serif italic text-sm leading-relaxed relative">
              <div className="absolute -top-3 -left-2 text-5xl text-gray-200 font-serif">"</div>
              <span className="relative z-10">{laporan.kronologi}</span>
            </div>
          </div>

          {/* Form Tindak Lanjut */}
          <div className="bg-[#fdfbf7] border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-4 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#1e3a5f]"></span> Lembar Tindak Lanjut
            </h2>

            <form action={simpanPerubahan} className="space-y-4 font-sans text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">Ubah Status Laporan</label>
                <select 
                  name="status" 
                  defaultValue={laporan.status} 
                  className="w-full p-3 border-2 border-gray-300 focus:border-[#1e3a5f] outline-none transition-all bg-white"
                >
                  <option value="diterima">Diterima</option>
                  <option value="diproses">Diproses</option>
                  <option value="selesai">Selesai</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">Pesan Balasan untuk Pelapor</label>
                <textarea 
                  name="balasan" 
                  defaultValue={laporan.balasan_admin || ""} 
                  rows={4} 
                  placeholder="Tulis tanggapan atau hasil investigasi di sini..."
                  className="w-full p-3 border-2 border-gray-300 focus:border-[#1e3a5f] outline-none transition-all bg-white"
                ></textarea>
              </div>

              <button type="submit" className="bg-[#1e3a5f] text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-slate-800 transition w-full md:w-auto">
                Simpan & Segel Laporan
              </button>
            </form>
          </div>

          {/* Footer Laporan */}
          <div className="mt-8 pt-4 border-t border-gray-300 text-center font-sans text-xs text-slate-400 uppercase tracking-widest">
            Dokumen ini bersifat rahasia dan hanya untuk keperluan internal sekolah.
          </div>

        </div>
      </div>
    </div>
  );
}