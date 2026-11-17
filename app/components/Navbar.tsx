"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Deteksi scroll untuk efek bayangan
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "BERANDA", href: "/" },
    { name: "EDUKASI", href: "/hukum" },
    { name: "CEK STATUS", href: "/cek-status" },
    { name: "ANGKET", href: "/angket" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-serif ${
        scrolled 
          ? "bg-[#fdfbf7]/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-300" 
          : "bg-[#fdfbf7] py-5 border-b-2 border-[#1e3a5f]"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO (Gaya Klasik) */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-black text-2xl text-[#1e3a5f] tracking-tighter uppercase">
            AntiBullying<span className="text-[#10b981]">.</span>
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-sm font-bold text-slate-700 tracking-widest">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className={`relative hover:text-[#1e3a5f] transition-colors group ${pathname === item.href ? "text-[#1e3a5f]" : ""}`}
                >
                  {item.name}
                  {/* Garis bawah klasik */}
                  <span className={`absolute -bottom-2 left-0 h-[2px] bg-[#1e3a5f] transition-all duration-300 ${pathname === item.href ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Tombol Lapor (Minimalis) */}
          <Link href="/lapor" className="border-2 border-[#1e3a5f] text-[#1e3a5f] px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-[#1e3a5f] hover:text-white transition-colors duration-300">
            Buat Laporan
          </Link>
        </div>

        {/* TOMBOL HAMBURGER (Mobile) */}
        <button className="lg:hidden text-[#1e3a5f] text-3xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MENU MOBILE */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-[#fdfbf7] shadow-lg overflow-hidden transition-all duration-300 border-b-2 border-[#1e3a5f] ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col p-6 text-sm font-bold text-slate-700 tracking-widest gap-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} onClick={() => setIsOpen(false)} className="block hover:text-[#1e3a5f] py-2 border-b border-gray-200">
                {item.name}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link href="/lapor" onClick={() => setIsOpen(false)} className="block text-center border-2 border-[#1e3a5f] text-[#1e3a5f] px-6 py-3 font-bold uppercase tracking-widest hover:bg-[#1e3a5f] hover:text-white transition-colors">
              Buat Laporan
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}