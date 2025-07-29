
"use client";
import { useState } from "react";
import { FaUserCog, FaClipboardList, FaChalkboardTeacher, FaStore, FaTasks } from "react-icons/fa";

const TEXT = {
  en: {
    dashboard: "Laborer Dashboard",
    welcome: "Welcome, Laborer! ",
    listSkills: "List Yourself & Skills",
    listSkillsDesc: "Add your profile and skills to get hired by farmers.",
    pickJobs: "Pick Jobs",
    pickJobsDesc: "Browse and select jobs you want to do on the platform.",
    requestTraining: "Request Training",
    requestTrainingDesc: "Ask for training or upskilling in your field of work.",
    marketplace: "Marketplace",
    marketplaceDesc: "Explore the virtual marketplace for labor opportunities.",
    copyright: "© 2025 MalligeMitra. All rights reserved.",
    built: "Built with ",
    by: "by Team Regenesis"
  },
  kn: {
    dashboard: "ಕಾರ್ಮಿಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    welcome: "ಸ್ವಾಗತ ಕಾರ್ಮಿಕರೆ!",
    listSkills: "ನಿಮ್ಮನ್ನು ಮತ್ತು ಕೌಶಲ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ",
    listSkillsDesc: "ರೈತರು ನೇಮಿಸಲು ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಕೌಶಲ್ಯಗಳನ್ನು ಸೇರಿಸಿ.",
    pickJobs: "ಕೆಲಸಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    pickJobsDesc: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನಲ್ಲಿ ನೀವು ಮಾಡಲು ಬಯಸುವ ಕೆಲಸಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಆಯ್ಕೆಮಾಡಿ.",
    requestTraining: "ಪ್ರಶಿಕ್ಷಣ ಕೇಳಿ",
    requestTrainingDesc: "ನಿಮ್ಮ ಕ್ಷೇತ್ರದಲ್ಲಿ ತರಬೇತಿ ಅಥವಾ ಕೌಶಲ್ಯವರ್ಧನೆ ಕೇಳಿ.",
    marketplace: "ಮಾರ್ಕೆಟ್",
    marketplaceDesc: "ಕಾರ್ಮಿಕ ಅವಕಾಶಗಳ ವರ್ಚುವಲ್ ಮಾರ್ಕೆಟ್ ಅನ್ವೇಷಿಸಿ.",
    copyright: "© 2025 MalligeMitra. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    built: "ನಿರ್ಮಿಸಲಾಗಿದೆ ",
    by: "Team Regenesis"
  }
} as const;

type LangKey = keyof typeof TEXT;

