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
          "By accessing or using the MalligeMitra platform, you agree to be bound by these terms and conditions."
      },
      {
        heading: "User Responsibilities",
        content:
          "Users are expected to use the platform lawfully and ethically. Any misuse, including harmful or unauthorized activities, is strictly prohibited."
      },
      {
        heading: "Limitation of Liability",
        content:
          "MalligeMitra is not responsible for any damages or losses resulting from the use of the platform. The service is provided as is without warranties of any kind."
      }
    ],
    contact: "For questions, contact us at malligemitra@gmail.com."
  }
};

export default function TermsPage() {
  const t = translations.EN;

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
        <div />
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-8 py-4 gap-6">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">{t.title}</h1>
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