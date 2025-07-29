"use client";
import { useState } from "react";
import { FaCalculator, FaLeaf, FaUsers, FaBoxOpen, FaStore, FaComments, FaHistory } from "react-icons/fa";

const TEXT = {
  en: {
    dashboard: "Farmer Dashboard",
    welcome: "Welcome, Farmer!",
    sellFlowers: "Sell Flowers",
    sellFlowersDesc: "List your jasmine flowers for sale, set price and quantity.",
    hireLaborers: "Hire Laborers",
    hireLaborersDesc: "Find, request, and manage skilled labor for your farm.",
    shareItems: "Share/Sell Excess Items",
    shareItemsDesc: "List extra tools, rope, or supplies to share or sell.",
    marketplace: "Marketplace & Orders",
    marketplaceDesc: "View your orders and explore the virtual marketplace.",
    forum: "Farmer Forum",
    forumDesc: "Discuss, share advice, and connect with other farmers.",
    historicalPrices: "Historical Prices",
    historicalPricesDesc: "View jasmine flower prices from previous seasons.",
    priceCalculator: "Price Calculator",
    priceCalculatorDesc: "Estimate your flower price based on quantity and market trends.",
    copyright: "© 2025 MalligeMitra. All rights reserved.",
    built: "Built with ",
    by: "by Team Regenesis"
  },
  kn: {
    dashboard: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    welcome: "ಸ್ವಾಗತ ರೈತರೆ!",
    sellFlowers: "ಹೂವುಗಳನ್ನು ಮಾರಾಟ ಮಾಡಿ",
    sellFlowersDesc: "ನಿಮ್ಮ ಮಲ್ಲಿಗೆ ಹೂಗಳನ್ನು ಮಾರಾಟಕ್ಕೆ ಪಟ್ಟಿ ಮಾಡಿ, ಬೆಲೆ ಮತ್ತು ಪ್ರಮಾಣವನ್ನು ಹೊಂದಿಸಿ.",
    hireLaborers: "ಕಾರ್ಮಿಕರನ್ನು ನೇಮಿಸಿ",
    hireLaborersDesc: "ನಿಮ್ಮ ಕೃಷಿಗೆ ನಿಪುಣ ಕಾರ್ಮಿಕರನ್ನು ಹುಡುಕಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.",
    shareItems: "ಹಂಚಿಕೆ/ಮಾರಾಟ ಹೆಚ್ಚುವರಿ ವಸ್ತುಗಳು",
    shareItemsDesc: "ಹೆಚ್ಚುವರಿ ಉಪಕರಣಗಳು, ಕಯಿ, ಅಥವಾ ಸರಕಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಅಥವಾ ಮಾರಾಟ ಮಾಡಿ.",
    marketplace: "ಮಾರ್ಕೆಟ್ & ಆರ್ಡರ್‍ಗಳು",
    marketplaceDesc: "ನಿಮ್ಮ ಆರ್ಡರ್‍ಗಳನ್ನು ನೋಡಿ ಮತ್ತು ವರ್ಚುವಲ್ ಮಾರ್ಕೆಟ್ ಅನ್ವೇಷಿಸಿ.",
    forum: "ರೈತ ಫೋರಮ್",
    forumDesc: "ಚರ್ಚಿಸಿ, ಸಲಹೆ ಹಂಚಿಕೊಳ್ಳಿ, ಮತ್ತು ಇತರ ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",
    historicalPrices: "ಐತಿಹಾಸಿಕ ಬೆಲೆಗಳು",
    historicalPricesDesc: "ಹಿಂದಿನ ಋತುಗಳಲ್ಲಿ ಮಲ್ಲಿಗೆ ಹೂವಿನ ಬೆಲೆಗಳನ್ನು ನೋಡಿ.",
    priceCalculator: "ಬೆಲೆ ಗಣಕಯಂತ್ರ",
    priceCalculatorDesc: "ಪ್ರಮಾಣ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಹೂವಿನ ಬೆಲೆಯನ್ನು ಅಂದಾಜಿಸಿ.",
    copyright: "© 2025 MalligeMitra. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    built: "ನಿರ್ಮಿಸಲಾಗಿದೆ ",
    by: "Team Regenesis"
  }
} as const;