export default function LaborerDashboard() {
  const [lang, setLang] = useState<LangKey>("en");
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const t = TEXT[lang];
  // Sidebar navigation items
  const navItems = [
    { key: "dashboard", label: t.dashboard, icon: <FaUserCog /> },
    { key: "listSkills", label: t.listSkills, icon: <FaClipboardList /> },
    { key: "requestTraining", label: t.requestTraining, icon: <FaChalkboardTeacher /> },
    { key: "activeWorks", label: "Active Works", icon: <FaTasks /> },
    { key: "marketplace", label: t.marketplace, icon: <FaStore /> },
  ];

  return (
    <main className="font-sans text-neutral-900 bg-gradient-to-br from-lime-100 via-emerald-50 to-white min-h-screen flex flex-row">
      {/* Sidebar Navigation */}
      <aside className="h-screen w-20 bg-gradient-to-b from-emerald-700 via-lime-600 to-green-700 text-white flex flex-col items-center py-6 gap-4 shadow-xl fixed left-0 top-0 z-20">
        <img src="/icon.jpg" alt="MalligeMitra Logo" className="h-10 w-10 rounded-full object-cover mb-2" />
        {navItems.map(item => (
          <button
            key={item.key}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-200 hover:bg-lime-600 focus:outline-none ${active === item.key ? "bg-lime-400 text-emerald-900" : ""}`}
            onClick={() => setActive(item.key)}
            aria-label={item.label}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-20 min-h-screen">
        {/* Top Bar with profile and language toggle */}
        <div className="w-full bg-white/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-8 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/laborerimg.jpg" alt="Laborer" className="h-14 w-14 object-cover rounded-full shadow border-4 border-lime-200" />
            <div>
              <h1 className="font-extrabold text-emerald-800 text-2xl md:text-3xl drop-shadow-lg">{t.welcome}</h1>
              <span className="font-bold text-base text-emerald-700">MalligeMitra</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              className="bg-white text-emerald-700 rounded px-2 py-1 text-xs font-semibold shadow focus:outline-none"
              value={lang}
              onChange={e => setLang(e.target.value as LangKey)}
            >
              <option value="en">English</option>
              <option value="kn">Kannada</option>
            </select>
            <button
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white border-2 border-white shadow cursor-pointer"
              onClick={() => setProfileOpen((open) => !open)}
              aria-label="Profile"
            >
              <svg viewBox="0 0 32 32" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="12" r="6" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
                <path d="M6 26c0-4.418 4.477-8 10-8s10 3.582 10 8" stroke="#059669" strokeWidth="2" fill="#d1fae5" />
              </svg>
            </button>
            {profileOpen && (
              <div className="absolute top-16 right-8 bg-white text-emerald-700 rounded shadow-lg py-2 w-32 z-10 border border-lime-200">
                <a href="/profile" className="block px-4 py-2 hover:bg-lime-50 text-sm">Profile</a>
                <button className="block w-full text-left px-4 py-2 hover:bg-lime-50 text-sm" onClick={() => alert('Logged out!')}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Main Content */}
        <div className="flex-1 flex flex-col items-center justify-start px-8 py-8 gap-8">
          {active === "dashboard" && (
            <div className="w-full max-w-2xl">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">Active Works</h2>
              <div className="flex flex-col gap-6">
                {/* Example active work cards */}
                <div className="bg-white p-6 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 w-full">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-emerald-700">Order ID: 001</span>
                    <span className="text-neutral-700 text-sm">Duration: 3 days</span>
                    <span className="text-neutral-700 text-sm">Description: Harvesting at Farm A - Help with picking and sorting flowers.</span>
                    <span className="mt-2 bg-lime-200 text-emerald-800 px-4 py-2 rounded text-sm font-semibold self-end">Available</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 w-full">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-emerald-700">Order ID: 002</span>
                    <span className="text-neutral-700 text-sm">Duration: 1 day</span>
                    <span className="text-neutral-700 text-sm">Description: Weeding at Farm B - Remove weeds from flower beds.</span>
                    <span className="mt-2 bg-gray-300 text-gray-600 px-4 py-2 rounded text-sm font-semibold self-end cursor-not-allowed">Completed</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 w-full">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-emerald-700">Order ID: 003</span>
                    <span className="text-neutral-700 text-sm">Duration: 2 days</span>
                    <span className="text-neutral-700 text-sm">Description: Transporting Flowers - Assist with packing and delivery.</span>
                    <span className="mt-2 bg-lime-200 text-emerald-800 px-4 py-2 rounded text-sm font-semibold self-end">Available</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {active === "listSkills" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.listSkills}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.listSkillsDesc}</p>
              {/* Add list skills UI here */}
              <div className="text-center text-neutral-400">[List Skills Coming Soon]</div>
            </div>
          )}
          {active === "requestTraining" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.requestTraining}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.requestTrainingDesc}</p>
              {/* Add request training UI here */}
              <div className="text-center text-neutral-400">[Request Training Coming Soon]</div>
            </div>
          )}
          {active === "activeWorks" && (
            <div className="w-full max-w-2xl">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">Active Works</h2>
              <div className="flex flex-col gap-6">
                {/* Example active work cards */}
                <div className="bg-white p-6 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 w-full">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-emerald-700">Order ID: 001</span>
                    <span className="text-neutral-700 text-sm">Duration: 3 days</span>
                    <span className="text-neutral-700 text-sm">Description: Harvesting at Farm A - Help with picking and sorting flowers.</span>
                    <span className="mt-2 bg-lime-200 text-emerald-800 px-4 py-2 rounded text-sm font-semibold self-end">Available</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 w-full">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-emerald-700">Order ID: 002</span>
                    <span className="text-neutral-700 text-sm">Duration: 1 day</span>
                    <span className="text-neutral-700 text-sm">Description: Weeding at Farm B - Remove weeds from flower beds.</span>
                    <span className="mt-2 bg-gray-300 text-gray-600 px-4 py-2 rounded text-sm font-semibold self-end cursor-not-allowed">Completed</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 w-full">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-emerald-700">Order ID: 003</span>
                    <span className="text-neutral-700 text-sm">Duration: 2 days</span>
                    <span className="text-neutral-700 text-sm">Description: Transporting Flowers - Assist with packing and delivery.</span>
                    <span className="mt-2 bg-lime-200 text-emerald-800 px-4 py-2 rounded text-sm font-semibold self-end">Available</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {active === "marketplace" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.marketplace}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.marketplaceDesc}</p>
              {/* Add marketplace UI here */}
              <div className="text-center text-neutral-400">[Marketplace Coming Soon]</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
          <p className="mb-1 text-base font-semibold">{t.copyright}</p>
          <p className="text-xs">{t.built}<span className="text-pink-300">❤️</span> {t.by}</p>
        </footer>
      </div>
    </main>
  );
}
// ...existing code...
