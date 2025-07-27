"use client";

import Image from 'next/image';
import { useState } from 'react';

const translations = {
  EN: {
    location: 'Udupi, Karnataka',
    heroTitle: 'MalligeMitra',
    heroDesc: 'Empowering jasmine farmers with digital tools, labor support, and direct market access from Udupi to the world.',
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
    howItWorksTitle: 'How It Works',
    howItWorks: [
      { step: '1', title: 'Post Listings', desc: 'Farmers post jasmine, buyers & laborers list profiles.' },
      { step: '2', title: 'Get Matched', desc: 'System suggests best buyers, workers or tools.' },
      { step: '3', title: 'Connect & Earn', desc: 'Securely transact, track, and grow your network.' }
    ],
    faqs: 'FAQs',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    contact: 'Contact',
    copyright: 'All rights reserved.',
    built: 'Built with',
    by: 'by Liam Carter.'
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
    howItWorksTitle: 'ಹೆಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    howItWorks: [
      { step: '೧', title: 'ಜಾಹೀರಾತು ಹಾಕಿ', desc: 'ಕೃಷಿಕರು ಮಲ್ಲಿಗೆ ಪೋಸ್ಟ್ ಮಾಡುತ್ತಾರೆ, ಖರೀದಿದಾರರು ಮತ್ತು ಕಾರ್ಮಿಕರು ಪ್ರೊಫೈಲ್ ಹಾಕುತ್ತಾರೆ.' },
      { step: '೨', title: 'ಮ್ಯಾಚ್ ಆಗಿ', desc: 'ಸಿಸ್ಟಮ್ ಉತ್ತಮ ಖರೀದಿದಾರರು, ಕಾರ್ಮಿಕರು ಅಥವಾ ಸಾಧನಗಳನ್ನು ಸೂಚಿಸುತ್ತದೆ.' },
      { step: '೩', title: 'ಸಂಪರ್ಕಿಸಿ ಮತ್ತು ಗಳಿಸಿ', desc: 'ಭದ್ರವಾಗಿ ವ್ಯವಹರಿಸಿ, ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ನೆಟ್ವರ್ಕ್ ವೃದ್ಧಿಸಿ.' }
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
          <span className="flex items-center gap-1"><svg width="16" height="16" fill="currentColor" className="inline"><path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2-.5a.5.5 0 0 0-.5.5v.217l5 3.1 5-3.1V4a.5.5 0 0 0-.5-.5H4zm9 2.383-4.445 2.756a.5.5 0 0 1-.51 0L4 5.883V12a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V5.883z"/></svg> <a href="mailto:info@malligemitra.com" className="hover:underline">info@malligemitra.com</a></span>
          <span className="flex items-center gap-1"><svg width="16" height="16" fill="currentColor" className="inline"><path d="M8 0a5 5 0 0 1 5 5c0 3.25-5 11-5 11S3 8.25 3 5a5 5 0 0 1 5-5zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg> {t.location}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><svg width="16" height="16" fill="currentColor" className="inline"><path d="M8 3a3 3 0 0 0-3 3c0 1.657 1.343 3 3 3s3-1.343 3-3a3 3 0 0 0-3-3zm0 8a5 5 0 0 0-5 5h10a5 5 0 0 0-5-5z"/></svg> <select className="bg-emerald-900 text-white border-none outline-none" value={lang} onChange={e => setLang(e.target.value as Lang)}><option value="EN">EN</option><option value="KN">KN</option></select></span>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener" className="hover:text-lime-300">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener" className="hover:text-lime-300">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.373C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.292 2.393 1.272 3.373.98.98 2.092 1.213 3.373 1.272C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.292 3.373-1.272.98-.98 1.213-2.092 1.272-3.373.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.292-2.393-1.272-3.373-.98-.98-2.092-1.213-3.373-1.272C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener" className="hover:text-lime-300">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/>
            </svg>
          </a>
        </div>
      </div>
      {/* Hero with video background */}
      <section className="relative w-full min-h-[90vh] flex overflow-hidden pt-16 md:pt-24">
        {/* Jasmine field background (image fallback with dark overlay) */}
        <div className="absolute inset-0 w-full h-full z-0">
          {/* HERO BACKGROUND IMAGE: Replace src below with your preferred jasmine field or flower image/video */}
          <img
            src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80"
            alt="Jasmine Flowers"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.45) saturate(1.1)' }}
          />
          {/* If you have a jasmine field video, replace the <img> above with a <video> and similar dark overlay */}
        </div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/70 via-black/40 to-black/60 z-0 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-start w-full h-full px-4 md:px-20 text-left max-w-3xl">
          {/* Logo placeholder */}
          <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center mb-4 shadow-lg">
            {/* Add logo image here later */}
            <span className="text-4xl text-emerald-700 font-extrabold">🌼</span>
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
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
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

      {/* How It Works */}
      <section className="py-20 px-6 bg-white max-w-5xl mx-auto text-center">
        <h2 className={`font-extrabold text-emerald-800 mb-8 ${lang === 'KN' ? 'text-2xl' : 'text-3xl'}`}>{t.howItWorksTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.howItWorks.map((item: { step: string; title: string; desc: string }, index: number) => (
            <div
              key={index}
              className="border-2 border-lime-200 p-6 rounded-xl shadow-lg hover:border-emerald-400 hover:shadow-2xl hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-white via-lime-50 to-emerald-50"
            >
              <div className="text-3xl font-extrabold text-emerald-600 mb-2 drop-shadow">{item.step}</div>
              <h3 className={`font-bold mb-1 text-emerald-800 ${lang === 'KN' ? 'text-lg' : 'text-xl'}`}>{item.title}</h3>
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
