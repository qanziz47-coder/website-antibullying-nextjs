"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function CekStatusPage() {
  const [kode, setKode] = useState("");
  const [hasil, setHasil] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function cekLaporan(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setHasil(null);

    try {
      const res = await fetch(`/api/cek-status?kode=${kode}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      
      setHasil(data.laporan);
    } catch (err: any) {
      setError(err.message || "Kode tidak ditemukan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-serif text-slate-800 pt-32 pb-20 relative overflow-hidden">
      <Navbar />

      {/* Ornamen Latar Belakang */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        
        {/* Header Ala Koran */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center border-b-4 border-double border-slate-800 pb-8 mb-10">
          <div className="inline-block bg-slate-800 text-white px-4 py-1.5 text-xs font-bold font-sans tracking-widest uppercase mb-4">
            PELACAKAN LAPORAN
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1e3a5f] mb-4 uppercase tracking-tighter">
            Cek Status Laporan
          </h1>
          <p className="text-slate-600 font-medium italic">Masukkan kode rahasia yang kamu terima setelah mengirim laporan.</p>
        </motion.div>

        {/* Form Pencarian Minimalis */}
        <motion.form 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          onSubmit={cekLaporan} 
          className="bg-white border-2 border-slate-800 p-6 md:p-8 shadow-[8px_8px_0px_#1e3a5f] mb-10"
        >
          <label className="block text-lg font-bold mb-2">Masukkan Kode Tracking</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              value={kode} 
              onChange={(e) => setKode(e.target.value.toUpperCase())} 
              placeholder="LAP-2026-XXXXXX"
              required
              className="flex-1 px-4 py-3 border border-gray-400 outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all font-sans font-bold tracking-widest uppercase text-lg bg-[#fdfbf7]" 
            />
            <button 
              disabled={loading} 
              type="submit" 
              className="bg-[#1e3a5f] text-white px-8 py-3 font-bold font-sans uppercase tracking-widest hover:bg-slate-800 transition-colors disabled:bg-gray-400"
            >
              {loading ? "Mencari..." : "Cek Kode"}
            </button>
          </div>
        </motion.form>

        {/* Pesan Error */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-red-50 border-l-4 border-red-800 p-4 mb-8">
              <p className="font-bold text-red-800 font-sans">Pemberitahuan:</p>
              <p className="text-slate-700">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hasil Pencarian (Ala Kuitansi/Surat Resmi) */}
        <AnimatePresence>
          {hasil && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white border border-gray-300 p-8 md:p-10 shadow-xl relative"
            >
              {/* Ornamen Pita di Atas */}
              <div className="absolute top-0 left-0 w-full h-2 bg-slate-800"></div>
              
              <div className="flex justify-between items-end border-b-2 border-dashed border-gray-300 pb-6 mb-6">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 uppercase">Laporan Ditemukan</h3>
                  <p className="text-sm font-sans text-slate-500 mt-1">Diterbitkan oleh Sistem Anti-Bullying</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest">Kode</p>
                  <p className="font-black text-xl text-[#1e3a5f]">{hasil.kode}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
                <div>
                  <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest mb-1">Jenis Laporan</p>
                  <p className="font-bold text-lg">{hasil.jenis}</p>
                </div>
                <div>
                  <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest mb-1">Tanggal Masuk</p>
                  <p className="font-bold text-lg">{new Date(hasil.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest mb-2">Status Saat Ini</p>
                  <span className={`inline-block px-4 py-2 text-sm font-sans font-black uppercase tracking-wider border-2 ${hasil.status === 'selesai' ? 'border-green-600 text-green-700 bg-green-50' : hasil.status === 'diproses' ? 'border-yellow-600 text-yellow-700 bg-yellow-50' : 'border-gray-600 text-gray-700 bg-gray-50'}`}>
                    {hasil.status}
                  </span>
                </div>
              </div>

              {/* Balasan Admin */}
              <div className="mt-8 border-t border-gray-300 pt-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-2xl">✉️</span> Pesan dari Guru BK:
                </h4>
                {hasil.balasan_admin ? (
                  <div className="bg-[#fdfbf7] border border-gray-300 p-6 relative">
                    <div className="absolute -top-3 -left-2 text-5xl text-gray-200 font-serif">"</div>
                    <p className="text-slate-700 leading-relaxed italic relative z-10">
                      {hasil.balasan_admin}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-500 italic font-sans text-sm">Belum ada balasan. Mohon tunggu ya.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Panduan Tambahan */}
        {!hasil && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12 text-center">
            <p className="text-slate-500 font-sans text-sm">
              Lupa kode tracking? Silakan cek kembali pesan setelah kamu mengirim laporan, atau hubungi Guru BK secara langsung.
            </p>
          </motion.div>
        )}

      </div>
    </main>
  );
}