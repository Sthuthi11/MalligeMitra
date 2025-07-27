"use client";

import Image from 'next/image';
import { useState } from 'react';

const translations = {
  EN: {
    location: 'Udupi, Karnataka',
    heroTitle: 'MalligeMitra',
    heroDesc: 'Empowering Udupi Mallige farmers through labor support, a virtual marketplace, direct market access',
    login: 'Login',
    signup: 'Sign Up',
    aboutTitle: 'Why MalligeMitra?',
    aboutDesc1: 'Jasmine farmers in coastal Karnataka face major challenges: labor shortages, lack of tool access, middlemen dependency, and flower wastage. MalligeMitra bridges this gap.',
    aboutDesc2: 'We connect farmers with skilled labor, tools, and buyers — including jasmine-based industries — through one unified platform.',
    featuresTitle: 'What We Offer',
    features: [
      { title: 'Labor Support', icon: '🧑‍🌾', desc: 'Find and hire skilled labor easily.' },
      { title: 'Industry Linkage', icon: '🏭', desc: 'Sell leftover flowers to fragrance companies.' },
      { title: 'Virtual Marketplace', icon: '🛒', desc: 'Buy/sell tools, seeds, fertilizers.' },
      { title: 'Consultancy Services', icon: '📋', desc: 'Soil testing, land and disease management.' }
    ],
    faqs: 'FAQs',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    contact: 'Contact',
    copyright: 'All rights reserved.',
    built: 'Built with',
    by: 'by Team Regenesis'
  },
  KN: {
    location: 'ಉಡುಪಿ, ಕರ್ನಾಟಕ',
    heroTitle: 'ಮಲ್ಲಿಗೆಮಿತ್ರ',
    heroDesc: 'ಉಡುಪಿ ಜಿಲ್ಲೆಯಿಂದ ಮಲ್ಲಿಗೆ ಕೃಷಿಕರಿಗೆ ಡಿಜಿಟಲ್ ಸಾಧನಗಳು, ಕಾರ್ಮಿಕ ಬೆಂಬಲ ಮತ್ತು ನೇರ ಮಾರುಕಟ್ಟೆ ಪ್ರವೇಶವನ್ನು ಒದಗಿಸುವುದು.',
    login: 'ಲಾಗಿನ್',
    signup: 'ಸೈನ್ ಅಪ್',
    aboutTitle: 'ಏಕೆ ಮಲ್ಲಿಗೆಮಿತ್ರ?',
    aboutDesc1: 'ಕರಾವಳಿ ಕರ್ನಾಟಕದ ಮಲ್ಲಿಗೆ ಕೃಷಿಕರು ಕಾರ್ಮಿಕ ಕೊರತೆ, ಸಾಧನಗಳ ಕೊರತೆ, ಮಧ್ಯವರ್ತಿಗಳ ಅವಲಂಬನೆ ಮತ್ತು ಹೂವಿನ ವ್ಯರ್ಥತೆ ಎಂಬ ಪ್ರಮುಖ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸುತ್ತಿದ್ದಾರೆ. ಮಲ್ಲಿಗೆಮಿತ್ರ ಈ ಅಂತರವನ್ನು ತುಂಬುತ್ತದೆ.',
    aboutDesc2: 'ನಾವು ಕೃಷಿಕರನ್ನು ನಿಪುಣ ಕಾರ್ಮಿಕರು, ಸಾಧನಗಳು ಮತ್ತು ಖರೀದಿದಾರರೊಂದಿಗೆ — ಮಲ್ಲಿಗೆ ಆಧಾರಿತ ಕೈಗಾರಿಕೆಗಳನ್ನು ಒಳಗೊಂಡಂತೆ — ಒಂದೇ ವೇದಿಕೆಯಲ್ಲಿ ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.',
    featuresTitle: 'ನಾವು ನೀಡುವ ಸೇವೆಗಳು',
    features: [
      { title: 'ಕಾರ್ಮಿಕ ಬೆಂಬಲ', icon: '🧑‍🌾', desc: 'ನಿಪುಣ ಕಾರ್ಮಿಕರನ್ನು ಸುಲಭವಾಗಿ ಹುಡುಕಿ ಮತ್ತು ನೇಮಿಸಿ.' },
      { title: 'ಕೈಗಾರಿಕಾ ಸಂಪರ್ಕ', icon: '🏭', desc: 'ಉಳಿದ ಹೂಗಳನ್ನು ಸುಗಂಧ ದ್ರವ್ಯ ಕಂಪನಿಗಳಿಗೆ ಮಾರಾಟ ಮಾಡಿ.' },
      { title: 'ವರ್ಚುವಲ್ ಮಾರುಕಟ್ಟೆ', icon: '🛒', desc: 'ಸಾಧನಗಳು, ಬೀಜಗಳು, ರಸಗೊಬ್ಬರಗಳನ್ನು ಖರೀದಿ/ಮಾರಾಟ ಮಾಡಿ.' },
      { title: 'ಸಲಹಾ ಸೇವೆಗಳು', icon: '📋', desc: 'ಮಣ್ಣು ಪರೀಕ್ಷೆ, ಭೂಮಿ ಮತ್ತು ರೋಗ ನಿರ್ವಹಣೆ.' }
    ],
    faqs: 'ಎಫ್‌ಎಕ್ಯೂಗಳು',
    terms: 'ಬಳಕೆ ನಿಯಮಗಳು',
    privacy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
    contact: 'ಸಂಪರ್ಕಿಸಿ',
    copyright: 'ಎಲ್ಲ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    built: 'ಇದನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ',
    by: 'ಲಿಯಾಂ ಕಾರ್ಟರ್ ಅವರಿಂದ.'
  }
};

