"use client";
import { useState } from "react";

const translations = {
  EN: {
    title: "Frequently Asked Questions",
    intro: "Find answers to common questions about MalligeMitra.",
    sections: [
      {
        heading: "What is MalligeMitra?",
        content:
          "MalligeMitra is a platform designed to connect communities and empower users in various sectors."
      },
      {
        heading: "How do I create an account?",
        content:
          "Click on the Sign Up button on the landing page and follow the instructions to register."
      },
      {
        heading: "How can I change my language?",
        content:
          "Use the language dropdown in the header to switch between English and Kannada."
      },
      {
        heading: "Who do I contact for support?",
        content:
          "You can reach us at malligemitra@gmail.com for any support or queries."
      }
    ],
    contact: "Didn't find your answer? Email us at malligemitra@gmail.com."
  },
  KN: {
    title: "ಪದೇಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    intro: "MalligeMitra ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳನ್ನು ಇಲ್ಲಿ ಹುಡುಕಿ.",
    sections: [
      {
        heading: "MalligeMitra ಎಂದರೇನು?",
        content:
          "MalligeMitra ಸಮುದಾಯಗಳನ್ನು ಸಂಪರ್ಕಿಸುವ ಮತ್ತು ಬಳಕೆದಾರರನ್ನು ಶಕ್ತಗೊಳಿಸುವ ವೇದಿಕೆಯಾಗಿದ್ದು, ವಿವಿಧ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತದೆ."
      },
      {
        heading: "ಹೆಸರು ನೋಂದಾಯಿಸಲು ಹೇಗೆ?",
        content:
          "ಲ್ಯಾಂಡಿಂಗ್ ಪುಟದಲ್ಲಿ Sign Up ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಮತ್ತು ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ."
      },
      {
        heading: "ಭಾಷೆ ಹೇಗೆ ಬದಲಾಯಿಸಬಹುದು?",
        content:
          "ಹೆಡರ್‌ನ ಭಾಷಾ ಡ್ರಾಪ್‌ಡೌನ್ ಬಳಸಿ ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡವನ್ನು ಬದಲಾಯಿಸಬಹುದು."
      },
      {
        heading: "ಬೆಂಬಲಕ್ಕಾಗಿ ಯಾರನ್ನು ಸಂಪರ್ಕಿಸಬೇಕು?",
        content:
          "ಯಾವುದೇ ಬೆಂಬಲ ಅಥವಾ ಪ್ರಶ್ನೆಗಳಿಗೆ malligemitra@gmail.com ಗೆ ಸಂಪರ್ಕಿಸಿ."
      }
    ],
    contact: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರ ಸಿಗಲಿಲ್ಲವೇ? malligemitra@gmail.com ಗೆ ಇಮೇಲ್ ಮಾಡಿ."
  }
};

export default function FAQPage() {
  // Default to English, remove language switcher
  const t = translations["EN"];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-lime-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 text-white shadow-md" style={{ backgroundColor: "#047857" }}>
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
        </div>
        {/* Language switcher removed */}
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
      <footer className="text-white py-3 text-center shadow-inner mt-auto" style={{ backgroundColor: "#047857" }}>
        <p className="mb-1 text-base font-semibold">© 2025 MalligeMitra. All rights reserved.</p>
        <p className="text-xs">Built with <span className="text-pink-300">❤️</span> by Team Regenesis</p>
        </footer>
        </div>
  );
}