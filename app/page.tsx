"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Divider from "./components/Divider";
import { motion, AnimatePresence } from "framer-motion";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Variabel Animasi
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// Komponen Animasi Angka
const AnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalDuration = 1500; 
    let incrementTime = (totalDuration / end) * 10;

    let timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString('id-ID')}</span>;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"IPA" | "IPM" | "IPG">("IPA");
  const [selectedJenis, setSelectedJenis] = useState<any>(null);
  const [tabSimfoni, setTabSimfoni] = useState<"semua" | "anak" | "perempuan" | "laki">("semua");
  const [currentVideo, setCurrentVideo] = useState(0);

  const dataSimfoni = {
    semua: { kasus: 26086, perempuan: 21714, laki: 4364 },
    anak: { kasus: 18500, perempuan: 15000, laki: 3500 },
    perempuan: { kasus: 7586, perempuan: 6714, laki: 864 }, 
    laki: { kasus: 7586, perempuan: 6714, laki: 864 }, 
  };

const videos = [
  {
    title: "Bingung Cara Menghadapinya?",
    desc: "Tonton video singkat ini. Ada langkah-langkah seru dan mudah yang bisa kamu lakukan jika melihat atau mengalami perundungan.",
    url: "https://www.youtube.com/embed/kMQzcsaRtyk",
    link: "https://youtu.be/kMQzcsaRtyk",
  },
  {
    title: "Kenali Cyberbullying",
    desc: "Pelajari bagaimana cyberbullying terjadi di media sosial dan bagaimana cara melindungi diri dari serangannya.",
    url: "https://www.youtube.com/embed/k_CBybYkdWs",
    link: "https://youtu.be/k_CBybYkdWs",
  },
  {
    title: "Menjadi Pelindung, Bukan Penonton",
    desc: "Saksi (bystander) punya kekuatan besar untuk menghentikan bullying. Pelajari cara membantu korban dengan aman.",
    url: "https://www.youtube.com/embed/am3sGO12f6Q",
    link: "https://youtu.be/am3sGO12f6Q",
  },
];
  const nextVideo = () => setCurrentVideo((prev) => (prev + 1) % videos.length);
  const prevVideo = () => setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);

  const dataKementerian = {
    IPA: {
      title: "Indeks Perlindungan Anak (IPA)",
      desc: "IPA adalah angka yang menggambarkan pencapaian pemenuhan hak anak dan perlindungan khusus anak. Meliputi hak sipil, kebebasan, hak lingkungan keluarga, kesehatan dasar, dan pendidikan.",
      score: "63.83", increase: "0.84%", color: "#10b981", gradient: "from-emerald-400 to-teal-500", link: "https://kemenpppa.go.id/",
      chartData: [{ tahun: '2021', nilai: 61.38 }, { tahun: '2022', nilai: 63.30 }, { tahun: '2023', nilai: 63.83 }, { tahun: '2024', nilai: 64.5 }]
    },
    IPM: {
      title: "Indeks Pembangunan Manusia (IPM)",
      desc: "IPM mengukur capaian pembangunan manusia berbasis sejumlah komponen dasar kualitas hidup, seperti umur panjang dan hidup sehat, pengetahuan, dan standar hidup layak.",
      score: "74.20", increase: "0.58%", color: "#3b82f6", gradient: "from-blue-400 to-indigo-500", link: "https://www.bps.go.id/id/statistics-table?subject=515",
      chartData: [{ tahun: '2021', nilai: 72.29 }, { tahun: '2022', nilai: 72.91 }, { tahun: '2023', nilai: 73.77 }, { tahun: '2024', nilai: 74.20 }]
    },
    IPG: {
      title: "Indeks Pembangunan Gender (IPG)",
      desc: "IPG mengukur perbedaan capaian antara laki-laki dan perempuan dalam dimensi kesehatan, pendidikan, dan ekonomi. Semakin mendekati 100, semakin setara.",
      score: "91.85", increase: "0.45%", color: "#a855f7", gradient: "from-purple-400 to-pink-500", link: "https://www.bps.go.id/id/statistics-table?subject=515",
      chartData: [{ tahun: '2021', nilai: 90.4 }, { tahun: '2022', nilai: 91.1 }, { tahun: '2023', nilai: 91.4 }, { tahun: '2024', nilai: 91.85 }]
    }
  };

  const currentData = dataKementerian[activeTab];
  const currentSimfoni = dataSimfoni[tabSimfoni];

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-serif text-slate-800 overflow-x-hidden">
      <Navbar />

      {/* ================= 1. HERO SECTION ================= */}
      <section 
        className="relative w-full min-h-screen flex items-center pt-20 pb-10"
        style={{
          backgroundImage: "url('/hero.jpg')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", 
        }}
      >
        <div className="absolute inset-0 bg-[#1e3a5f]/90 z-0"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="lg:w-1/2 space-y-6 relative">
            <div className="inline-block bg-[#fdfbf7] text-[#1e3a5f] px-5 py-2 text-sm font-bold tracking-widest uppercase border border-[#1e3a5f] shadow-sm">
              <i className="bi bi-shield-check mr-2"></i> Layanan Anti Bullying
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              Hentikan <br className="hidden lg:block" /> 
              <span className="text-yellow-400">Perundungan!</span>
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed max-w-lg font-medium">
              Jangan takut untuk speak up! Website ini tempat kamu melapor dengan aman dan rahasia. Kami siap mendengarkan dan melindungimu.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/lapor" className="bg-[#10b981] text-white px-8 py-4 font-bold text-lg hover:bg-emerald-600 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <i className="bi bi-megaphone-fill"></i> Buat Laporan
              </Link>
              <Link href="/cek-status" className="bg-transparent border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-white hover:text-[#1e3a5f] hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <i className="bi bi-search"></i> Cek Status
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="lg:w-1/2 w-full">
            <div className="bg-[#fdfbf7] p-6 md:p-8 shadow-2xl border border-gray-300 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-300 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#1e3a5f]">Laporan SIMFONI PPA</h3>
                  <p className="text-slate-500 text-sm">Data Perlindungan Perempuan & Anak</p>
                </div>
                <div className="bg-white px-4 py-2 text-sm font-semibold text-slate-700 border border-gray-300">
                  <i className="bi bi-calendar-event mr-2"></i>16 Nov 2026
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                <button onClick={() => setTabSimfoni("semua")} className={`px-4 py-2 text-sm font-bold border transition ${tabSimfoni === "semua" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "bg-transparent text-slate-600 border-gray-300 hover:bg-gray-100"}`}>Semua</button>
                <button onClick={() => setTabSimfoni("anak")} className={`px-4 py-2 text-sm font-bold border transition ${tabSimfoni === "anak" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "bg-transparent text-slate-600 border-gray-300 hover:bg-gray-100"}`}>Anak</button>
                <button onClick={() => setTabSimfoni("perempuan")} className={`px-4 py-2 text-sm font-bold border transition ${tabSimfoni === "perempuan" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "bg-transparent text-slate-600 border-gray-300 hover:bg-gray-100"}`}>Perempuan</button>
                <button onClick={() => setTabSimfoni("laki")} className={`px-4 py-2 text-sm font-bold border transition ${tabSimfoni === "laki" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "bg-transparent text-slate-600 border-gray-300 hover:bg-gray-100"}`}>Laki-laki</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center md:text-left">
                <div className={`transition-all duration-500 ${tabSimfoni === "perempuan" || tabSimfoni === "laki" ? "opacity-30 grayscale" : "opacity-100"}`}>
                  <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">Jumlah Kasus</p>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1e3a5f]"><AnimatedNumber value={currentSimfoni.kasus} /></h2>
                </div>
                <div className={`transition-all duration-500 ${tabSimfoni === "perempuan" ? "opacity-100 scale-105" : tabSimfoni === "laki" ? "opacity-30 grayscale" : "opacity-100"}`}>
                  <p className="text-pink-600 text-xs font-bold mb-1 uppercase tracking-wider">Perempuan</p>
                  <h2 className={`text-4xl md:text-5xl font-black tracking-tight text-pink-500 ${tabSimfoni === "perempuan" ? "drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]" : ""}`}><AnimatedNumber value={currentSimfoni.perempuan} /></h2>
                </div>
                <div className={`transition-all duration-500 ${tabSimfoni === "laki" ? "opacity-100 scale-105" : tabSimfoni === "perempuan" ? "opacity-30 grayscale" : "opacity-100"}`}>
                  <p className="text-blue-600 text-xs font-bold mb-1 uppercase tracking-wider">Laki-laki</p>
                  <h2 className={`text-4xl md:text-5xl font-black tracking-tight text-blue-500 ${tabSimfoni === "laki" ? "drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" : ""}`}><AnimatedNumber value={currentSimfoni.laki} /></h2>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-6 text-center md:text-left font-medium">Jika Anda mengalami atau menyaksikan kekerasan, segera laporkan melalui tombol di bawah ini.</p>
              <a href="https://wa.me/628111129129" target="_blank" rel="noreferrer" className="block w-full bg-[#10b981] hover:bg-emerald-600 text-white text-center py-3.5 font-bold text-lg transition-colors">
                Lapor SAPA 129 Sekarang <i className="bi bi-arrow-right ml-1"></i>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider topColor="#1e3a5f" bottomColor="#fdfbf7" />

      {/* ================= 2. EDUKASI ================= */}
      <section id="jenis" className="py-20 bg-[#fdfbf7] bg-dots relative">
        <div className="container mx-auto px-6 text-center mb-16 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative inline-block">
            <h2 className="text-3xl lg:text-4xl font-black text-[#1e3a5f] mb-4 inline-block relative">
              Kenali Jenisnya Yuk!
              <svg className="absolute -bottom-4 left-0 w-full h-4 text-yellow-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 12.5 0, 25 5 T 50 5 T 75 5 T 100 5" fill="transparent" stroke="currentColor" strokeWidth="3" />
              </svg>
            </h2>
          </motion.div>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-slate-500 font-medium max-w-2xl mx-auto mt-8">
            Bullying bukan cuma soal pukulan. <strong>Klik kartu di bawah</strong> untuk melihat detail.
          </motion.p>
        </div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <motion.div variants={fadeInUp} onClick={() => setSelectedJenis({ title: "Perundungan Siber", icon: "bi-laptop", desc: "Dihina di chat, komentar, atau disebar fotonya tanpa izin di media sosial.", contoh: ["Mengirim pesan langsung (DM) berisi hinaan.", "Membuat akun palsu untuk menjelekkan korban.", "Menyebarkan foto aib korban."] })} className="bg-white p-8 border border-gray-300 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="bg-[#fdfbf7] w-16 h-16 rounded-full flex items-center justify-center text-3xl border border-gray-300 mb-6 text-[#1e3a5f]">
              <i className="bi bi-laptop"></i>
            </div>
            <h3 className="font-extrabold text-xl mb-3 text-[#1e3a5f]">Perundungan Siber</h3>
            <p className="text-slate-600 text-sm font-medium">Dihina di chat, komentar, atau disebar fotonya tanpa izin di media sosial.</p>
          </motion.div>
          <motion.div variants={fadeInUp} onClick={() => setSelectedJenis({ title: "Fisik", icon: "bi-hand-index-thumb", desc: "Dipukul, didorong, ditendang, atau barang-barangmu dirusak oleh teman.", contoh: ["Memukul, menendang, atau mendorong.", "Merusak atau merampas barang.", "Mengunci korban di dalam ruangan."] })} className="bg-white p-8 border border-gray-300 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="bg-[#fdfbf7] w-16 h-16 rounded-full flex items-center justify-center text-3xl border border-gray-300 mb-6 text-[#1e3a5f]">
              <i className="bi bi-hand-index-thumb"></i>
            </div>
            <h3 className="font-extrabold text-xl mb-3 text-[#1e3a5f]">Fisik</h3>
            <p className="text-slate-600 text-sm font-medium">Dipukul, didorong, ditendang, atau barang-barangmu dirusak oleh teman.</p>
          </motion.div>
          <motion.div variants={fadeInUp} onClick={() => setSelectedJenis({ title: "Verbal", icon: "bi-chat-quote", desc: "Diejek, dihina, dipanggil dengan julukan buruk, atau diancam dengan kata-kata.", contoh: ["Memanggil dengan julukan merendahkan.", "Menghina atau mengejek.", "Menyebarkan gosip palsu."] })} className="bg-white p-8 border border-gray-300 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="bg-[#fdfbf7] w-16 h-16 rounded-full flex items-center justify-center text-3xl border border-gray-300 mb-6 text-[#1e3a5f]">
              <i className="bi bi-chat-quote"></i>
            </div>
            <h3 className="font-extrabold text-xl mb-3 text-[#1e3a5f]">Verbal</h3>
            <p className="text-slate-600 text-sm font-medium">Diejek, dihina, dipanggil dengan julukan buruk, atau diancam dengan kata-kata.</p>
          </motion.div>
          <motion.div variants={fadeInUp} onClick={() => setSelectedJenis({ title: "Sosial", icon: "bi-people", desc: "Sengaja dikucilkan, tidak diajak main, atau disebarkan rumor bohong tentangmu.", contoh: ["Sengaja mengucilkan seseorang.", "Menyuruh teman lain untuk menjauhi korban.", "Mempermalukan korban di depan umum."] })} className="bg-white p-8 border border-gray-300 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="bg-[#fdfbf7] w-16 h-16 rounded-full flex items-center justify-center text-3xl border border-gray-300 mb-6 text-[#1e3a5f]">
              <i className="bi bi-people"></i>
            </div>
            <h3 className="font-extrabold text-xl mb-3 text-[#1e3a5f]">Sosial</h3>
            <p className="text-slate-600 text-sm font-medium">Sengaja dikucilkan, tidak diajak main, atau disebarkan rumor bohong tentangmu.</p>
          </motion.div>
        </motion.div>
      </section>

      <Divider flip={true} topColor="#fdfbf7" bottomColor="#ffffff" />

      {/* ================= 3. PERLINDUNGAN PEREMPUAN ================= */}
      <section className="py-24 bg-white bg-stripes relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block text-[#d81b60] px-4 py-1.5 text-sm font-bold tracking-wide uppercase border border-[#d81b60] bg-white">Kesetaraan & Perlindungan</div>
            <h2 className="text-3xl lg:text-5xl font-black text-[#1e3a5f] leading-tight">Perlindungan Khusus Perempuan</h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">Siapapun berhak merasa aman. Negara hadir untuk melindungi perempuan dari segala bentuk kekerasan, body shaming, dan pelecehan.</p>
            <div className="space-y-4 pt-4">
              <div className="bg-[#fdfbf7] p-5 border border-gray-200 flex gap-4 items-start">
                <i className="bi bi-bank text-2xl text-[#1e3a5f]"></i>
                <div><h4 className="font-bold text-slate-800">UU No. 12 Tahun 2022 (TPKS)</h4><p className="text-sm text-slate-500">Memberikan hukuman berat bagi pelaku kekerasan seksual dan pelecehan.</p></div>
              </div>
              <div className="bg-[#fdfbf7] p-5 border border-gray-200 flex gap-4 items-start">
                <i className="bi bi-globe text-2xl text-[#1e3a5f]"></i>
                <div><h4 className="font-bold text-slate-800">UU No. 7 Tahun 1984 (CEDAW)</h4><p className="text-sm text-slate-500">Komitmen Indonesia menghapus diskriminasi terhadap perempuan.</p></div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="border-4 border-white shadow-xl">
              <img src="/img/perempuan-kuat.jpg" alt="Perempuan Berdaya" className="w-full h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </motion.div>
      </section>

      <Divider topColor="#ffffff" bottomColor="#fdfbf7" />

      {/* ================= 4. PERLINDUNGAN LAKI-LAKI ================= */}
      <section className="py-24 bg-[#fdfbf7]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="border-4 border-white shadow-xl">
              <img src="/img/laki-laki-kuat.jpg" alt="Dukungan Laki-laki" className="w-full h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block text-[#1e3a5f] px-4 py-1.5 text-sm font-bold tracking-wide uppercase border border-[#1e3a5f]">Kesetaraan & Perlindungan</div>
            <h2 className="text-3xl lg:text-5xl font-black text-[#1e3a5f] leading-tight">Perlindungan & Peran Laki-Laki</h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">Laki-laki juga berhak dilindungi dari kekerasan. Selain itu, laki-laki memiliki peran penting untuk menghentikan budaya perundungan.</p>
            <div className="space-y-4 pt-4">
              <div className="bg-white p-5 border border-gray-200 flex gap-4 items-start">
                <i className="bi bi-shield-check text-2xl text-[#1e3a5f]"></i>
                <div><h4 className="font-bold text-slate-800">Hak Perlindungan yang Sama</h4><p className="text-sm text-slate-500">Hukum melindungi semua jenis kelamin dari kekerasan dan ancaman.</p></div>
              </div>
              <div className="bg-white p-5 border border-gray-200 flex gap-4 items-start">
                <i className="bi bi-person-check text-2xl text-[#1e3a5f]"></i>
                <div><h4 className="font-bold text-slate-800">Berani Menjadi Pelindung</h4><p className="text-sm text-slate-500">Laki-laki sejati berani membela korban dan melaporkan kekerasan.</p></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Divider topColor="#fdfbf7" bottomColor="#1e3a5f" />

      {/* ================= 5. VIDEO SLIDER ================= */}
      <section className="py-20 bg-[#1e3a5f] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 w-full relative">
              <AnimatePresence mode="wait">
                <motion.div key={currentVideo} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }} className="aspect-video overflow-hidden border-8 border-white shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500">
                  <iframe className="w-full h-full" src={videos[currentVideo].url} title={videos[currentVideo].title} allowFullScreen></iframe>
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6 z-20">
                <button onClick={prevVideo} className="bg-[#fdfbf7] hover:bg-gray-200 text-[#1e3a5f] w-12 h-12 flex items-center justify-center transition-all shadow-lg text-xl border border-gray-400">
                  <i className="bi bi-arrow-left"></i>
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6 z-20">
                <button onClick={nextVideo} className="bg-[#fdfbf7] hover:bg-gray-200 text-[#1e3a5f] w-12 h-12 flex items-center justify-center transition-all shadow-lg text-xl border border-gray-400">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div key={currentVideo} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                  <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-4">{videos[currentVideo].title}</h2>
                  <p className="text-blue-100 text-lg font-medium mb-8">{videos[currentVideo].desc}</p>
                  <a href={videos[currentVideo].link} target="_blank" rel="noreferrer" className="inline-block bg-yellow-400 text-[#1e3a5f] px-8 py-3 font-bold text-lg hover:bg-yellow-300 transition shadow-lg border-2 border-transparent hover:border-white">
                    <i className="bi bi-play-fill mr-1"></i> Tonton di YouTube
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Divider topColor="#1e3a5f" bottomColor="#fdfbf7" />

      {/* ================= 6. DATA KEMENTERIAN ================= */}
      <section className="py-24 bg-[#fdfbf7] bg-lines relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-10 border-b-2 border-slate-800 pb-4">
            <h2 className="text-3xl lg:text-4xl font-black text-[#1e3a5f] mb-2 uppercase tracking-tighter">Data Kementerian</h2>
            <p className="text-slate-500 font-medium italic">Pantau capaian perlindungan anak dan kesetaraan gender di Indonesia.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-12 font-sans">
            <button onClick={() => setActiveTab("IPA")} className={`flex items-center gap-2 px-6 py-3 font-bold border-2 transition-all duration-300 ${activeTab === "IPA" ? `bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-[4px_4px_0px_#10b981]` : "bg-white text-slate-600 border-gray-300 hover:bg-gray-100"}`}>
              <i className="bi bi-shield-check"></i> Indeks Perlindungan Anak (IPA)
            </button>
            <button onClick={() => setActiveTab("IPM")} className={`flex items-center gap-2 px-6 py-3 font-bold border-2 transition-all duration-300 ${activeTab === "IPM" ? `bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-[4px_4px_0px_#3b82f6]` : "bg-white text-slate-600 border-gray-300 hover:bg-gray-100"}`}>
              <i className="bi bi-people"></i> Indeks Pembangunan Manusia (IPM)
            </button>
            <button onClick={() => setActiveTab("IPG")} className={`flex items-center gap-2 px-6 py-3 font-bold border-2 transition-all duration-300 ${activeTab === "IPG" ? `bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-[4px_4px_0px_#a855f7]` : "bg-white text-slate-600 border-gray-300 hover:bg-gray-100"}`}>
              <i className="bi bi-gender-ambiguous"></i> Indeks Pembangunan Gender (IPG)
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3 space-y-6">
              <h3 className="text-2xl font-bold text-[#1e3a5f] uppercase">{currentData.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{currentData.desc}</p>
              <a href={currentData.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#1e3a5f] text-white px-6 py-3 font-sans font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 uppercase tracking-wider">
                Lihat Laporan Lengkap <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            
            <div className="lg:w-2/3 w-full bg-white p-6 border-2 border-slate-800 shadow-[8px_8px_0px_#1e3a5f]">
              <div className="flex justify-between items-start mb-6 border-b-2 border-dashed border-gray-300 pb-4">
                <div>
                  <h4 className="font-bold text-gray-800 font-serif text-xl">{currentData.title}</h4>
                  <div className="flex items-end gap-2 mt-1 font-sans">
                    <span className="text-5xl font-black text-[#1e3a5f]">{currentData.score}</span>
                    <span className="text-sm text-gray-500 mb-1 font-bold uppercase">Skor</span>
                  </div>
                </div>
                <div className="text-right font-sans">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 mb-2 border border-gray-300">
                    <i className="bi bi-calendar-event mr-1"></i> 2021 - 2024
                  </span>
                  <br />
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 border border-green-300">
                    <i className="bi bi-graph-up-arrow mr-1"></i> {currentData.increase} Kenaikan
                  </span>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData.chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorNilai" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={currentData.color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={currentData.color} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="tahun" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontFamily: 'sans-serif'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontFamily: 'sans-serif'}} domain={['dataMin - 2', 'dataMax + 1']} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="nilai" 
                      stroke={currentData.color} 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorNilai)"
                      dot={{ r: 6, fill: '#ffffff', stroke: currentData.color, strokeWidth: 3 }}
                      activeDot={{ r: 8, fill: currentData.color, stroke: '#ffffff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider flip={true} topColor="#fdfbf7" bottomColor="#fdfbf7" />

      {/* ================= 7. BANTUAN DARURAT ================= */}
      <section className="py-24 bg-[#fdfbf7] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <div className="border-t-4 border-double border-slate-800 mb-8"></div>
          <div className="font-sans font-bold text-red-800 tracking-[0.2em] uppercase text-sm mb-4">— Pengumuman Darurat —</div>
          <h2 className="text-5xl md:text-7xl font-black text-[#1e3a5f] mb-6 uppercase tracking-tighter leading-none font-serif">Kamu Butuh Bantuan Sekarang?</h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-slate-400 w-16"></div>
            <span className="text-slate-500 font-serif italic text-lg">Tindakan Cepat</span>
            <div className="h-px bg-slate-400 w-16"></div>
          </div>
          <p className="text-slate-800 mb-12 text-xl md:text-2xl font-medium italic max-w-3xl mx-auto leading-relaxed font-serif">"Jangan diam saja. Jika kamu atau temanmu dalam bahaya langsung, segera hubungi pihak yang bisa menolong."</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 font-sans">
            <Link href="/lapor" className="bg-[#10b981] text-white px-10 py-4 font-black text-lg hover:bg-emerald-700 transition border-2 border-transparent hover:border-slate-800 uppercase tracking-widest shadow-md flex items-center justify-center gap-2">
              <i className="bi bi-megaphone-fill"></i> Buat Laporan Darurat
            </Link>
            <a href="https://wa.me/628111129129" target="_blank" rel="noreferrer" className="bg-[#1e3a5f] text-white px-10 py-4 font-black text-lg hover:bg-slate-800 transition border-2 border-transparent hover:border-slate-800 uppercase tracking-widest shadow-md flex items-center justify-center gap-2">
              <i className="bi bi-whatsapp"></i> Hubungi SAPA 129
            </a>
          </div>
          <div className="border-b-4 border-double border-slate-800 mt-12"></div>
        </motion.div>
      </section>

      {/* ================= 8. POP-UP MODAL EDUKASI ================= */}
      {selectedJenis && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-[#fdfbf7] p-8 max-w-lg w-full shadow-2xl relative border border-gray-300">
            <button onClick={() => setSelectedJenis(null)} className="absolute top-4 right-4 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-600 transition">
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="text-5xl mb-4 text-[#1e3a5f]">
              <i className={`bi ${selectedJenis.icon}`}></i>
            </div>
            <h3 className="text-2xl font-black text-[#1e3a5f] mb-2">{selectedJenis.title}</h3>
            <p className="text-slate-600 mb-6">{selectedJenis.desc}</p>
            <div className="bg-white p-5 border border-gray-200 mb-6">
              <h4 className="font-bold text-gray-800 mb-3">Contoh Perilaku:</h4>
              <ul className="space-y-2">
                {selectedJenis.contoh.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <i className="bi bi-check-circle-fill text-[#1e3a5f] mt-1"></i> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelectedJenis(null)} className="flex-1 bg-gray-200 text-gray-700 py-3 font-bold hover:bg-gray-300 transition">Tutup</button>
              <Link href="/lapor" className="flex-1 bg-[#10b981] text-white py-3 font-bold text-center hover:bg-emerald-600 transition">Laporkan Kasus Ini</Link>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  );
}