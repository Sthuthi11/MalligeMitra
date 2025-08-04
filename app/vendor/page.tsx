"use client";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';
import { useState } from "react";
import { FaStore, FaHistory } from "react-icons/fa";

const TEXT = {
  en: {
    welcome: "Welcome Agri Vendor/Shopper!",
    marketplace: "Marketplace",
    marketplaceDesc: "Buy jasmine (Atte) directly from farmers.",
    history: "Order History",
    historyDesc: "View your previous orders and transactions.",
    orderId: "Order ID",
    date: "Date",
    item: "Item",
    qty: "Qty",
    amount: "Amount",
    status: "Status",
    noOrders: "No orders found.",
    buy: "Buy",
    price: "Price",
    farmerId: "Farmer ID",
    farmerName: "Farmer Name",
    copyright: "© 2025 MalligeMitra. All rights reserved.",
    built: "Built with ",
    by: "by Team Regenesis"
  },
  kn: {
    welcome: "ಸ್ವಾಗತ ಕೃಷಿ ಮಾರಾಟಗಾರ/ಖರೀದಿದಾರ!",
    marketplace: "ಮಾರ್ಕೆಟ್",
    marketplaceDesc: "ರೈತರಿಂದ ನೇರವಾಗಿ ಮಲ್ಲಿಗೆ (ಅಟ್ಟೆ) ಖರೀದಿಸಿ.",
    history: "ಆರ್ಡರ್ ಇತಿಹಾಸ",
    historyDesc: "ನಿಮ್ಮ ಹಿಂದಿನ ಆರ್ಡರ್‍ಗಳು ಮತ್ತು ವ್ಯವಹಾರಗಳನ್ನು ನೋಡಿ.",
    orderId: "ಆರ್ಡರ್ ಐಡಿ",
    date: "ದಿನಾಂಕ",
    item: "ವಸ್ತು",
    qty: "ಪ್ರಮಾಣ",
    amount: "ಮೊತ್ತ",
    status: "ಸ್ಥಿತಿ",
    noOrders: "ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    buy: "ಖರೀದಿ",
    price: "ಬೆಲೆ",
    farmerId: "ರೈತ ಐಡಿ",
    farmerName: "ರೈತ ಹೆಸರು",
    copyright: "© 2025 MalligeMitra. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    built: "ನಿರ್ಮಿಸಲಾಗಿದೆ ",
    by: "Team Regenesis"
  }
} as const;

type LangKey = keyof typeof TEXT;

type JasmineAtte = {
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

// Dummy jasmine ates for marketplace
const jasmineAttes: JasmineAtte[] = [
  {
    id: "A001",
    farmerId: "F1001",
    farmerName: "Ramesh Shetty",
    price: "₹1200",
    qty: 5
  },
  {
    id: "A002",
    farmerId: "F1002",
    farmerName: "Lakshmi Rao",
    price: "₹1150",
    qty: 3
  },
  {
    id: "A003",
    farmerId: "F1003",
    farmerName: "Manjunath Nayak",
    price: "₹1250",
    qty: 2
  },
  // New block added
  {
    id: "A004",
    farmerId: "F1004",
    farmerName: "Suresh Pai",
    price: "₹1100",
    qty: 4
  }
];

// Dummy orders (only Jasmine Atte orders)
const dummyOrders: Order[] = [
  {
    id: "ORD12345",
    date: "2025-07-20",
    item: "Jasmine Atte",
    qty: 2,
    amount: "₹2400",
    status: "Delivered",
    farmerId: "F1001",
    farmerName: "Ramesh Shetty"
  },
  {
    id: "ORD12346",
    date: "2025-07-18",
    item: "Jasmine Atte",
    qty: 1,
    amount: "₹1150",
    status: "Shipped",
    farmerId: "F1002",
    farmerName: "Lakshmi Rao"
  }
];

export default function VendorShopper() {
  const [lang, setLang] = useState<LangKey>("en");
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState("marketplace");
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const t = TEXT[lang];
  const navItems = [
    { key: "marketplace", label: t.marketplace, icon: <FaStore /> },
    { key: "history", label: t.history, icon: <FaHistory /> },
  ];

  // Simulate buying a jasmine atte (adds to order history)
  const handleBuy = (atte: JasmineAtte) => {
    const newOrder: Order = {
      id: `ORD${Math.floor(Math.random() * 100000)}`,
      date: new Date().toISOString().slice(0, 10),
      item: "Jasmine Atte",
      qty: 1,
      amount: atte.price,
      status: "Processing",
      farmerId: atte.farmerId,
      farmerName: atte.farmerName
    };
    setOrders([newOrder, ...orders]);
    setActive("history");
  };

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
        <div className="w-full bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white sticky top-0 z-10 flex items-center justify-between px-8 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/vendor.jpg" alt="Vendor" className="h-14 w-14 object-cover rounded-full shadow border-4 border-lime-200" />
            <div>
              <h1 className="font-extrabold text-white text-2xl md:text-3xl drop-shadow-lg">MalligeMitra</h1>
              <p className="text-lime-100 font-semibold text-xs md:text-sm">{t.welcome}</p>
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
          {active === "marketplace" && (
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.marketplace}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.marketplaceDesc}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jasmineAttes.map(atte => {
                  const alreadyBought = orders.some(
                    order => order.item === "Jasmine Atte" && order.farmerId === atte.farmerId && order.farmerName === atte.farmerName
                  );
                  return (
                    <div key={atte.id} className="bg-lime-50 border border-lime-200 rounded-lg p-4 shadow hover:border-emerald-400 transition">
                      <h3 className="font-semibold text-emerald-800 text-lg mb-1">Jasmine Atte</h3>
                      <div className="text-neutral-700 text-sm mb-1">{t.farmerId}: <span className="font-mono">{atte.farmerId}</span></div>
                      <div className="text-neutral-700 text-sm mb-2">{t.farmerName}: <span className="font-semibold">{atte.farmerName}</span></div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-emerald-700">{t.price}: {atte.price}</span>
                        <span className="text-xs text-neutral-500">{atte.qty} atte</span>
                      </div>
                      {alreadyBought ? (
                        <span className="block w-full py-2 rounded bg-lime-300 text-emerald-900 font-semibold text-center cursor-not-allowed">Bought</span>
                      ) : (
                        <button
                          className="mt-2 w-full py-2 rounded bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white font-semibold hover:from-emerald-800 hover:via-lime-700 hover:to-green-800 transition"
                          onClick={() => handleBuy(atte)}
                          disabled={atte.qty === 0}
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
          {active === "history" && (
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.history}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.historyDesc}</p>
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
                      orders
                        .filter(order => order.item === "Jasmine Atte")
                        .map(order => (
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
          <div className="flex flex-col items-center gap-1">
            <GoogleTranslateWidgetBlended />
            <p className="mb-1 text-base font-semibold">{t.copyright}</p>
            <p className="text-xs">{t.built}<span className="text-pink-300">❤️</span> {t.by}</p>
          </div>
        </footer>
      </div>
    </main>
  );
}