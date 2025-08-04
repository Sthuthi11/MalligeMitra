"use client";
import { useState } from "react";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';

const translations = {
  EN: {
    title: "Contact Us",
    intro: "We'd love to hear from you! Reach out to MalligeMitra using the information below.",
    sections: [
      {
        heading: "Email",
        content:
          "You can email us at malligemitra@gmail.com for any queries or support."
      },
      {
        heading: "Phone",
        content:
          "You can reach us at our support line for any queries, feedback, or assistance regarding the MalligeMitra platform. We are happy to help during working hours."
      },
      {
        heading: "Address",
        content:
          "Our office is located in Udupi, Karnataka. Visit us for in-person assistance or to learn more about how MalligeMitra supports local communities."
      }
    ],
    contact: "We respond to all queries within 2 business days."
  },
  KN: {
    title: "ಸಂಪರ್ಕಿಸಿ",
    intro: "ನಾವು ನಿಮ್ಮಿಂದ ಕೇಳಲು ಇಚ್ಛಿಸುತ್ತೇವೆ! MalligeMitra ಅನ್ನು ಕೆಳಗಿನ ಮಾಹಿತಿಯನ್ನು ಬಳಸಿ ಸಂಪರ್ಕಿಸಿ.",
    sections: [
      {
        heading: "ಇಮೇಲ್",
        content:
          "ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿಗೆ ಅಥವಾ ಬೆಂಬಲಕ್ಕಾಗಿ malligemitra@gmail.com ಗೆ ಇಮೇಲ್ ಮಾಡಿ."
      },
      {
        heading: "ದೂರವಾಣಿ",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi."
      },
      {
        heading: "ವಿಳಾಸ",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      }
    ],
    contact: "ನಾವು ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳಿಗೆ 2 ವ್ಯವಹಾರ ದಿನಗಳಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇವೆ."
  }
};

export default function ContactPage() {
  // Default to English, no language/profile button
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
        <GoogleTranslateWidgetBlended />
        {/* No language/profile button */}
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