type Lang = keyof typeof translations;
export default function Home() {
  const [lang, setLang] = useState<Lang>('EN');
  const t = translations[lang];
  return (
    <main className="font-sans text-neutral-900 bg-white">
      {/* Top Bar */}
      <div className="w-full bg-emerald-900 text-white text-sm flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><svg width="16" height="16" fill="currentColor" className="inline"><path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2-.5a.5.5 0 0 0-.5.5v.217l5 3.1 5-3.1V4a.5.5 0 0 0-.5-.5H4zm9 2.383-4.445 2.756a.5.5 0 0 1-.51 0L4 5.883V12a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V5.883z"/></svg> <a href="mailto: malligemitra@gmail.com" className="hover:underline"> malligemitra@gmail.com</a></span>
          <span className="flex items-center gap-1"><svg width="16" height="16" fill="currentColor" className="inline"><path d="M8 0a5 5 0 0 1 5 5c0 3.25-5 11-5 11S3 8.25 3 5a5 5 0 0 1 5-5zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg> {t.location}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><select className="bg-emerald-900 text-white border-none outline-none" value={lang} onChange={e => setLang(e.target.value as Lang)}><option value="EN">English</option><option value="KN">Kannada</option></select></span>
          // ...existing code...
        </div>
      </div>
      {/* Hero with video background */}
      <section className="relative w-full min-h-[90vh] flex overflow-hidden pt-16 md:pt-24">
        {/* Jasmine field background (image fallback with dark overlay) */}
        <div className="absolute inset-0 w-full h-full z-0">
          {/* HERO BACKGROUND IMAGE: Using local public/herobg.jpg */}
          <img
            src="/herobg.jpg"
            alt="Jasmine Field Background"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.45) saturate(1.1)' }}
          />
          {/* If you have a jasmine field video, replace the <img> above with a <video> and similar dark overlay */}
        </div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/70 via-black/40 to-black/60 z-0 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-start w-full h-full px-4 md:px-20 text-left max-w-3xl">
          {/* Logo placeholder */}
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-white flex items-center justify-center">
            {/* Logo image from public/icon.jpg, fills the circle */}
            <img
              src="/icon.jpg"
              alt="MalligeMitra Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className={`font-extrabold text-white drop-shadow-xl mb-4 tracking-tight leading-tight ${lang === 'KN' ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'}`}>{t.heroTitle}</h1>
          <p className={`max-w-3xl mb-10 text-white font-semibold drop-shadow-lg ${lang === 'KN' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
            {t.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-yellow-300 text-emerald-900 font-bold shadow-lg hover:from-emerald-600 hover:via-lime-500 hover:to-yellow-400 hover:scale-105 transition-transform duration-200 border-2 border-white/30"
            >
              {t.login}
            </a>
            <a
              href="/signup"
              className="px-8 py-3 rounded-full bg-white/90 text-emerald-700 font-bold shadow-lg hover:bg-white hover:text-emerald-900 hover:scale-105 transition-transform duration-200 border-2 border-emerald-200"
            >
              {t.signup}
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-white flex flex-col md:flex-row items-center max-w-6xl mx-auto gap-10">
        <div className="flex-1">
          <h2 className={`font-extrabold text-emerald-800 mb-4 ${lang === 'KN' ? 'text-2xl' : 'text-3xl'}`}>{t.aboutTitle}</h2>
          <p className={`mb-4 text-emerald-900 ${lang === 'KN' ? 'text-base' : 'text-lg'}`}>
            {t.aboutDesc1}
          </p>
          <p className={`text-lime-700 ${lang === 'KN' ? 'text-sm' : 'text-md'}`}>
            {t.aboutDesc2}
          </p>
        </div>
        <div className="flex-1">
          {/* ABOUT SECTION IMAGE: Replace src below with your preferred jasmine farming image */}
          <Image
            src="/farmer.jpg"
            alt="Jasmine Farming"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl border-4 border-lime-200"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gradient-to-r from-lime-50 via-green-100 to-emerald-50">
        <h2 className={`font-extrabold text-center text-emerald-800 mb-10 ${lang === 'KN' ? 'text-2xl' : 'text-3xl'}`}>{t.featuresTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {t.features.map((item: { title: string; icon: string; desc: string }, index: number) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-lime-200 hover:border-emerald-400 hover:shadow-2xl hover:scale-105 transition-transform duration-200"
            >
              <div className="text-4xl mb-3 drop-shadow-lg">{item.icon}</div>
              <h3 className={`font-bold mb-2 text-emerald-700 ${lang === 'KN' ? 'text-lg' : 'text-xl'}`}>{item.title}</h3>
              <p className={`text-lime-700 ${lang === 'KN' ? 'text-xs' : 'text-sm'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-10 text-center shadow-inner mt-10">
        <p className="mb-2 text-lg font-semibold">&copy; 2025 MalligeMitra. {t.copyright}</p>
        <div className="mb-4 flex flex-wrap justify-center gap-6 text-sm">
          <a href="/faqs" className="hover:underline hover:text-lime-200 transition-colors">{t.faqs}</a>
          <a href="/terms" className="hover:underline hover:text-lime-200 transition-colors">{t.terms}</a>
          <a href="/privacy" className="hover:underline hover:text-lime-200 transition-colors">{t.privacy}</a>
          <a href="/contact" className="hover:underline hover:text-lime-200 transition-colors">{t.contact}</a>
        </div>
        <p className="text-sm">{t.built} <span className="text-pink-300">❤️</span> {t.by}</p>
      </footer>
    </main>
  );
}
