"use client";

import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#fdfbf7] text-slate-800 border-t-4 border-double border-slate-800 pt-12 pb-6 mt-12 relative overflow-hidden">

      {/* Ornamen Latar Belakang */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Bagian Atas Footer (3 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Kolom 1: Identitas */}
          <div className="border-l-4 border-slate-800 pl-4">
            <h3 className="font-serif font-black text-2xl text-[#1e3a5f] uppercase tracking-tighter mb-3">
              AntiBullying.
            </h3>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              Platform pelaporan perundungan sekolah. Aman, anonim, dan dilindungi hukum. Dibuat sebagai proyek tugas mata pelajaran PPKn.
            </p>
          </div>

          {/* Kolom 2: Kontak Bantuan */}
          <div className="border-l border-gray-300 pl-4">
            <h4 className="font-sans font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">
              Kontak Bantuan
            </h4>
            <ul className="font-serif text-slate-700 space-y-2">
              <li>
                <a href="mailto:sapa129@kemenpppa.go.id" className="hover:text-[#1e3a5f] hover:underline">
                  sapa129@kemenpppa.go.id
                </a>
              </li>
              <li>
                <a href="https://wa.me/628111129129" target="_blank" rel="noreferrer" className="hover:text-[#1e3a5f] hover:underline">
                  08111-129-129
                </a>
              </li>
              <li className="italic text-sm text-slate-500 mt-2">
                (Layanan 24 Jam KemenPPPA)
              </li>
            </ul>
          </div>

          {/* Kolom 3: Tautan */}
          <div className="border-l border-gray-300 pl-4">
            <h4 className="font-sans font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">
              Tautan Cepat
            </h4>
            <ul className="font-serif text-slate-700 space-y-2">
              <li>
                <Link href="/lapor" className="hover:text-[#1e3a5f] hover:underline flex items-center gap-2">
                  <span>→</span> Buat Laporan
                </Link>
              </li>
              <li>
                <Link href="/cek-status" className="hover:text-[#1e3a5f] hover:underline flex items-center gap-2">
                  <span>→</span> Cek Status
                </Link>
              </li>
              <li>
                <Link href="/hukum" className="hover:text-[#1e3a5f] hover:underline flex items-center gap-2">
                  <span>→</span> Dasar Hukum
                </Link>
              </li>
              <li>
                <Link href="/angket" className="hover:text-[#1e3a5f] hover:underline flex items-center gap-2">
                  <span>→</span> Angket Nasional
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Garis Pemisah Ganda */}
        <div className="border-t border-slate-300 mb-6"></div>

        {/* Bagian Bawah Footer (Copyright & Sumber) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-slate-500 uppercase tracking-widest">
          <p className="text-center md:text-left">
            &copy; 2026 Proyek Kelompok PPKn - Fajri. Hak cipta dilindungi.
          </p>
          <p className="text-center md:text-right">
            Sumber Referensi: <span className="font-bold text-slate-700">StopBullying.gov</span> | <span className="font-bold text-slate-700">Kemkes RI</span> | <span className="font-bold text-slate-700">KemenPPPA</span>
          </p>
        </div>

      </div>
    </footer>
  );
}