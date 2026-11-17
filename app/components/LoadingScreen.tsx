"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  // State untuk mengatur urutan animasi
  const [fase, setFase] = useState<"loading" | "fade-out-teks" | "buka-buku" | "selesai">("loading");

  useEffect(() => {
    // 1. Teks dan GIF muncul selama 2 detik
    const timer1 = setTimeout(() => {
      setFase("fade-out-teks");
    }, 2000);

    // 2. Teks memudar (0.5 detik), lalu buku mulai terbuka
    const timer2 = setTimeout(() => {
      setFase("buka-buku");
    }, 2500);

    // 3. Buku selesai terbuka (1.2 detik), hilangkan komponen
    const timer3 = setTimeout(() => {
      setFase("selesai");
    }, 3700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (fase === "selesai") return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-transparent">
      
      {/* ================= PANEL BUKU KIRI & KANAN ================= */}
      {/* Hanya muncul saat fase 'buka-buku' */}
      <div className="absolute inset-0 z-0 flex">
        <motion.div 
          initial={{ x: 0 }}
          animate={fase === "buka-buku" ? { x: "-100%" } : { x: 0 }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="w-1/2 h-full bg-[#fdfbf7] shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)]"
        ></motion.div>
        <motion.div 
          initial={{ x: 0 }}
          animate={fase === "buka-buku" ? { x: "100%" } : { x: 0 }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="w-1/2 h-full bg-[#fdfbf7] shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.1)]"
        ></motion.div>
      </div>

      {/* ================= KONTEN TENGAH (GIF & TEKS) ================= */}
      {/* Muncul saat fase 'loading', memudar saat 'fade-out-teks' */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={fase === "loading" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-auto bg-[#fdfbf7]"
      >
        {/* GIF */}
        <motion.div
          animate={{ x: [-5, 5, -5], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6"
        >
          <img 
            src="/tenor.gif" 
            alt="Loading..." 
            className="w-24 h-24 object-contain grayscale"
            onError={(e) => {
              e.currentTarget.src = "https://media.tenor.com/On7p9f8qzXAAAAAM/peach-goma.gif";
            }}
          />
        </motion.div>

        {/* Teks AntiBullying */}
        <h1 className="font-serif text-4xl md:text-5xl font-black text-[#1e3a5f] tracking-tighter uppercase mb-2">
          AntiBullying.
        </h1>
        
        {/* Teks Loading */}
        <div className="flex items-center gap-2 font-sans">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Menyiapkan Halaman</span>
          <motion.span 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ duration: 1, repeat: Infinity }}
            className="text-[#1e3a5f] font-bold"
          >
            ...
          </motion.span>
        </div>

      </motion.div>

    </div>
  );
}