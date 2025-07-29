"use client";
import { useState } from "react";

const translations = {
  EN: {
    title: "Terms & Conditions",
    intro: "Please read our terms and conditions carefully before using MalligeMitra.",
    sections: [
      {
        heading: "Acceptance of Terms",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod nisi."
      },
      {
        heading: "User Responsibilities",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        heading: "Limitation of Liability",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
      }
    ],
    contact: "For questions, contact us at malligemitra@gmail.com."
  },
  KN: {
    title: "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು",
    intro: "MalligeMitra ಬಳಸದ ಮೊದಲು ದಯವಿಟ್ಟು ನಮ್ಮ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಗಮನದಿಂದ ಓದಿ.",
    sections: [
      {
        heading: "ನಿಯಮಗಳ ಒಪ್ಪಿಗೆ",
        content:
          "MalligeMitra ಬಳಕೆ ಮಾಡುವ ಮೂಲಕ ನೀವು ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಒಪ್ಪಿಕೊಳ್ಳುತ್ತೀರಿ. ದಯವಿಟ್ಟು ಅವುಗಳನ್ನು ಗಮನದಿಂದ ಓದಿ."
      },
      {
        heading: "ಬಳಕೆದಾರರ ಹೊಣೆಗಾರಿಕೆಗಳು",
        content:
          "ನೀವು MalligeMitra ಬಳಕೆ ಮಾಡುವಾಗ ಸತ್ಯವಾದ ಮತ್ತು ನಿಖರವಾದ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಬೇಕು. ಯಾವುದೇ ಅನಧಿಕೃತ ಅಥವಾ ಹಾನಿಕಾರಕ ಚಟುವಟಿಕೆಗಳನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ."
      },
      {
        heading: "ಹೊಂದಾಣಿಕೆಯ ಮಿತಿಗಳು",
        content:
          "ನಾವು MalligeMitra ಬಳಕೆದಾರರಿಗೆ ಯಾವುದೇ ನಷ್ಟ ಅಥವಾ ಹಾನಿಗೆ ಹೊಣೆಗಾರರಾಗಿರುವುದಿಲ್ಲ. ಸೇವೆಯ ಬಳಕೆ ನಿಮ್ಮ ಹೊಣೆಗಾರಿಕೆಯಲ್ಲಿ."
      }
    ],
    contact: "ಪ್ರಶ್ನೆಗಳಿಗಾಗಿ malligemitra@gmail.com ಅನ್ನು ಸಂಪರ್ಕಿಸಿ."
  }
};

export default function TermsPage() {
  const [lang, setLang] = useState("EN");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[lang];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-lime-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white shadow-md">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="px-3 py-1 rounded bg-white text-emerald-700 flex items-center gap-2"
              onClick={() => setLangDropdownOpen((open) => !open)}
              type="button"
            >
              <span>{lang === "EN" ? "English" : "ಕನ್ನಡ"}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-emerald-700 rounded shadow-lg z-10">
                <button
                  className={`block w-full text-left px-4 py-2 hover:bg-emerald-100 ${lang === "EN" ? "font-bold" : ""}`}
                  onClick={() => { setLang("EN"); setLangDropdownOpen(false); }}
                >English</button>
                <button
                  className={`block w-full text-left px-4 py-2 hover:bg-emerald-100 ${lang === "KN" ? "font-bold" : ""}`}
                  onClick={() => { setLang("KN"); setLangDropdownOpen(false); }}
                >ಕನ್ನಡ</button>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-800 hover:bg-emerald-900"
              aria-label="Profile"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-7">
                <circle cx="12" cy="8" r="4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-3.333 5.333-5 8-5s8 1.667 8 5" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-8 py-8 gap-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-4">{t.title}</h1>
        <p className="mb-6 text-lg max-w-2xl text-emerald-900">{t.intro}</p>
        <div className="w-full max-w-2xl">
          {t.sections.map((sec, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold text-emerald-800 mb-2">{sec.heading}</h2>
              <p className="text-emerald-900 text-base">{sec.content}</p>
            </div>
          ))}
          <div className="mt-8 p-4 bg-emerald-50 border-l-4 border-emerald-700 rounded">
            <p className="text-emerald-900 font-medium">{t.contact}</p>
          </div>
        </div>
      </main>
      <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
        <p className="mb-1 text-base font-semibold">© 2025 MalligeMitra. All rights reserved.</p>
        <p className="text-xs">Built with <span className="text-pink-300">❤️</span> by Team Regen.</p>
      </footer>
    </div>
  );
}
