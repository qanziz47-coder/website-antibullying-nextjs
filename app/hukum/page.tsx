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
              Konstitusi menjamin hak setiap warga negara, termasuk siswa, untuk mendapatkan perlindungan hukum yang adil dan perlakuan yang sama di hadapan hukum. Negara tidak boleh membeda-bedakan perlindungan berdasarkan latar belakang apa pun.
            </p>
            <div className="bg-[#f0ece0] p-4 border-l-4 border-slate-800">
              <p className="text-sm font-bold text-slate-800">"Setiap orang berhak bebas dari perlakuan yang bersifat diskriminatif."</p>
            </div>
          </motion.div>

          {/* 2. UU Perlindungan Anak */}
          <motion.div variants={fadeInUp} className="border-t-2 border-slate-800 pt-6">
            <h2 className="text-2xl font-black text-[#1e3a5f] mb-2 uppercase">2. Perlindungan Anak</h2>
            <h3 className="text-sm font-bold text-slate-500 font-sans tracking-widest mb-4">UU No. 35 Tahun 2014 (Pasal 54, 76C, & 80)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Undang-undang ini secara tegas melarang segala bentuk kekerasan fisik maupun psikis terhadap anak, termasuk di lingkungan sekolah. Pasal 54 ayat (1) menyatakan bahwa anak di dalam dan di lingkungan satuan pendidikan wajib mendapatkan perlindungan dari tindak kekerasan fisik, psikis, kejahatan seksual, dan kejahatan lainnya yang dilakukan oleh pendidik, tenaga kependidikan, sesama peserta didik, dan/atau pihak lain
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pasal 76C menegaskan: "Setiap orang dilarang menempatkan, membiarkan, melakukan, menyuruh melakukan, atau turut serta melakukan kekerasan terhadap Anak."
            </p>
            <div className="bg-[#f0ece0] p-4 border-l-4 border-slate-800">
              <p className="text-sm font-bold text-slate-800">Sanksi (Pasal 80 ayat 1):
                Ancaman: Penjara maksimal 3 tahun 6 bulan / Denda Rp72.000.000.

                (Catatan: Jika kekerasan mengakibatkan luka berat, ancaman pidana meningkat menjadi 5 tahun dan denda Rp100 juta. Jika mengakibatkan kematian, ancaman menjadi 15 tahun dan denda Rp3 miliar .)</p>
            </div>
          </motion.div>

          {/* 3. UU ITE */}
          <motion.div variants={fadeInUp} className="border-t-2 border-slate-800 pt-6">
            <h2 className="text-2xl font-black text-[#1e3a5f] mb-2 uppercase">3. Perundungan Siber</h2>
            <h3 className="text-sm font-bold text-slate-500 font-sans tracking-widest mb-4">UU ITE No. 1 Tahun 2024 (Perubahan Kedua atas UU No. 11 Tahun 2008)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Undang-Undang ini mengatur berbagai tindakan perundungan yang dilakukan melalui media elektronik, mulai dari pencemaran nama baik, ancaman kekerasan, hingga penyebaran konten yang merendahkan martabat. Berikut adalah pasal-pasal kunci yang paling sering digunakan untuk menjerat pelaku perundungan siber:
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              a. Pencemaran Nama Baik (Pasal 27A jo. Pasal 45 ayat (4))
              Setiap orang yang dengan sengaja menyerang kehormatan atau nama baik orang lain dengan cara menuduhkan suatu hal, dengan maksud supaya hal tersebut diketahui umum melalui sistem elektronik, dapat dipidana.
            </p>
            <div className="bg-[#f0ece0] p-4 border-l-4 border-slate-800">
              <p className="text-sm font-bold text-slate-800">Hak Korban:
                Sanksi:
                Penjara maksimal 2 tahun dan/atau denda paling banyak Rp400.000.000,00 (empat ratus juta rupiah).</p>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              b. Ancaman Kekerasan atau Menakut-nakuti (Pasal 29 jo. Pasal 45B)
              Setiap orang yang dengan sengaja dan tanpa hak mengirimkan Informasi Elektronik dan/atau Dokumen Elektronik secara langsung kepada korban yang berisi ancaman kekerasan dan/atau menakut-nakuti.
            </p>
            <div className="bg-[#f0ece0] p-4 border-l-4 border-slate-800">
              <p className="text-sm font-bold text-slate-800">Hak Korban:
                Sanksi:
                Penjara maksimal 4 tahun dan/atau denda paling banyak Rp750.000.000,00 (tujuh ratus lima puluh juta rupiah).</p>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              c. Penyebaran Konten yang Melanggar Kesusilaan (Pasal 27 ayat (1) jo. Pasal 45)
              Setiap orang yang dengan sengaja dan tanpa hak menyiarkan, mempertunjukkan, mendistribusikan, mentransmisikan, dan/atau membuat dapat diaksesnya informasi elektronik yang memiliki muatan yang melanggar kesusilaan untuk diketahui umum.
            </p>
            <div className="bg-[#f0ece0] p-4 border-l-4 border-slate-800">
              <p className="text-sm font-bold text-slate-800">Hak Korban:
                Sanksi:
                Penjara maksimal 6 tahun dan/atau denda paling banyak Rp1.000.000.000,00 (satu miliar rupiah).</p>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              d. Penghasutan atau Ujaran Kebencian (Pasal 28 ayat (2) jo. Pasal 45A ayat (2))
              Setiap orang yang dengan sengaja dan tanpa hak mendistribusikan informasi elektronik yang sifatnya menghasut, mengajak, atau memengaruhi orang lain sehingga menimbulkan rasa kebencian atau permusuhan terhadap individu atau kelompok masyarakat tertentu berdasarkan ras, kebangsaan, etnis, warna kulit, agama, kepercayaan, jenis kelamin, disabilitas mental, atau disabilitas fisik.
            </p>
            <div className="bg-[#f0ece0] p-4 border-l-4 border-slate-800">
              <p className="text-sm font-bold text-slate-800">Hak Korban:
                Sanksi:
                Penjara maksimal 6 tahun dan/atau denda paling banyak Rp1.000.000.000,00 (satu miliar rupiah).</p>
            </div>
          </motion.div>

          {/* 4. UU TPKS */}
          <motion.div variants={fadeInUp} className="border-t-2 border-slate-800 pt-6">
            <h2 className="text-2xl font-black text-[#1e3a5f] mb-2 uppercase">4. Pelecehan Seksual</h2>
            <h3 className="text-sm font-bold text-slate-500 font-sans tracking-widest mb-4">UU TPKS No. 12 Tahun 2022</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Memberikan perlindungan khusus bagi korban kekerasan seksual, pelecehan verbal, hingga penyebaran konten pribadi tanpa izin. Pasal 6 UU TPKS mengatur bahwa perbuatan seksual fisik yang merendahkan harkat dan martabat seseorang dapat dipidana dengan penjara paling lama 4 tahun dan/atau denda paling banyak Rp50.000.000.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Selain sanksi pidana, UU ini juga menekankan hak korban untuk mendapatkan pemulihan.
            </p>
            <div className="bg-[#f0ece0] p-4 border-l-4 border-slate-800">
              <p className="text-sm font-bold text-slate-800">Hak Korban:
                Korban berhak atas pendampingan psikologis dan hukum, serta pemulihan. (Sesuai dengan amanat UU TPKS yang menjamin hak pemulihan korban).</p>
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