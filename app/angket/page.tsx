"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AngketPage() {
  const [sukses, setSukses] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    kelas: "",
    pernahDibully: "Ya",
    jenis: "",
    tempat: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSukses(true);
    }, 1000);
  }

  const staggerQuestions = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const questionVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-serif text-slate-800 pt-32 pb-20 relative overflow-hidden">
      <Navbar />

      {/* Ornamen Latar Belakang */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        
        {sukses ? (
          /* TAMPILAN SUKSES */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white border-2 border-slate-800 p-12 text-center shadow-[8px_8px_0px_#10b981]"
          >
            <div className="text-6xl mb-6">📜</div>
            <h1 className="text-4xl font-black text-[#1e3a5f] mb-4 uppercase tracking-tighter">Arsip Diterima</h1>
            <div className="w-24 h-1 bg-slate-300 mx-auto my-6"></div>
            <p className="text-slate-600 mb-8 font-medium italic max-w-md mx-auto">
              "Terima kasih. Jawaban Anda telah dicatat dalam buku besar kami dan akan menjadi bahan pertimbangan kebijakan sekolah ke depan."
            </p>
            <Link href="/" className="inline-block bg-[#1e3a5f] text-white px-8 py-3 font-bold font-sans uppercase tracking-widest hover:bg-slate-800 transition">
              Kembali ke Beranda
            </Link>
          </motion.div>
        ) : (
          /* TAMPILAN FORMULIR */
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white border-2 border-slate-800 p-8 md:p-12 shadow-[8px_8px_0px_#1e3a5f] relative"
          >
            {/* Cap Stempel Pojok */}
            <div className="absolute top-4 right-4 border-2 border-red-800 text-red-800 px-3 py-1 text-xs font-black font-sans uppercase tracking-widest rotate-12 opacity-50">
              RAHASIA
            </div>

            <div className="text-center mb-10 border-b-4 border-double border-slate-800 pb-6">
              <h1 className="text-3xl md:text-5xl font-black text-[#1e3a5f] mb-2 font-serif uppercase tracking-tighter leading-none">
                Formulir Angket Nasional
              </h1>
              <p className="text-sm font-sans text-slate-500 uppercase tracking-widest mt-2">
                Pemetaan Kasus Perundungan Sekolah
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Pertanyaan 1 */}
              <div>
                <label className="block text-lg font-bold mb-2">1. Kelas Anda saat ini?</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Tuliskan kelas..." 
                  value={formData.kelas}
                  onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                  className="w-full bg-transparent border-0 border-b-2 border-slate-400 focus:ring-0 focus:border-[#1e3a5f] p-2 font-sans text-slate-800 placeholder-gray-400 outline-none transition-colors" 
                />
              </div>

              {/* Pertanyaan 2 */}
              <div>
                <label className="block text-lg font-bold mb-2">2. Apakah Anda pernah menjadi korban perundungan?</label>
                <div className="flex gap-6 mt-2 font-sans">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="pernah" 
                      value="Ya" 
                      checked={formData.pernahDibully === "Ya"}
                      onChange={(e) => setFormData({...formData, pernahDibully: e.target.value})}
                      className="w-5 h-5 accent-[#1e3a5f] cursor-pointer"
                    />
                    <span className="font-bold">Ya, Pernah</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="pernah" 
                      value="Tidak" 
                      checked={formData.pernahDibully === "Tidak"}
                      onChange={(e) => setFormData({...formData, pernahDibully: e.target.value})}
                      className="w-5 h-5 accent-[#1e3a5f] cursor-pointer"
                    />
                    <span className="font-bold">Tidak Pernah</span>
                  </label>
                </div>
              </div>

              {/* Pertanyaan 3 (Kondisional) */}
              {formData.pernahDibully === "Ya" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
                  <label className="block text-lg font-bold mb-2 mt-4">3. Bentuk perundungan yang dialami?</label>
                  <select 
                    value={formData.jenis}
                    onChange={(e) => setFormData({...formData, jenis: e.target.value})}
                    className="w-full bg-transparent border-0 border-b-2 border-slate-400 focus:ring-0 focus:border-[#1e3a5f] p-2 font-sans font-bold text-slate-800 outline-none cursor-pointer"
                  >
                    <option value="">-- Pilih Jenis --</option>
                    <option value="Verbal">Verbal (Ejekan, ancaman)</option>
                    <option value="Fisik">Fisik (Pukulan, dorongan)</option>
                    <option value="Sosial">Sosial (Dikucilkan, rumor)</option>
                    <option value="Cyberbullying">Online (Hinaan di medsos)</option>
                  </select>
                </motion.div>
              )}

              {/* Pertanyaan 4 (Kondisional) */}
              {formData.pernahDibully === "Ya" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
                  <label className="block text-lg font-bold mb-2 mt-4">4. Di manakah lokasi kejadiannya?</label>
                  <select 
                    value={formData.tempat}
                    onChange={(e) => setFormData({...formData, tempat: e.target.value})}
                    className="w-full bg-transparent border-0 border-b-2 border-slate-400 focus:ring-0 focus:border-[#1e3a5f] p-2 font-sans font-bold text-slate-800 outline-none cursor-pointer"
                  >
                    <option value="">-- Pilih Tempat --</option>
                    <option value="Kelas">Di dalam Kelas</option>
                    <option value="Kantin">Kantin</option>
                    <option value="Lapangan">Lapangan / Olahraga</option>
                    <option value="Online">Media Sosial / Online</option>
                  </select>
                </motion.div>
              )}

              <div className="pt-6 border-t border-gray-300">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#1e3a5f] text-white py-4 font-sans font-black text-lg uppercase tracking-widest hover:bg-slate-800 transition-colors disabled:bg-gray-500 shadow-md"
                >
                  {loading ? "Menyegel..." : "Kirim Jawaban ke Redaksi"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

      </div>
    </main>
  );
}   