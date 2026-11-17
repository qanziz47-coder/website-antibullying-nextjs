"use client";

import { motion } from "framer-motion";

export default function Divider({ 
  topColor = "#fdfbf7", 
  bottomColor = "#ffffff",
  flip = false
}: { 
  topColor?: string; 
  bottomColor?: string;
  flip?: boolean;
}) {
  // Path untuk kertas atas
  const clipTop = flip 
    ? "polygon(0 0, 100% 0, 100% 100%, 0 20%)" 
    : "polygon(0 0, 100% 0, 100% 80%, 0 100%)";
    
  // Path untuk kertas bawah
  const clipBottom = flip 
    ? "polygon(0 0, 100% 20%, 100% 100%, 0 100%)" 
    : "polygon(0 20%, 100% 0, 100% 100%, 0 100%)";

  return (
    <div className="relative w-full h-16 md:h-24 overflow-hidden" style={{ marginTop: '-1px', marginBottom: '-1px' }}>
      
      {/* Kertas Atas */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ 
          backgroundColor: topColor,
          clipPath: clipTop,
          zIndex: 1
        }}
      ></motion.div>
      
      {/* Kertas Bawah */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="absolute inset-0"
        style={{ 
          backgroundColor: bottomColor,
          clipPath: clipBottom,
          zIndex: 2
        }}
      ></motion.div>
      
      {/* Garis Tipis Pemisah (Efek Lipatan) */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.1)',
          clipPath: clipTop,
          zIndex: 3,
          transform: 'translateY(-1px)'
        }}
      ></motion.div>

    </div>
  );
}