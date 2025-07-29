


"use client";
import { useState } from "react";

const translations = {
  EN: {
    title: "Privacy Policy",
    intro: "Your privacy is important to us. This policy explains how we handle your personal data on our platform.",
    sections: [
      {
        heading: "1. Information Collection",
        content:
          "We collect personal information only when necessary to provide our services. This may include contact details, preferences, and usage data."
      },
      {
        heading: "2. Use of Information",
        content:
          "We use your information to improve our services, provide customer support, and notify you of relevant updates. We do not sell your data."
      },
      {
        heading: "3. Data Retention",
        content:
          "We retain your data only for as long as necessary to fulfill the purposes outlined in this policy."
      },
      {
        heading: "4. Cookies",
        content:
          "Our website uses cookies to enhance user experience. You can modify cookie settings in your browser at any time."
      },
      {
        heading: "5. Third-Party Access",
        content:
          "We may use third-party services (e.g., analytics) that may access minimal user data. They are bound by their own privacy agreements."
      },
      {
        heading: "6. Policy Updates",
        content:
          "This privacy policy may be updated from time to time. Continued use of the site implies agreement to the latest version."
      }
    ],
    contact: "If you have any questions, please contact us at malligemitra@gmail.com."
  },
  KN: {
    title: "ಗೌಪ್ಯತಾ ನೀತಿ",
    intro: "ನಿಮ್ಮ ಗೌಪ್ಯತೆ ನಮಗೆ ಮಹತ್ವದ್ದಾಗಿದೆ. ಈ ನೀತಿಯು ನಮ್ಮ ವೇದಿಕೆಯಲ್ಲಿ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಡೇಟಾವನ್ನು ನಾವು ಹೇಗೆ ನಿರ್ವಹಿಸುತ್ತೇವೆ ಎಂಬುದನ್ನು ವಿವರಿಸುತ್ತದೆ.",
    sections: [
      {
        heading: "೧. ಮಾಹಿತಿಯ ಸಂಗ್ರಹಣೆ",
        content:
          "ನಾವು ನಮ್ಮ ಸೇವೆಗಳನ್ನು ಒದಗಿಸಲು ಅಗತ್ಯವಿರುವಷ್ಟರಷ್ಟೆ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ. ಇದರಲ್ಲಿ ಸಂಪರ್ಕ ವಿವರಗಳು, ಆದ್ಯತೆಗಳು ಮತ್ತು ಬಳಕೆಯ ಡೇಟಾ ಇರಬಹುದು."
      },
      {
        heading: "೨. ಮಾಹಿತಿಯ ಬಳಕೆ",
        content:
          "ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ನಾವು ನಮ್ಮ ಸೇವೆಗಳನ್ನು ಸುಧಾರಿಸಲು, ಗ್ರಾಹಕ ಬೆಂಬಲ ಒದಗಿಸಲು ಮತ್ತು ಸಂಬಂಧಿತ ನವೀಕರಣಗಳನ್ನು ತಿಳಿಸಲು ಬಳಸುತ್ತೇವೆ. ನಾವು ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಮಾರುವುದಿಲ್ಲ."
      },
      {
        heading: "೩. ಡೇಟಾ ಸಂಗ್ರಹಣೆ",
        content:
          "ಈ ನೀತಿಯಲ್ಲಿ ವಿವರಿಸಿದ ಉದ್ದೇಶಗಳನ್ನು ಪೂರೈಸಲು ಅಗತ್ಯವಿರುವ ಅವಧಿಗೆ ಮಾತ್ರ ನಿಮ್ಮ ಡೇಟಾವನ್ನು ನಾವು ಇರಿಸುತ್ತೇವೆ."
      },
      {
        heading: "೪. ಕುಕೀಸ್",
        content:
          "ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಬಳಕೆದಾರರ ಅನುಭವವನ್ನು ಹೆಚ್ಚಿಸಲು ಕುಕೀಸ್‌ ಅನ್ನು ಬಳಸುತ್ತದೆ. ನೀವು ಯಾವಾಗ ಬೇಕಾದರೂ ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಕುಕೀಸ್‌ ಅನ್ನು ನಿಯಂತ್ರಿಸಬಹುದು."
      },
      {
        heading: "೫. ತೃತೀಯ ಪಕ್ಷದ ಪ್ರವೇಶ",
        content:
          "ನಾವು ಅನಾಲಿಟಿಕ್ಸ್ ಮುಂತಾದ ತೃತೀಯ ಪಕ್ಷದ ಸೇವೆಗಳನ್ನು ಬಳಸಬಹುದು, ಮತ್ತು ಅವರು ನಿಖರವಾದ ಬಳಕೆದಾರ ಡೇಟಾವನ್ನು ಪ್ರವೇಶಿಸಬಹುದು. ಇವು ತಮ್ಮದೇ ಆದ ಗೌಪ್ಯತಾ ನೀತಿಯುಳ್ಳ ಸೇವೆಗಳಾಗಿವೆ."
      },
      {
        heading: "೬. ನೀತಿಯ ನವೀಕರಣಗಳು",
        content:
          "ಈ ಗೌಪ್ಯತಾ ನೀತಿಯನ್ನು ಕಾಲಕಾಲಕ್ಕೆ ನವೀಕರಿಸಬಹುದು. ನವೀಕರಿಸಿದ ನೀತಿಯ ಅನುಸರಣೆ ಎಂದರೆ ನೀವು ಅದನ್ನು ಒಪ್ಪಿದ್ದೀರಿ ಎಂದು ಅರ್ಥ."
      }
    ],
    contact: "ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ, ದಯವಿಟ್ಟು malligemitra@gmail.com ಗೆ ಸಂಪರ್ಕಿಸಿ."
  }
};

export default function PrivacyPage() {
  const [lang, setLang] = useState("EN");
  const [profileOpen, setProfileOpen] = useState(false);
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
            {typeof setLangDropdownOpen !== "undefined" && langDropdownOpen && (
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
  {/* const [langDropdownOpen, setLangDropdownOpen] = useState(false); */}
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
        <p className="text-xs">Built with <span className="text-pink-300">❤️</span> by Team Regenesis</p>
      </footer>
    </div>
  );
}

