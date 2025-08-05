"use client";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';
import { useState } from "react";
import { FaHistory, FaBoxOpen } from "react-icons/fa";

const TEXT = {
  en: {
    dashboard: "Industry Dashboard",
    welcome: "Welcome, Industry Partner!",
    buyBulk: "Buy Leftover Jasmine Bulk",
    buyBulkDesc: "Purchase leftover jasmine flowers at reduced prices directly from farmers.",
    orderHistory: "Order History",
    orderHistoryDesc: "View and manage your previous leftover jasmine orders.",
    orderId: "Order ID",
    date: "Date",
    item: "Item",
    qty: "Qty",
    amount: "Amount",
    status: "Status",
    farmerId: "Farmer ID",
    farmerName: "Farmer Name",
    buy: "Buy",
    bought: "Bought",
    price: "Price",
    noOrders: "No orders found.",
    copyright: "© 2025 MalligeMitra. All rights reserved.",
    built: "Built with ",
    by: "by Team Regenesis"
  },
  kn: {
    dashboard: "ಉದ್ಯಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    welcome: "ಸ್ವಾಗತ ಉದ್ಯಮ ಪಾಲುದಾರರು!",
    buyBulk: "ಉಳಿದ ಮಲ್ಲಿಗೆ ಹೂವುಗಳನ್ನು ಖರೀದಿಸಿ",
    buyBulkDesc: "ರೈತರಿಂದ ನೇರವಾಗಿ ಕಡಿಮೆ ಬೆಲೆಯಲ್ಲಿ ಉಳಿದ ಮಲ್ಲಿಗೆ ಹೂಗಳನ್ನು ಖರೀದಿಸಿ.",
    orderHistory: "ಆರ್ಡರ್ ಇತಿಹಾಸ",
    orderHistoryDesc: "ನಿಮ್ಮ ಹಿಂದಿನ ಉಳಿದ ಹೂವಿನ ಆರ್ಡರ್‌ಗಳನ್ನು ನೋಡಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.",
    orderId: "ಆರ್ಡರ್ ಐಡಿ",
    date: "ದಿನಾಂಕ",
    item: "ವಸ್ತು",
    qty: "ಪ್ರಮಾಣ",
    amount: "ಮೊತ್ತ",
    status: "ಸ್ಥಿತಿ",
    farmerId: "ರೈತ ಐಡಿ",
    farmerName: "ರೈತ ಹೆಸರು",
    buy: "ಖರೀದಿ",
    bought: "ಖರೀದಿಸಲಾಗಿದೆ",
    price: "ಬೆಲೆ",
    noOrders: "ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    copyright: "© 2025 MalligeMitra. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    built: "ನಿರ್ಮಿಸಲಾಗಿದೆ ",
    by: "Team Regenesis"
  }
} as const;

type LangKey = keyof typeof TEXT;

type JasmineBulk = {
  id: string;
  farmerId: string;
  farmerName: string;
  price: string;
  qty: number;
};

type Order = {
  id: string;
  date: string;
  item: string;
  qty: number;
  amount: string;
  status: string;
  farmerId: string;
  farmerName: string;
};

const leftoverBulks: JasmineBulk[] = [
  { id: "L001", farmerId: "F2004", farmerName: "Leela Nayak", price: "₹7,000", qty: 30 },
  { id: "L002", farmerId: "F2005", farmerName: "Manjunath Pai", price: "₹6,800", qty: 25 },
  { id: "L003", farmerId: "F2006", farmerName: "Yashodha Bhat", price: "₹6,500", qty: 20 },
  { id: "L004", farmerId: "F2007", farmerName: "Ganesh Kini", price: "₹6,200", qty: 22 }
];

const dummyOrders: Order[] = [];

