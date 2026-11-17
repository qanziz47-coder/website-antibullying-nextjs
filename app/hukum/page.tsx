"use client";

import Navbar from "../components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function HukumPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7] font-serif text-slate-800 pt-32 pb-20 relative">
      <Navbar />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        {/* Header Ala Koran */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center border-b-4 border-double border-slate-800 pb-8 mb-16">
          <div className="inline-block bg-slate-800 text-white px-4 py-1.5 text-xs font-bold font-sans tracking-widest uppercase mb-4">
            EDISI HUKUM & PERLINDUNGAN
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1e3a5f] mb-4 leading-tight uppercase tracking-tighter">
            KAMU DILINDUNGI UNDANG-UNDANG
          </h1>
          <p className="text-slate-600 text-lg md:text-xl font-medium italic max-w-2xl mx-auto">
            "Negara hadir untuk memastikan setiap siswa merasa aman, terlindungi, dan bebas dari segala bentuk kekerasan."
          </p>
        </motion.div>

        {/* Artikel Hukum (Grid Klasik) */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* 1. UUD 1945 */}
          <motion.div variants={fadeInUp} className="border-t-2 border-slate-800 pt-6">
            <h2 className="text-2xl font-black text-[#1e3a5f] mb-2 uppercase">1. Konstitusi Negara</h2>
            <h3 className="text-sm font-bold text-slate-500 font-sans tracking-widest mb-4">UUD 1945 (Pasal 28D & 28I)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Konstitusi menjamin hak setiap warga negara, termasuk siswa, untuk mendapatkan perlindungan hukum yang adil dan perlakuan yang sama di hadapan hukum.
            </p>
            <div className="bg-[#f0ece0] p-4 border-l-4 border-slate-800">
              <p className="text-sm font-bold text-slate-800">"Setiap orang berhak bebas dari perlakuan yang bersifat diskriminatif."</p>
            </div>
          </motion.div>

          {/* 2. UU Perlindungan Anak */}
          <motion.div variants={fadeInUp} className="border-t-2 border-slate-800 pt-6">
            <h2 className="text-2xl font-black text-[#1e3a5f] mb-2 uppercase">2. Perlindungan Anak</h2>
            <h3 className="text-sm font-bold text-slate-500 font-sans tracking-widest mb-4">UU No. 35 Tahun 2014 (Pasal 76C & 80)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Melarang segala bentuk kekerasan fisik maupun psikis terhadap anak di lingkungan sekolah.
            </p>
            <div className="bg-[#f0ece0] p-4 border-l-4 border-slate-800">
              <p className="text-sm font-bold text-slate-800">Ancaman: Penjara maksimal 3 tahun 6 bulan / Denda Rp72.000.000.</p>
            </div>
          </motion.div>

          {/* 3. UU ITE */}
          <motion.div variants={fadeInUp} className="border-t-2 border-slate-800 pt-6">
            <h2 className="text-2xl font-black text-[#1e3a5f] mb-2 uppercase">3. Perundungan Siber</h2>
            <h3 className="text-sm font-bold text-slate-500 font-sans tracking-widest mb-4">UU ITE No. 1 Tahun 2024</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Mengatur sanksi bagi pelaku penghinaan, pencemaran nama baik, dan ancaman kekerasan melalui media elektronik.
            </p>
            <ul className="text-sm font-sans text-slate-600 space-y-2 mb-4">
              <li>• <strong>Pasal 27A jo. 45 (4):</strong> Penjara maks 2 tahun / Denda Rp400 Juta.</li>
              <li>• <strong>Pasal 29 jo. 45B:</strong> Penjara maks 4 tahun / Denda Rp750 Juta.</li>
            </ul>
          </motion.div>

          {/* 4. UU TPKS */}
          <motion.div variants={fadeInUp} className="border-t-2 border-slate-800 pt-6">
            <h2 className="text-2xl font-black text-[#1e3a5f] mb-2 uppercase">4. Pelecehan Seksual</h2>
            <h3 className="text-sm font-bold text-slate-500 font-sans tracking-widest mb-4">UU TPKS No. 12 Tahun 2022</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Memberikan perlindungan khusus bagi korban kekerasan seksual, pelecehan verbal, hingga penyebaran konten pribadi tanpa izin.
            </p>
            <div className="bg-[#f0ece0] p-4 border-l-4 border-slate-800">
              <p className="text-sm font-bold text-slate-800">Korban berhak atas pendampingan psikologis dan hukum.</p>
            </div>
          </motion.div>

        </motion.div>

        {/* Footer Artikel */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-16 pt-8 border-t border-gray-300 text-center">
          <p className="text-slate-500 font-sans text-sm mb-6 italic">Jangan takut melapor. Hukum berpihak pada korban.</p>
          <Link href="/lapor" className="inline-block bg-[#1e3a5f] text-white px-8 py-3 font-bold font-sans uppercase tracking-widest hover:bg-slate-800 transition">
            Buat Laporan Sekarang
          </Link>
        </motion.div>

      </div>
    </main>
  );
}