"use client";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';
import { useState, useEffect } from "react"; // Step 3: Added 'useEffect' here
import { FaCalculator, FaLeaf, FaUsers, FaBoxOpen, FaStore, FaComments, FaHistory } from "react-icons/fa";




// =============================================================
// STEP 1: The huge calculator code block is defined here
// =============================================================
const PriceCalculator = ({ t }: { t: any }) => {
  const [variety, setVariety] = useState("Udupi Mallige");
  const [atte, setAtte] = useState("");
  const [chendu, setChendu] = useState("");
  const [ratePerAtte, setRatePerAtte] = useState("");
  const [commission, setCommission] = useState("10");
  const [grossEarnings, setGrossEarnings] = useState(0);
  const [commissionAmount, setCommissionAmount] = useState(0);
  const [netEarnings, setNetEarnings] = useState(0);

  useEffect(() => {
    const atteCount = parseFloat(atte) || 0;
    const chenduCount = parseFloat(chendu) || 0;
    const rate = parseFloat(ratePerAtte) || 0;
    const commissionPercent = parseFloat(commission) || 0;
    const totalProduceInAtte = atteCount + (chenduCount / 4);
    const gross = totalProduceInAtte * rate;
    const commissionValue = gross * (commissionPercent / 100);
    const net = gross - commissionValue;
    setGrossEarnings(gross);
    setCommissionAmount(commissionValue);
    setNetEarnings(net);
  }, [atte, chendu, ratePerAtte, commission]);

  const handleReset = () => {
    setVariety("Udupi Mallige");
    setAtte("");
    setChendu("");
    setRatePerAtte("");
    setCommission("10");
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-xl shadow-lg border border-lime-200">
      <h2 className="font-bold text-emerald-700 text-xl mb-2">{t.priceCalculator}</h2>
      <p className="text-neutral-600 text-sm mb-6">{t.priceCalculatorDesc}</p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Jasmine Variety</label>
          <select value={variety} onChange={(e) => setVariety(e.target.value)} className="w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
            <option>Udupi Mallige</option>
            <option>Mangaluru Mallige</option>
            <option>Jaji Mallige</option>
            <option>Shankarpura Mallige</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Mallige Produce Quantity</label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input type="number" placeholder="0" value={atte} onChange={(e) => setAtte(e.target.value)} className="w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
              <span className="text-xs text-neutral-500">Atte (ಅಟ್ಟೆ)</span>
            </div>
            <div className="flex-1">
              <input type="number" placeholder="0" value={chendu} onChange={(e) => setChendu(e.target.value)} className="w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
              <span className="text-xs text-neutral-500">Chendu (ಚೆಂಡು)</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Market Rate</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">₹</span>
              <input type="number" placeholder="1000" value={ratePerAtte} onChange={(e) => setRatePerAtte(e.target.value)} className="w-full p-2 pl-7 border border-neutral-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <span className="text-xs text-neutral-500">per Atte</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Agent Commission</label>
             <div className="relative">
              <input type="number" placeholder="10" value={commission} onChange={(e) => setCommission(e.target.value)} className="w-full p-2 pr-7 border border-neutral-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500">%</span>
            </div>
          </div>
        </div>
        <div className="bg-lime-50 border-t-2 border-emerald-600 rounded-b-lg p-4 space-y-2 mt-4">
          <div className="flex justify-between items-center text-neutral-800">
            <span className="font-medium">Gross Earnings</span>
            <span className="font-mono text-lg">₹{grossEarnings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-red-600">
            <span className="font-medium">Agent Commission ({commission || 0}%)</span>
            <span className="font-mono text-lg">- ₹{commissionAmount.toFixed(2)}</span>
          </div>
          <hr className="border-neutral-300" />
          <div className="flex justify-between items-center text-emerald-800 font-bold">
            <span className="text-lg">Total Net Earnings</span>
            <span className="font-mono text-2xl">₹{netEarnings.toFixed(2)}</span>
          </div>
        </div>
        <button onClick={handleReset} className="w-full mt-4 py-2 px-4 text-sm font-medium text-neutral-700 bg-neutral-100 border border-neutral-300 rounded-md hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          Reset Calculator
        </button>
      </div>
    </div>
  );
};


// This is your main FarmerDashboard component

export default function FarmerDashboard() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  // Labels are now static English, since Google Translate widget handles translation
  const navItems = [
    { key: "dashboard", label: "Farmer Dashboard", icon: <FaLeaf /> },
    { key: "priceCalculator", label: "Price Calculator", icon: <FaCalculator /> },
    { key: "sellFlowers", label: "Sell Flowers", icon: <FaLeaf /> },
    { key: "hireLaborers", label: "Hire Laborers", icon: <FaUsers /> },
    { key: "shareItems", label: "Share/Sell Excess Items", icon: <FaBoxOpen /> },
    { key: "marketplace", label: "Marketplace & Orders", icon: <FaStore /> },
    { key: "forum", label: "Farmer Forum", icon: <FaComments /> },
    { key: "historicalPrices", label: "Historical Prices", icon: <FaHistory /> },
  ];

  return (
    <main className="font-sans text-neutral-900 bg-gradient-to-br from-lime-100 via-emerald-50 to-white min-h-screen flex flex-row">
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

      <div className="flex-1 flex flex-col ml-20 min-h-screen">
        <div className="w-full bg-white/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-8 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/farmerimg.jpg" alt="Farmer" className="h-14 w-14 object-cover rounded-full shadow border-4 border-lime-200" />
            <div>
              <h1 className="font-extrabold text-emerald-800 text-2xl md:text-3xl drop-shadow-lg">Welcome, Farmer!</h1>
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

        <div className="flex-1 flex flex-col items-center justify-start px-8 py-8 gap-8">
          {active === "dashboard" && (
            <div className="w-full max-w-2xl">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">Farmer Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow border border-lime-200 hover:border-emerald-400 transition-colors duration-200">
                  <h3 className="font-semibold mb-2 text-emerald-700 text-lg">Sell Flowers</h3>
                  <p className="text-neutral-700 text-sm">List your jasmine flowers for sale, set price and quantity.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border border-lime-200 hover:border-emerald-400 transition-colors duration-200">
                  <h3 className="font-semibold mb-2 text-emerald-700 text-lg">Hire Laborers</h3>
                  <p className="text-neutral-700 text-sm">Find, request, and manage skilled labor for your farm.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border border-lime-200 hover:border-emerald-400 transition-colors duration-200">
                  <h3 className="font-semibold mb-2 text-emerald-700 text-lg">Share/Sell Excess Items</h3>
                  <p className="text-neutral-700 text-sm">List extra tools, rope, or supplies to share or sell.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border border-lime-200 hover:border-emerald-400 transition-colors duration-200">
                  <h3 className="font-semibold mb-2 text-emerald-700 text-lg">Marketplace & Orders</h3>
                  <p className="text-neutral-700 text-sm">View your orders and explore the virtual marketplace.</p>
                </div>
              </div>
            </div>
          )}
          
          {/* ============================================================= */}
          {/* STEP 2: The placeholder is replaced with the component call */}
          {/* ============================================================= */}
          {active === "priceCalculator" && (
            <PriceCalculator t={{
              priceCalculator: "Price Calculator",
              priceCalculatorDesc: "Estimate your flower price based on quantity and market trends."
            }} />
          )}

          {active === "sellFlowers" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">Sell Flowers</h2>
              <p className="text-neutral-700 text-sm mb-4">List your jasmine flowers for sale, set price and quantity.</p>
              <div className="text-center text-neutral-400">[Sell Flowers Form Coming Soon]</div>
            </div>
          )}
          {active === "hireLaborers" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">Hire Laborers</h2>
              <p className="text-neutral-700 text-sm mb-4">Find, request, and manage skilled labor for your farm.</p>
              <div className="text-center text-neutral-400">[Hire Laborers Coming Soon]</div>
            </div>
          )}
          {active === "shareItems" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">Share/Sell Excess Items</h2>
              <p className="text-neutral-700 text-sm mb-4">List extra tools, rope, or supplies to share or sell.</p>
              <div className="text-center text-neutral-400">[Share/Sell Items Coming Soon]</div>
            </div>
          )}
          {active === "marketplace" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">Marketplace & Orders</h2>
              <p className="text-neutral-700 text-sm mb-4">View your orders and explore the virtual marketplace.</p>
              <div className="text-center text-neutral-400">[Marketplace Coming Soon]</div>
            </div>
          )}
          {active === "forum" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">Farmer Forum</h2>
              <p className="text-neutral-700 text-sm mb-4">Discuss, share advice, and connect with other farmers.</p>
              <div className="text-center text-neutral-400">[Forum Coming Soon]</div>
            </div>
          )}
          {active === "historicalPrices" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">Historical Prices</h2>
              <p className="text-neutral-700 text-sm mb-4">View jasmine flower prices from previous seasons.</p>
              <div className="text-center text-neutral-400">[Historical Prices Coming Soon]</div>
            </div>
          )}
        </div>

        <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
          <p className="mb-1 text-base font-semibold">© 2025 MalligeMitra. All rights reserved.</p>
          <p className="text-xs">Built with <span className="text-pink-300">❤️</span> by Team Regenesis</p>
        </footer>
      </div>
    </main>
  );
}