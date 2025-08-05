
"use client";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';
import { useState } from "react";
import { FaBoxOpen, FaStore, FaClipboardList, FaHistory, FaUsers } from "react-icons/fa";

const TEXT = {
  en: {
    dashboard: "Vendor Dashboard",
    welcome: "Welcome, Agri Vendor!",
    listProducts: "List Tools & Products",
    listProductsDesc: "Add tools, fertilizers, and products for farmers to buy.",
    manageInventory: "Manage Inventory",
    manageInventoryDesc: "Track and update your available stock and supplies.",
    viewOrders: "View Orders",
    viewOrdersDesc: "See and manage orders placed by farmers.",
    marketplace: "Marketplace",
    marketplaceDesc: "Explore the virtual marketplace for agri supplies.",
    history: "Order History",
    historyDesc: "View your previous orders and transactions.",
    copyright: "© 2025 MalligeMitra. All rights reserved.",
    built: "Built with ",
    by: "by Team Regenesis"
  },
  kn: {
    dashboard: "ವ್ಯಾಪಾರಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    welcome: "ಸ್ವಾಗತ ಕೃಷಿ ವ್ಯಾಪಾರಿಗಳು!",
    listProducts: "ಉಪಕರಣಗಳು ಮತ್ತು ಉತ್ಪನ್ನಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ",
    listProductsDesc: "ರೈತರು ಖರೀದಿಸಲು ಉಪಕರಣಗಳು, ರಸಗೊಬ್ಬರು ಮತ್ತು ಉತ್ಪನ್ನಗಳನ್ನು ಸೇರಿಸಿ.",
    manageInventory: "ಇನ್ವೆಂಟರಿ ನಿರ್ವಹಿಸಿ",
    manageInventoryDesc: "ನಿಮ್ಮ ಲಭ್ಯವಿರುವ ಸ್ಟಾಕ್ ಮತ್ತು ಸರಕಗಳನ್ನು ನವೀಕರಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    viewOrders: "ಆರ್ಡರ್‍ಗಳನ್ನು ನೋಡಿ",
    viewOrdersDesc: "ರೈತರು ಮಾಡಿದ ಆರ್ಡರ್‍ಗಳನ್ನು ನೋಡಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.",
    marketplace: "ಮಾರ್ಕೆಟ್",
    marketplaceDesc: "ಕೃಷಿ ಸರಕಗಳ ವರ್ಚುವಲ್ ಮಾರ್ಕೆಟ್ ಅನ್ವೇಷಿಸಿ.",
    history: "ಆರ್ಡರ್ ಇತಿಹಾಸ",
    historyDesc: "ನಿಮ್ಮ ಹಿಂದಿನ ಆರ್ಡರ್‍ಗಳು ಮತ್ತು ವ್ಯವಹಾರಗಳನ್ನು ನೋಡಿ.",
    copyright: "© 2025 MalligeMitra. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    built: "ನಿರ್ಮಿಸಲಾಗಿದೆ ",
    by: "Team Regenesis"
  }
} as const;

type LangKey = keyof typeof TEXT;

export default function VendorDashboard() {
  const [lang, setLang] = useState<LangKey>("en");
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const t = TEXT[lang];
  // Sidebar navigation items
  const navItems = [
    { key: "dashboard", label: t.dashboard, icon: <FaStore /> },
    { key: "listProducts", label: t.listProducts, icon: <FaBoxOpen /> },
    { key: "viewOrders", label: t.viewOrders, icon: <FaUsers /> },
    { key: "marketplace", label: t.marketplace, icon: <FaStore /> },
    { key: "history", label: t.history, icon: <FaHistory /> },
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
            <img src="/vendorimg.jpg" alt="Vendor" className="h-14 w-14 object-cover rounded-full shadow border-4 border-lime-200" />
            <div>
              <h1 className="font-extrabold text-emerald-800 text-2xl md:text-3xl drop-shadow-lg">{t.welcome}</h1>
              <span className="font-bold text-base text-emerald-700">MalligeMitra</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GoogleTranslateWidgetBlended />
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
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.manageInventory}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.manageInventoryDesc}</p>
              {/* Add manage inventory UI here */}
              <div className="text-center text-neutral-400">[Manage Inventory Coming Soon]</div>
            </div>
          )}
          {active === "listProducts" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.listProducts}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.listProductsDesc}</p>
              {/* Add list products form here */}
              <div className="text-center text-neutral-400">[List Products Form Coming Soon]</div>
            </div>
          )}
          {active === "manageInventory" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.manageInventory}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.manageInventoryDesc}</p>
              {/* Add manage inventory UI here */}
              <div className="text-center text-neutral-400">[Manage Inventory Coming Soon]</div>
            </div>
          )}
          {active === "viewOrders" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.viewOrders}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.viewOrdersDesc}</p>
              {/* Add view orders UI here */}
              <div className="text-center text-neutral-400">[View Orders Coming Soon]</div>
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
          {active === "history" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.history}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.historyDesc}</p>
              {/* Add order history UI here */}
              <div className="text-center text-neutral-400">[Order History Coming Soon]</div>
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

