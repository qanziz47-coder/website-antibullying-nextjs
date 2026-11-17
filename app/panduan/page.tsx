import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function PanduanPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7] font-serif text-slate-800 pt-24 pb-20 relative overflow-hidden">
      <Navbar />

      {/* Ornamen Latar Belakang */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        
        {/* Header dengan GIF */}
        <div className="text-center border-b-4 border-double border-slate-800 pb-8 mb-12 flex flex-col items-center">
          <div className="inline-block bg-slate-800 text-white px-4 py-1.5 text-xs font-bold font-sans tracking-widest uppercase mb-4">
            PUSAT BANTUAN
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1e3a5f] mb-4 uppercase tracking-tighter">
            Panduan Pengisian
          </h1>
          <p className="text-slate-600 font-medium italic mb-6">
            Ikuti langkah-langkah di bawah ini untuk memastikan laporanmu diterima dengan baik.
          </p>
          
          {/* GIF di sini */}
          <div className="bg-white p-4 border border-gray-300 rounded-full shadow-sm">
            <img 
              src="/cute.gif" 
              alt="Maskot Panduan" 
              className="w-24 h-24 object-contain grayscale hover:grayscale-0 transition-all duration-500" 
            />
          </div>
        </div>

        {/* Konten Panduan */}
        <div className="space-y-8">
          
          <div className="bg-white p-6 border border-gray-300 shadow-sm flex gap-6 items-start">
            <div className="bg-[#1e3a5f] text-white w-12 h-12 flex-shrink-0 flex items-center justify-center font-black text-xl font-sans">1</div>
            <div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2 uppercase">Jangan Takut & Jujur</h3>
              <p className="text-slate-600 leading-relaxed">
                Kamu bisa melapor tanpa nama (anonim). Ceritakan kejadian sesuai fakta. Jika kamu atau temanmu dalam bahaya langsung (fisik), pilih opsi <strong>"DARURAT"</strong> di langkah pertama.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-300 shadow-sm flex gap-6 items-start">
            <div className="bg-[#1e3a5f] text-white w-12 h-12 flex-shrink-0 flex items-center justify-center font-black text-xl font-sans">2</div>
            <div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2 uppercase">Ceritakan Detail</h3>
              <p className="text-slate-600 leading-relaxed">
                Saat mengisi kronologi, sebutkan <strong>waktu, tempat, dan siapa</strong> yang terlibat. Jika ada bukti (screenshot chat atau foto), unggah di langkah 6. Bukti yang kuat akan mempercepat penanganan oleh Guru BK.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-300 shadow-sm flex gap-6 items-start">
            <div className="bg-[#1e3a5f] text-white w-12 h-12 flex-shrink-0 flex items-center justify-center font-black text-xl font-sans">3</div>
            <div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2 uppercase">Jaga Kode Tracking</h3>
              <p className="text-slate-600 leading-relaxed">
                Setelah mengirim laporan, kamu akan mendapat <strong>Kode Tracking</strong> (contoh: LAP-2026-XXXX). Simpan kode ini baik-baik. Kamu akan membutuhkannya untuk mengecek status dan membaca balasan dari Guru BK.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-300 shadow-sm flex gap-6 items-start">
            <div className="bg-[#1e3a5f] text-white w-12 h-12 flex-shrink-0 flex items-center justify-center font-black text-xl font-sans">4</div>
            <div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2 uppercase">Privasi Terjamin</h3>
              <p className="text-slate-600 leading-relaxed">
                Laporanmu hanya bisa dibaca oleh guru Bimbingan Konseling (BK) yang berwenang. Identitasmu tidak akan dipublikasikan. Kamu dilindungi oleh kode etik sekolah dan undang-undang.
              </p>
            </div>
          </div>

        </div>

        {/* Tombol Kembali */}
        <div className="mt-16 text-center border-t-4 border-double border-slate-800 pt-8">
          <p className="text-slate-600 mb-6 font-medium">Sudah paham? Silakan kembali untuk melapor.</p>
          <Link href="/lapor" className="inline-block bg-[#10b981] text-white px-8 py-4 font-black font-sans text-lg uppercase tracking-widest hover:bg-emerald-700 transition shadow-md">
            <i className="bi bi-megaphone-fill mr-2"></i> Buat Laporan Sekarang
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}