type LangKey = keyof typeof TEXT;

export default function FarmerDashboard() {
  const [lang, setLang] = useState<LangKey>("en");
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const t = TEXT[lang];
  // Sidebar navigation items
  const navItems = [
    { key: "dashboard", label: t.dashboard, icon: <FaLeaf /> },
    { key: "priceCalculator", label: t.priceCalculator, icon: <FaCalculator /> },
    { key: "sellFlowers", label: t.sellFlowers, icon: <FaLeaf /> },
    { key: "hireLaborers", label: t.hireLaborers, icon: <FaUsers /> },
    { key: "shareItems", label: t.shareItems, icon: <FaBoxOpen /> },
    { key: "marketplace", label: t.marketplace, icon: <FaStore /> },
    { key: "forum", label: t.forum, icon: <FaComments /> },
    { key: "historicalPrices", label: t.historicalPrices, icon: <FaHistory /> },
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
            <img src="/farmerimg.jpg" alt="Farmer" className="h-14 w-14 object-cover rounded-full shadow border-4 border-lime-200" />
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
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.dashboard}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow border border-lime-200 hover:border-emerald-400 transition-colors duration-200">
                  <h3 className="font-semibold mb-2 text-emerald-700 text-lg">{t.sellFlowers}</h3>
                  <p className="text-neutral-700 text-sm">{t.sellFlowersDesc}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border border-lime-200 hover:border-emerald-400 transition-colors duration-200">
                  <h3 className="font-semibold mb-2 text-emerald-700 text-lg">{t.hireLaborers}</h3>
                  <p className="text-neutral-700 text-sm">{t.hireLaborersDesc}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border border-lime-200 hover:border-emerald-400 transition-colors duration-200">
                  <h3 className="font-semibold mb-2 text-emerald-700 text-lg">{t.shareItems}</h3>
                  <p className="text-neutral-700 text-sm">{t.shareItemsDesc}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border border-lime-200 hover:border-emerald-400 transition-colors duration-200">
                  <h3 className="font-semibold mb-2 text-emerald-700 text-lg">{t.marketplace}</h3>
                  <p className="text-neutral-700 text-sm">{t.marketplaceDesc}</p>
                </div>
              </div>
            </div>
          )}
          {active === "priceCalculator" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.priceCalculator}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.priceCalculatorDesc}</p>
              {/* Add calculator UI here */}
              <div className="text-center text-neutral-400">[Price Calculator Coming Soon]</div>
            </div>
          )}
          {active === "sellFlowers" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.sellFlowers}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.sellFlowersDesc}</p>
              {/* Add sell flowers form here */}
              <div className="text-center text-neutral-400">[Sell Flowers Form Coming Soon]</div>
            </div>
          )}
          {active === "hireLaborers" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.hireLaborers}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.hireLaborersDesc}</p>
              {/* Add hire laborers UI here */}
              <div className="text-center text-neutral-400">[Hire Laborers Coming Soon]</div>
            </div>
          )}
          {active === "shareItems" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.shareItems}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.shareItemsDesc}</p>
              {/* Add share/sell items UI here */}
              <div className="text-center text-neutral-400">[Share/Sell Items Coming Soon]</div>
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
          {active === "forum" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.forum}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.forumDesc}</p>
              {/* Add forum UI here */}
              <div className="text-center text-neutral-400">[Forum Coming Soon]</div>
            </div>
          )}
          {active === "historicalPrices" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.historicalPrices}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.historicalPricesDesc}</p>
              {/* Add historical prices UI here */}
              <div className="text-center text-neutral-400">[Historical Prices Coming Soon]</div>
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
