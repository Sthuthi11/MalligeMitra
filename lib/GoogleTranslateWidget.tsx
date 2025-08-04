"use client";
import { useEffect, useRef } from "react";

// Google Translate Widget restricted to English and Kannada, styled wide and short

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslateWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only inject script once
    if (window.google && window.google.translate) return;
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Define the callback globally
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: "en,kn",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      }, "google_translate_element");
    };
  }, []);

  // Widget container with custom styles
  return (
    <div
      ref={widgetRef}
      id="google_translate_element"
      style={{
        width: "100%",
        minWidth: 320,
        maxWidth: 600,
        height: 32,
        borderRadius: 8,
        overflow: "hidden",
        background: "#047857",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    />
  );
}
