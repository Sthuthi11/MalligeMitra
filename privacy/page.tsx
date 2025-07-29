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
          "Your information is used to improve our services, support customer needs, and communicate relevant updates. We never sell your data."
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
      },
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
      },
    ],
    contact: "ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ, ದಯವಿಟ್ಟು malligemitra@gmail.com ಗೆ ಸಂಪರ್ಕಿಸಿ."
  }
};

type Lang = keyof typeof translations;

export default function PrivacyPolicy() {
  const [lang, setLang] = useState<Lang>("EN");
  const t = translations[lang];

  return (
    <main className="bg-white text-gray-900 font-sans px-6 py-10 max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <select
          className="border border-gray-300 rounded px-3 py-1 text-sm"
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
        >
          <option value="EN">English</option>
          <option value="KN">ಕನ್ನಡ</option>
        </select>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-emerald-800">{t.title}</h1>
      <p className="mb-6 text-lg">{t.intro}</p>

      {t.sections.map((sec, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold text-emerald-700 mb-2">{sec.heading}</h2>
          <p className="text-gray-800">{sec.content}</p>
        </div>
      ))}

      <p className="mt-8 text-sm text-gray-600 italic">{t.contact}</p>
    </main>
  );
}
