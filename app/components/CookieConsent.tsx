"use client";

import { useState, useTransition } from "react";
import { saveCookieConsent } from "../actions/cookie-consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleConsent = (choice: "accepted" | "rejected") => {
    startTransition(async () => {
      try {
        await saveCookieConsent(choice);
        setIsVisible(false);
      } catch (error) {
        console.error("Gagal menyimpan persetujuan:", error);
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#172536]/35 px-4 py-6 backdrop-blur-md">

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        className="w-full max-w-md overflow-hidden rounded-xl border border-[#d5dce4] bg-[#F5F7FA] shadow-2xl animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Decorative top line */}
        <div className="h-1.5 w-full bg-[#293B4D]" />

        <div className="p-6 sm:p-8">

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#71849A]">
              ANTIBULLYING
            </span>

            <span className="text-[10px] tracking-widest text-[#8795A5]">
              PRIVACY NOTICE
            </span>
          </div>

          {/* Icon */}
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9D5E1] bg-[#E7EDF4]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#293B4D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>

          {/* Title */}
          <h2
            id="cookie-title"
            className="font-[var(--font-playfair)] text-2xl leading-snug text-[#293B4D] sm:text-3xl"
          >
            Privasi adalah hal yang berharga.
          </h2>

          {/* Description */}
          <p className="mt-4 font-[var(--font-lora)] text-sm leading-7 text-[#657487]">
            Kami menggunakan cookies untuk membantu website bekerja dengan
            baik dan mencatat preferensi pengunjung.
          </p>

          {/* Information */}
          <div className="mt-6 border-l-2 border-[#7893AD] bg-[#EAF0F5] px-4 py-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#293B4D]">
              Tentang Cookies
            </h3>

            <p className="mt-1.5 font-[var(--font-lora)] text-xs leading-6 text-[#718093]">
              Cookies esensial diperlukan agar website berfungsi.
              Pilihan persetujuanmu akan dicatat melalui browser.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleConsent("accepted")}
              disabled={isPending}
              className="rounded-md bg-[#293B4D] px-4 py-3 text-sm font-medium text-white transition duration-200 hover:bg-[#1F2F40] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Menyimpan..." : "Terima"}
            </button>

            <button
              onClick={() => handleConsent("rejected")}
              disabled={isPending}
              className="rounded-md border border-[#AAB9C8] bg-transparent px-4 py-3 text-sm font-medium text-[#293B4D] transition duration-200 hover:bg-[#E7EDF4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Tolak
            </button>
          </div>

          {/* Footer */}
          <div className="mt-7 border-t border-[#DCE3EA] pt-4 text-center">
            <p className="text-[9px] tracking-[0.2em] text-[#91A0AF]">
              YOUR PRIVACY MATTERS
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
