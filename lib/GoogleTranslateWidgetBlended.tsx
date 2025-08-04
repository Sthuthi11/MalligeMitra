"use client";
import { useEffect } from "react";

// This widget injects Google Translate and applies custom styles for a seamless, modern look
export default function GoogleTranslateWidgetBlended() {
  useEffect(() => {
    // Inject Google Translate script if not already present
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
    // Define the init function globally if not already defined
    if (!(window as any).googleTranslateElementInit) {
      (window as any).googleTranslateElementInit = function () {
        if (!(window as any).google || !(window as any).google.translate) return;
        new (window as any).google.translate.TranslateElement({
          pageLanguage: "en",
          includedLanguages: "en,kn",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        }, "google_translate_element_blended");
      };
    }
    // Custom style injection for a minimal, blended look
    const styleId = "google-translate-blended-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        #google_translate_element_blended {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
          max-width: 200px;
          background: none;
          box-shadow: none;
          border-radius: 8px;
          padding: 0;
        }
        #google_translate_element_blended .goog-te-gadget {
          font-family: inherit !important;
          font-size: 1.08rem !important;
          color: #059669 !important;
          background: none !important;
          border: none !important;
          padding: 0 !important;
        }
        #google_translate_element_blended .goog-te-combo {
          border-radius: 7px !important;
          padding: 6px 16px !important;
          font-size: 1.08rem !important;
          font-weight: 700 !important;
          background: #047857 !important;
          color: #fff !important;
          border: 1.5px solid #059669 !important;
          min-width: 130px !important;
          max-width: 200px !important;
          margin: 0 !important;
          box-shadow: 0 2px 8px 0 #05966922;
          transition: box-shadow 0.2s;
          letter-spacing: 0.01em;
        }
        #google_translate_element_blended .goog-te-combo:focus {
          outline: 2px solid #059669 !important;
          box-shadow: 0 0 0 2px #bbf7d0;
        }
        /* Hide Google branding */
        #google_translate_element_blended .goog-logo-link,
        #google_translate_element_blended .goog-te-gadget span {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div id="google_translate_element_blended" aria-label="Translate page" />
  );
}
