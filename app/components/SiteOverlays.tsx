
"use client";

import { useCallback, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import CookieConsent from "./CookieConsent";

export default function SiteOverlays() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {!loading && <CookieConsent />}
    </>
  );
}
