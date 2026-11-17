"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { simpanLaporan } from "../actions/laporan";

export default function LaporPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pesanSukses, setPesanSukses] = useState("");
  const [error, setError] = useState("");

  // State form (Default Anonim = true)
  const [formData, setFormData] = useState({
    statusDarurat: "",
    kehawatiran: "",
    jenis: "",
    kronologi: "",
    anonim: true, 
    nama: "",
    namaSekolah: "",
    nomorTelepon: "",
    sembunyikanSekolah: false
  });

  const [direction, setDirection] = useState(1);

  const nextStep = () => {
    // Jika pengguna memilih DARURAT, arahkan ke WhatsApp SAPA 129
    // saat tombol "Selanjutnya" ditekan.
    if (step === 1 && formData.statusDarurat === "Darurat") {
      const pesan = encodeURIComponent(
        "Halo SAPA 129, saya membutuhkan bantuan. Mohon arahan lebih lanjut."
      );
      window.open(`https://wa.me/628111129129?text=${pesan}`, "_blank", "noopener,noreferrer");
      return;
    }

    setDirection(1);
    setStep((prev) => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("jenis", formData.jenis);
    data.append("kronologi", formData.kronologi);
    data.append("nama", formData.nama);
    data.append("namaSekolah", formData.sembunyikanSekolah ? "" : formData.namaSekolah);
    data.append("nomorTelepon", formData.nomorTelepon);
    if (formData.anonim) data.append("anonim", "on");

    const result = await simpanLaporan(data);

    if (result.success) {
      setPesanSukses(result.kode!);
    } else {
      setError(result.message || "Gagal mengirim laporan.");
    }
    setLoading(false);
  };

  if (pesanSukses) {
    return (
      <main className="min-h-screen bg-[#fdfbf7] font-serif text-slate-800 pt-32 pb-12">
        <Navbar />
        <div className="container mx-auto px-6 max-w-xl mt-10">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 shadow-[8px_8px_0px_#10b981] border-2 border-slate-800 text-center">
            <div className="text-6xl mb-4">📜</div>
            <h2 className="text-3xl font-black text-[#1e3a5f] mb-4 uppercase tracking-tighter">Laporan Diterima</h2>
            <p className="text-slate-600 mb-6 font-medium italic">Simpan kode rahasia ini untuk mengecek status laporanmu:</p>
            <div className="bg-[#fdfbf7] p-4 border-2 border-dashed border-slate-800 text-2xl font-mono font-bold tracking-widest text-slate-900 mb-8">
              {pesanSukses}
            </div>
            <Link href={`/cek-status?kode=${pesanSukses}`} className="block w-full bg-[#1e3a5f] text-white py-4 font-sans font-bold uppercase tracking-widest hover:bg-slate-800 transition">
              Cek Status Sekarang
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-serif text-slate-800 pt-32 pb-12 relative overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        
        <div className="bg-white border-2 border-slate-800 p-8 md:p-12 shadow-[8px_8px_0px_#1e3a5f] mb-8 relative">
          
          <div className="text-center mb-8 border-b-4 border-double border-slate-800 pb-6">
            <h1 className="text-3xl font-black text-[#1e3a5f] uppercase tracking-tighter">FORM PENGADUAN ONLINE</h1>
            <p className="text-slate-500 font-sans text-sm mt-2">Tindak kekerasan pada Anak dan Perempuan</p>
          </div>

          {/* Progress Bar Klasik */}
          <div className="mb-8 font-sans">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
              <span>Langkah {step} dari 7</span>
              <span>{Math.round((step / 7) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 border border-gray-300">
              <motion.div 
                className="bg-[#1e3a5f] h-full" 
                initial={{ width: 0 }}
                animate={{ width: `${(step / 7) * 100}%` }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* 1. DARURAT */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#1e3a5f]">Apakah kamu dalam keadaan DARURAT? <span className="text-red-500">*</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, statusDarurat: "Darurat" })}
                        aria-label="Pilih status darurat"
                        aria-pressed={formData.statusDarurat === "Darurat"}
                        className={`cursor-pointer p-6 border-2 transition-all flex flex-col items-center justify-center ${
                          formData.statusDarurat === "Darurat"
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 bg-white hover:border-red-300 hover:bg-red-50/50"
                        }`}
                      >
                        <img
                          src="/img/alarm.webp"
                          alt="Darurat"
                          className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4"
                        />
                        <h3 className="font-black text-1xl text-red-600 mb-1">DARURAT!</h3>
                        <p className="text-xs text-center text-slate-500 mt-1">Pilih jika membutuhkan bantuan segera</p>
                      </button>

                      {/* Kotak Tidak (Kuning) */}
                      <div 
                        onClick={() => setFormData({...formData, statusDarurat: "Tidak"})} 
                        className={`cursor-pointer p-6 border-2 transition-all flex flex-col items-center justify-center ${
                          formData.statusDarurat === "Tidak" 
                            ? "border-yellow-500 bg-yellow-50" 
                            : "border-gray-300 bg-white hover:border-yellow-300 hover:bg-yellow-50/50"
                        }`}
                      >
                         <img 
                          src="/img/worried.webp" 
                          alt="Tidak" 
                          className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4" 
                        />
                        <h3 className="font-black text-1xl text-yellow-600 mb-1">Tidak</h3>
                        <p className="text-xs text-center text-slate-500 mt-1">Pilih jika membutuhkan bantuan segera</p>
                      </div>

                    </div>
                  </div>
                )}

                {/* 2. KHAWATIR */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#1e3a5f]">Nilai tingkat kehawatiran Anda <span className="text-red-500">*</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                      {[
                        { val: "Sedikit", img: "/img/bit-worried.webp", bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-700", tulisan:'Saya sedikit merasa khawatir.'}, 
                        { val: "Cukup", img: "/img/worried.webp", bg: "bg-yellow-50", border: "border-yellow-500", text: "text-yellow-700", tulisan:'Saya cukup merasa khawatir.'}, 
                        { val: "Sangat", img: "/img/fear.webp", bg: "bg-red-50", border: "border-red-500", text: "text-red-700", tulisan:'Sangat mengerikan, butuh bantuan.' }
                      ].map((item) => (
                        <div 
                          key={item.val} 
                          onClick={() => setFormData({...formData, kehawatiran: item.val})} 
                          className={`cursor-pointer p-6 border-2 transition-all flex flex-col items-center justify-center text-center ${
                            formData.kehawatiran === item.val 
                              ? `${item.border} ${item.bg}` 
                              : `border-gray-300 bg-white hover:${item.border} hover:${item.bg}/50`
                          }`}
                        >
                          <img 
                            src={item.img} 
                            alt={item.val} 
                            className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4" 
                          />
                          <h3 className={`font-black text-lg ${item.text} mb-1`}>{item.val}</h3>
                          <p className={`text-xs text-sm ${item.val} mb-1`}>{item.tulisan}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* 3. JENIS */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#1e3a5f]">Apa jenis perundungannya? <span className="text-red-500">*</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      {[
                        { val: "Verbal", img: "/img/verbal.png", bg: "bg-purple-50", border: "border-purple-500", text: "text-purple-700" }, 
                        { val: "Fisik", img: "/img/fisik.png", bg: "bg-orange-50", border: "border-orange-500", text: "text-orange-700" }, 
                        { val: "Sosial", img: "/img/sosical.png", bg: "bg-green-50", border: "border-green-500", text: "text-green-700" }, 
                        { val: "Cyberbullying", img: "/img/cyber.png", bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-700" }
                      ].map((item) => (
                        <div 
                          key={item.val} 
                          onClick={() => setFormData({...formData, jenis: item.val})} 
                          className={`cursor-pointer p-6 border-2 flex items-center gap-4 transition-all ${
                            formData.jenis === item.val 
                              ? `${item.border} ${item.bg}` 
                              : `border-gray-300 bg-white hover:${item.border} hover:${item.bg}/50`
                          }`}
                        >
                          <img 
                            src={item.img} 
                            alt={item.val} 
                            className="w-12 h-12 md:w-16 md:h-16 object-contain" 
                          />
                          <h3 className={`font-black text-xl ${item.text}`}>{item.val}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. KRONOLOGI */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#1e3a5f]">Ceritakan kejadiannya <span className="text-red-500">*</span></h2>
                    <textarea value={formData.kronologi} onChange={(e) => setFormData({...formData, kronologi: e.target.value})} rows={6} placeholder="Ceritakan apa yang terjadi, kapan, di mana..." className="w-full p-4 border-2 border-gray-300 focus:border-[#1e3a5f] outline-none transition-all text-slate-700 font-sans bg-[#fdfbf7]"></textarea>
                  </div>
                )}

                {/* 5. IDENTITAS & KONTAK */}
                {step === 5 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#1e3a5f]">Identitas & Kontak</h2>
                    
                    <div className="bg-[#fdfbf7] p-5 border border-gray-300 mb-4 space-y-4 font-sans">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.anonim} onChange={(e) => setFormData({...formData, anonim: e.target.checked})} className="w-5 h-5 accent-[#1e3a5f]" />
                        <div>
                          <span className="font-bold text-slate-800">Sembunyikan Identitas (Anonim)</span>
                          <p className="text-xs text-slate-500">Nama tidak wajib diisi.</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer border-t border-gray-300 pt-4">
                        <input type="checkbox" checked={formData.sembunyikanSekolah} onChange={(e) => setFormData({...formData, sembunyikanSekolah: e.target.checked})} className="w-5 h-5 accent-[#1e3a5f]" />
                        <div>
                          <span className="font-bold text-slate-800">Sembunyikan Nama Sekolah</span>
                          <p className="text-xs text-slate-500">Centang jika kamu takut identitas sekolahmu diketahui.</p>
                        </div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      {!formData.sembunyikanSekolah && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                          <label className="block font-bold text-slate-700 mb-2">Nama Sekolah</label>
                          <input type="text" value={formData.namaSekolah} onChange={(e) => setFormData({...formData, namaSekolah: e.target.value})} placeholder="Contoh: SMKN 1 Jakarta" className="w-full p-3 border-2 border-gray-300 focus:border-[#1e3a5f] outline-none transition-all bg-[#fdfbf7]" />
                        </motion.div>
                      )}
                      <div>
                        <label className="block font-bold text-slate-700 mb-2">Nomor Telepon/WA</label>
                        <input type="tel" value={formData.nomorTelepon} onChange={(e) => setFormData({...formData, nomorTelepon: e.target.value})} placeholder="Opsional (0812...)" className="w-full p-3 border-2 border-gray-300 focus:border-[#1e3a5f] outline-none transition-all bg-[#fdfbf7]" />
                      </div>
                    </div>

                    {!formData.anonim && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="font-sans">
                        <label className="block font-bold text-slate-700 mb-2 mt-4">Nama Pelapor</label>
                        <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} placeholder="Nama lengkap" className="w-full p-3 border-2 border-gray-300 focus:border-[#1e3a5f] outline-none transition-all bg-[#fdfbf7]" />
                      </motion.div>
                    )}
                  </div>
                )}

                {/* 6. KONFIRMASI FINAL */}
                {step === 6 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#1e3a5f]">Konfirmasi Laporan</h2>
                    <p className="text-slate-500 font-sans text-sm mb-4">Pastikan data di bawah ini sudah benar. Jika sudah, tekan tombol kirim.</p>
                    
                    <div className="bg-[#fdfbf7] border-2 border-dashed border-slate-800 p-6 space-y-4 font-sans text-sm">
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-slate-500 uppercase tracking-wider font-bold">Status Darurat</span>
                        <span className="font-bold text-slate-800">{formData.statusDarurat}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-slate-500 uppercase tracking-wider font-bold">Tingkat Khawatir</span>
                        <span className="font-bold text-slate-800">{formData.kehawatiran}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-slate-500 uppercase tracking-wider font-bold">Jenis</span>
                        <span className="font-bold text-slate-800">{formData.jenis}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-slate-500 uppercase tracking-wider font-bold">Sekolah</span>
                        <span className="font-bold text-slate-800">{formData.sembunyikanSekolah ? "🔒 Dirahasiakan" : (formData.namaSekolah || "-")}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-slate-500 uppercase tracking-wider font-bold">Identitas</span>
                        <span className="font-bold text-slate-800">{formData.anonim ? "🔒 Anonim" : `👤 ${formData.nama || "Tanpa Nama"}`}</span>
                      </div>
                      <div className="pt-2">
                        <span className="text-slate-500 uppercase tracking-wider font-bold block mb-2">Kronologi</span>
                        <p className="text-slate-800 bg-white p-3 border border-gray-300 font-serif italic">"{formData.kronologi}"</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. TOMBOL KIRIM FINAL */}
                {step === 7 && (
                  <div className="space-y-6 text-center py-10">
                    <div className="text-6xl mb-4 animate-bounce">🖋️</div>
                    <h2 className="text-3xl font-black text-[#1e3a5f] uppercase tracking-tighter">Siap Dikirim?</h2>
                    <p className="text-slate-500 max-w-md mx-auto font-sans">
                      Dengan menekan tombol di bawah ini, laporanmu akan langsung diterima oleh pihak yang berwenang.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {error && <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-800 text-red-800 text-sm font-bold font-sans">{error}</div>}

            {/* Navigasi Tombol */}
            <div className="mt-10 flex gap-4 font-sans border-t border-gray-300 pt-6">
              {step > 1 && step < 7 && (
                <button type="button" onClick={prevStep} className="px-6 py-3 font-bold text-slate-600 bg-gray-200 hover:bg-gray-300 transition uppercase tracking-widest text-sm">
                  Kembali
                </button>
              )}
              
              {step < 6 && (
                <button 
                  type="button" 
                  onClick={nextStep} 
                  disabled={
                    (step === 1 && !formData.statusDarurat) ||
                    (step === 2 && !formData.kehawatiran) ||
                    (step === 3 && !formData.jenis) ||
                    (step === 4 && formData.kronologi.trim() === "") ||
                    (step === 5 && !formData.sembunyikanSekolah && formData.namaSekolah.trim() === "")
                  }
                  className="flex-1 bg-[#1e3a5f] text-white py-3 font-bold uppercase tracking-widest hover:bg-slate-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Lanjutkan →
                </button>
              )}

              {step === 6 && (
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="flex-1 bg-[#10b981] text-white py-3 font-bold uppercase tracking-widest hover:bg-emerald-600 transition"
                >
                  Ya, Data Sudah Benar →
                </button>
              )}

              {step === 7 && (
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-[#1e3a5f] text-white py-4 font-black text-lg uppercase tracking-widest hover:bg-slate-800 transition disabled:bg-gray-400 shadow-md animate-pulse"
                >
                  {loading ? "Menyegel Laporan..." : "Kirim Laporan Sekarang 🖋️"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Panduan Bantuan (GIF) */}
        <div className="bg-white border border-gray-300 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/what.gif" alt="Bantuan" className="w-16 h-16 object-contain grayscale hover:grayscale-0 transition-all" />
            <div>
              <h4 className="font-bold text-slate-800 font-serif text-lg">Mengalami Kesulitan?</h4>
              <p className="text-sm text-slate-500 font-sans">Apabila kamu merasa bingung atau mengalami kendala saat mengisi form, silakan klik tombol panduan.</p>
            </div>
          </div>
          <Link 
            href="/panduan" 
            className="px-6 py-3 border-2 border-[#1e3a5f] text-[#1e3a5f] font-bold font-sans uppercase tracking-widest text-sm hover:bg-[#1e3a5f] hover:text-white transition whitespace-nowrap flex items-center justify-center"
          >
            Lihat Panduan
          </Link>
        </div>

      </div>
    </main>
  );
}