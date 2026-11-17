"use client";

import { useState } from "react";
import { loginAdmin } from "../actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await loginAdmin(formData);
    if (result?.error) setError(result.error);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-serif flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Ornamen Latar Belakang */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="bg-white p-8 md:p-12 border-2 border-slate-800 shadow-[8px_8px_0px_#1e3a5f] max-w-md w-full relative z-10">
        
        {/* Cap Stempel */}
        <div className="absolute top-4 right-4 border-2 border-red-800 text-red-800 px-2 py-1 text-[10px] font-black font-sans uppercase tracking-widest rotate-12 opacity-60">
          KHUSUS ADMIN
        </div>

        <div className="text-center mb-8 border-b-4 border-double border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-[#1e3a5f] uppercase tracking-tighter">Login Redaksi</h1>
          <p className="text-sm font-sans text-slate-500 mt-2">Akses khusus Guru BK / Satgas</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-800 p-3 mb-6 font-sans text-sm text-red-800 font-bold">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-6 font-sans">
          <div>
            <label className="block font-bold text-slate-700 mb-2 uppercase tracking-wider text-sm">Username</label>
            <input 
              type="text" 
              name="username" 
              required 
              className="w-full p-3 border-2 border-gray-300 focus:border-[#1e3a5f] outline-none transition-all bg-[#fdfbf7]" 
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-2 uppercase tracking-wider text-sm">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full p-3 border-2 border-gray-300 focus:border-[#1e3a5f] outline-none transition-all bg-[#fdfbf7]" 
            />
          </div>
          
          <button 
            disabled={loading} 
            type="submit" 
            className="w-full bg-[#1e3a5f] text-white py-4 font-black uppercase tracking-widest hover:bg-slate-800 transition disabled:bg-gray-400 mt-4"
          >
            {loading ? "Memeriksa..." : "Masuk ke Sistem"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-sans text-slate-500 hover:text-[#1e3a5f] underline">
            &larr; Kembali ke Halaman Publik
          </Link>
        </div>

      </div>
    </main>
  );
}