export default function IndustryDashboard() {
  const [lang, setLang] = useState<LangKey>("en");
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState("buyBulk");
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const t = TEXT[lang];

  const navItems = [
    { key: "buyBulk", label: t.buyBulk, icon: <FaBoxOpen /> },
    { key: "orderHistory", label: t.orderHistory, icon: <FaHistory /> },
  ];

  const handleBuy = (bulk: JasmineBulk) => {
    const newOrder: Order = {
      id: `ORD${Math.floor(Math.random() * 100000)}`,
      date: new Date().toISOString().slice(0, 10),
      item: "Leftover Jasmine Bulk",
      qty: bulk.qty,
      amount: bulk.price,
      status: "Processing",
      farmerId: bulk.farmerId,
      farmerName: bulk.farmerName
    };
    setOrders([newOrder, ...orders]);
    setActive("orderHistory");
  };

  return (
    <main className="font-sans text-neutral-900 bg-gradient-to-br from-lime-100 via-emerald-50 to-white min-h-screen flex flex-row">
      {/* Sidebar */}
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
            <span className="text-[10px] font-semibold text-center">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-20 min-h-screen">
        {/* Header */}
        <div className="w-full bg-white/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-8 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/industry.jpg" alt="Industry" className="h-14 w-14 object-cover rounded-full shadow border-4 border-lime-200" />
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

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-start px-8 py-8 gap-8">
          {active === "buyBulk" && (
            <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.buyBulk}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.buyBulkDesc}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {leftoverBulks.map(bulk => {
                  const alreadyBought = orders.some(
                    order => order.item === "Leftover Jasmine Bulk" && order.farmerId === bulk.farmerId
                  );
                  return (
                    <div key={bulk.id} className="bg-lime-50 border border-lime-200 rounded-lg p-4 shadow hover:border-emerald-400 transition">
                      <h3 className="font-semibold text-emerald-800 text-lg mb-1">Leftover Jasmine Bulk</h3>
                      <div className="text-neutral-700 text-sm mb-1">{t.farmerId}: <span className="font-mono">{bulk.farmerId}</span></div>
                      <div className="text-neutral-700 text-sm mb-2">{t.farmerName}: <span className="font-semibold">{bulk.farmerName}</span></div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-emerald-700">{t.price}: {bulk.price}</span>
                        <span className="text-xs text-neutral-500">{bulk.qty} kg</span>
                      </div>
                      {alreadyBought ? (
                        <span className="block w-full py-2 rounded bg-lime-300 text-emerald-900 font-semibold text-center cursor-not-allowed">{t.bought}</span>
                      ) : (
                        <button
                          className="mt-2 w-full py-2 rounded bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white font-semibold hover:from-emerald-800 hover:via-lime-700 hover:to-green-800 transition"
                          onClick={() => handleBuy(bulk)}
                          disabled={bulk.qty === 0}
                        >
                          {t.buy}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {active === "orderHistory" && (
            <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.orderHistory}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.orderHistoryDesc}</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-lime-200 rounded-lg">
                  <thead>
                    <tr className="bg-lime-50">
                      <th className="px-4 py-2 border-b text-left">{t.orderId}</th>
                      <th className="px-4 py-2 border-b text-left">{t.date}</th>
                      <th className="px-4 py-2 border-b text-left">{t.item}</th>
                      <th className="px-2 py-2 border-b text-left">{t.qty}</th>
                      <th className="px-4 py-2 border-b text-left">{t.amount}</th>
                      <th className="px-4 py-2 border-b text-left">{t.farmerId}</th>
                      <th className="px-4 py-2 border-b text-left">{t.farmerName}</th>
                      <th className="px-4 py-2 border-b text-left">{t.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-6 text-neutral-400">{t.noOrders}</td>
                      </tr>
                    ) : (
                      orders.map(order => (
                        <tr key={order.id} className="hover:bg-lime-50 transition">
                          <td className="px-4 py-2 border-b font-mono">{order.id}</td>
                          <td className="px-4 py-2 border-b">{order.date}</td>
                          <td className="px-4 py-2 border-b">{order.item}</td>
                          <td className="px-2 py-2 border-b">{order.qty}</td>
                          <td className="px-4 py-2 border-b">{order.amount}</td>
                          <td className="px-4 py-2 border-b">{order.farmerId}</td>
                          <td className="px-4 py-2 border-b">{order.farmerName}</td>
                          <td className="px-4 py-2 border-b">{order.status}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
          <p className="mb-1 text-base font-semibold">{t.copyright}</p>
          <p className="text-xs">{t.built}<span className="text-pink-300"> ❤️ </span>{t.by}</p>
        </footer>
      </div>
    </main>
  );
}
