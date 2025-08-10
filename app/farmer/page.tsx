"use client";

import React, { useState, useEffect } from "react";
import { FaCalculator, FaLeaf, FaUsers, FaBoxOpen, FaStore, FaComments, FaHistory, FaDollarSign, FaUserCircle, FaImage } from "react-icons/fa";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';

const TEXT = {
  en: {
    dashboard: "Farmer Dashboard",
    welcome: "Welcome, Farmer!",
    sellFlowers: "Sell Flowers",
    sellFlowersDesc: "List your jasmine flowers for sale, set price and quantity.",
    hireLaborers: "Hire Laborers",
    hireLaborersDesc: "Find, request, and manage skilled labor for your farm.",
    forum: "Farmer Forum",
    forumDesc: "Discuss, share advice, and connect with other farmers.",
    historicalPrices: "Historical Prices",
    historicalPricesDesc: "View jasmine flower prices from previous seasons.",
    priceCalculator: "Price Calculator",
    priceCalculatorDesc: "Estimate your flower price based on quantity and market trends.",
    marketplace: "Marketplace & Orders",
    marketplaceDesc: "View your orders and explore the virtual marketplace.",
    copyright: "© 2025 MalligeMitra. All rights reserved.",
    built: "Built with ",
    by: "by Team Regenesis",
    startDiscussion: "Start a new discussion...",
    postQuestion: "Post Question",
    yourReply: "Your Reply...",
    reply: "Reply",
    awaitingReplies: "Awaiting replies...",
    listNewItem: "List a New Item",
    postListing: "Post Listing",
    availableItems: "Available Items",
    buyItem: "Buy Item",
    yourListing: "Your Listing",
    listedBy: "Listed by",
    itemPrice: "Price (₹)",
    itemName: "Item Name",
    itemDescription: "Description",
    uploadImage: "Upload Image",
    noImage: "No Image",
    noItems: "No items are currently listed in the marketplace.",
  },
  kn: {
    dashboard: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    welcome: "ಸ್ವಾಗತ ರೈತರೆ!",
    sellFlowers: "ಹೂವುಗಳನ್ನು ಮಾರಾಟ ಮಾಡಿ",
    sellFlowersDesc: "ನಿಮ್ಮ ಮಲ್ಲಿಗೆ ಹೂಗಳನ್ನು ಮಾರಾಟಕ್ಕೆ ಪಟ್ಟಿ ಮಾಡಿ, ಬೆಲೆ ಮತ್ತು ಪ್ರಮಾಣವನ್ನು ಹೊಂದಿಸಿ.",
    hireLaborers: "ಕಾರ್ಮಿಕರನ್ನು ನೇಮಿಸಿ",
    hireLaborersDesc: "ನಿಮ್ಮ ಕೃಷಿಗೆ ನಿಪುಣ ಕಾರ್ಮಿಕರನ್ನು ಹುಡುಕಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.",
    forum: "ರೈತ ಫೋರಮ್",
    forumDesc: "ಚರ್ಚಿಸಿ, ಸಲಹೆ ಹಂಚಿಕೊಳ್ಳಿ, ಮತ್ತು ಇತರ ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",
    historicalPrices: "ಐತಿಹಾಸಿಕ ಬೆಲೆಗಳು",
    historicalPricesDesc: "ಹಿಂದಿನ ಋತುಗಳಲ್ಲಿ ಮಲ್ಲಿಗೆ ಹೂವಿನ ಬೆಲೆಗಳನ್ನು ನೋಡಿ.",
    priceCalculator: "ಬೆಲೆ ಗಣಕಯಂತ್ರ",
    priceCalculatorDesc: "ಪ್ರಮಾಣ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಹೂವಿನ ಬೆಲೆಯನ್ನು ಅಂದಾಜಿಸಿ.",
    marketplace: "ಮಾರ್ಕೆಟ್ & ಆರ್ಡರ್‍ಗಳು",
    marketplaceDesc: "ನಿಮ್ಮ ಆರ್ಡರ್‍ಗಳನ್ನು ನೋಡಿ ಮತ್ತು ವರ್ಚುವಲ್ ಮಾರ್ಕೆಟ್ ಅನ್ವೇಷಿಸಿ.",
    copyright: "© 2025 MalligeMitra. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    built: "ನಿರ್ಮಿಸಲಾಗಿದೆ ",
    by: "Team Regenesis",
    startDiscussion: "ಹೊಸ ಚರ್ಚೆ ಪ್ರಾರಂಭಿಸಿ...",
    postQuestion: "ಪ್ರಶ್ನೆ ಪೋಸ್ಟ್ ಮಾಡಿ",
    yourReply: "ನಿಮ್ಮ ಉತ್ತರ...",
    reply: "ಪ್ರತ್ಯುತ್ತರ",
    awaitingReplies: "ಪ್ರತ್ಯುತ್ತರಗಳಿಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ...",
    listNewItem: "ಹೊಸ ವಸ್ತು ಪಟ್ಟಿ ಮಾಡಿ",
    postListing: "ಪಟ್ಟಿ ಪೋಸ್ಟ್ ಮಾಡಿ",
    availableItems: "ಲಭ್ಯವಿರುವ ವಸ್ತುಗಳು",
    buyItem: "ವಸ್ತು ಖರೀದಿಸಿ",
    yourListing: "ನಿಮ್ಮ ಪಟ್ಟಿ",
    listedBy: "ಪಟ್ಟಿ ಮಾಡಿದವರು",
    itemPrice: "ಬೆಲೆ (₹)",
    itemName: "ವಸ್ತುವಿನ ಹೆಸರು",
    itemDescription: "ವಿವರಣೆ",
    uploadImage: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    noImage: "ಚಿತ್ರವಿಲ್ಲ",
    noItems: "ಮಾರ್ಕೆಟ್‍ಪ್ಲೇಸ್‌ನಲ್ಲಿ ಪ್ರಸ್ತುತ ಯಾವುದೇ ವಸ್ತುಗಳು ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.",
  }
} as const;

type LangKey = keyof typeof TEXT;


// --- Helper Components for Different Dashboard Sections ---

function SellFlowersForm({ t }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ variety: "Udupi Mallige", quantity: "", price: "" });
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  return submitted ? (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200 text-center">
      <h2 className="font-bold text-emerald-700 text-xl mb-4">Listing Submitted!</h2>
      <p className="text-neutral-700 text-sm mb-4">Your listing for {form.variety} ({form.quantity} atte) at ₹{form.price}/atte has been submitted.</p>
      <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded" onClick={() => setSubmitted(false)}>Add Another</button>
    </div>
  ) : (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
      <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.sellFlowers}</h2>
      <p className="text-neutral-700 text-sm mb-4">{t.sellFlowersDesc}</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Variety</label>
          <select name="variety" value={form.variety} onChange={handleChange} className="w-full p-2 border border-neutral-300 rounded-md shadow-sm">
            <option>Udupi Mallige</option>
            <option>Mangaluru Mallige</option>
            <option>Jaji Mallige</option>
            <option>Shankarpura Mallige</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Quantity (Atte)</label>
          <input name="quantity" type="number" value={form.quantity} onChange={handleChange} className="w-full p-2 border border-neutral-300 rounded-md shadow-sm" placeholder="Enter quantity" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Price per Atte (₹)</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full p-2 border border-neutral-300 rounded-md shadow-sm" placeholder="Enter price" required />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700">Submit Listing</button>
      </form>
    </div>
  );
}

function HireLaborers({ t }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ desc: "", date: "", count: "" });
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  return submitted ? (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200 text-center">
      <h2 className="font-bold text-emerald-700 text-xl mb-4">Request Submitted!</h2>
      <p className="text-neutral-700 text-sm mb-4">Your request for {form.count} laborers on {form.date} has been submitted.</p>
      <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded" onClick={() => setSubmitted(false)}>Request Another</button>
    </div>
  ) : (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
      <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.hireLaborers}</h2>
      <p className="text-neutral-700 text-sm mb-4">{t.hireLaborersDesc}</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Work Description</label>
          <input name="desc" type="text" value={form.desc} onChange={handleChange} className="w-full p-2 border border-neutral-300 rounded-md shadow-sm" placeholder="Describe the work" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Date Needed</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full p-2 border border-neutral-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Number of Laborers</label>
          <input name="count" type="number" value={form.count} onChange={handleChange} className="w-full p-2 border border-neutral-300 rounded-md shadow-sm" placeholder="e.g. 3" required />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700">Request Laborers</button>
      </form>
    </div>
  );
}

function FarmerForum({ t }) {
  const [posts, setPosts] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newReply, setNewReply] = useState({});

  useEffect(() => {
    const savedPosts = localStorage.getItem('farmerForumPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const savePosts = (updatedPosts) => {
    setPosts(updatedPosts);
    localStorage.setItem('farmerForumPosts', JSON.stringify(updatedPosts));
  };

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const newPost = {
        id: Date.now(),
        question: newQuestion.trim(),
        user: "Farmer (You)",
        timestamp: new Date().toLocaleString(),
        answers: [],
      };
      const updatedPosts = [newPost, ...posts];
      savePosts(updatedPosts);
      setNewQuestion("");
    }
  };

  const handlePostReply = (postId) => {
    const replyText = newReply[postId];
    if (replyText.trim()) {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          const newAnswer = {
            id: Date.now(),
            text: replyText.trim(),
            user: "Consultant", // Dummy user for replies
            timestamp: new Date().toLocaleString(),
          };
          return { ...post, answers: [...post.answers, newAnswer] };
        }
        return post;
      });
      savePosts(updatedPosts);
      setNewReply({ ...newReply, [postId]: '' });
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow border border-lime-200">
      <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.forum}</h2>
      <p className="text-neutral-700 text-sm mb-4">{t.forumDesc}</p>

      <form onSubmit={handlePostQuestion} className="bg-lime-50 p-4 rounded-lg shadow-inner mb-6">
        <label htmlFor="newQuestion" className="block text-sm font-medium text-neutral-700 mb-1">
          {t.startDiscussion}
        </label>
        <textarea
          id="newQuestion"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="w-full p-2 border border-neutral-300 rounded-md shadow-sm mb-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Ask a question or share advice..."
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition-colors"
        >
          {t.postQuestion}
        </button>
      </form>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-lime-100 p-6 rounded-xl shadow-md border border-lime-300">
            <div className="mb-4">
              <p className="font-bold text-lg text-emerald-800 break-words">{post.question}</p>
              <p className="text-xs text-neutral-500 mt-1">
                Posted by <span className="font-semibold">{post.user}</span> on {post.timestamp}
              </p>
            </div>

            <div className="space-y-3 pl-4 border-l-2 border-lime-400">
              {post.answers.length > 0 ? (
                post.answers.map((answer) => (
                  <div key={answer.id} className="bg-white p-3 rounded shadow-sm">
                    <p className="text-neutral-800 text-sm break-words">{answer.text}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      - Replied by <span className="font-semibold">{answer.user}</span> on {answer.timestamp}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-neutral-500 italic text-sm">{t.awaitingReplies}</div>
              )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handlePostReply(post.id); }} className="mt-4 pt-4 border-t border-neutral-200 space-y-2">
              <textarea
                value={newReply[post.id] || ''}
                onChange={(e) => setNewReply({ ...newReply, [post.id]: e.target.value })}
                className="w-full p-2 text-sm border border-neutral-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={t.yourReply}
                rows={2}
                required
              />
              <button
                type="submit"
                className="w-full py-2 px-4 text-sm bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition-colors"
              >
                {t.reply}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoricalPrices({ t }) {
  const prices = [
    { date: "2025-08-01", variety: "Udupi Mallige", price: 1200 },
    { date: "2025-07-28", variety: "Mangaluru Mallige", price: 1100 },
    { date: "2025-07-25", variety: "Jaji Mallige", price: 950 },
  ];
  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
      <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.historicalPrices}</h2>
      <p className="text-neutral-700 text-sm mb-4">{t.historicalPricesDesc}</p>
      <table className="w-full text-sm border border-lime-200 rounded">
        <thead>
          <tr className="bg-lime-50">
            <th className="p-2 border-b">Date</th>
            <th className="p-2 border-b">Variety</th>
            <th className="p-2 border-b">Price (₹/Atte)</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((row, i) => (
            <tr key={i}>
              <td className="p-2 border-b">{row.date}</td>
              <td className="p-2 border-b">{row.variety}</td>
              <td className="p-2 border-b">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const PriceCalculator = ({ t }) => {
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

// ---Marketplace Component with Listing and Buying functionality ---
const currentUser = "Anita";
const initialMarketplaceItems = [
  { id: 1, name: "Jasmine Flowers (1kg)", description: "Freshly picked flowers, perfect for bouquets and ceremonies.", price: 2500, image: "https://t3.ftcdn.net/jpg/04/00/40/25/360_F_400402540_r8fS61YtE0T4vK8mR711fR00A7D40XfL.jpg", seller: "A" },
  { id: 2, name: "Jasmine Thread (1 roll)", description: "Strong and biodegradable thread for stringing flowers.", price: 200, image: "https://5.imimg.com/data5/SELLER/Default/2021/7/CK/CL/AY/131065715/mallige-thread-500x500.jpg", seller: "Rajesh" },
];

function Marketplace({ t }) {
  const [items, setItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    image: null,
    seller: currentUser,
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Load items from local storage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('marketplaceItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(initialMarketplaceItems);
      localStorage.setItem('marketplaceItems', JSON.stringify(initialMarketplaceItems));
    }
  }, []);

  // Save items to local storage whenever the items state changes
  const saveItems = (updatedItems) => {
    setItems(updatedItems);
    localStorage.setItem('marketplaceItems', JSON.stringify(updatedItems));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setNewItem({ ...newItem, image: null });
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price && newItem.image) {
      const itemWithId = { ...newItem, id: Date.now() };
      const updatedItems = [itemWithId, ...items];
      saveItems(updatedItems);
      setNewItem({
        id: null,
        name: "",
        description: "",
        price: "",
        image: null,
        seller: currentUser,
      });
      setImagePreview(null);
      setShowAddForm(false);
    }
  };

  const handleBuyItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    saveItems(updatedItems);
    alert("Item purchased successfully!");
  };

  return (
    <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow border border-lime-200">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h2 className="font-bold text-emerald-700 text-3xl flex items-center gap-2">
            <FaStore /> {t.marketplace}
          </h2>
          <p className="text-neutral-700 text-sm mt-1">{t.marketplaceDesc}</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-emerald-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-emerald-700 transition-colors"
        >
          {showAddForm ? "Cancel" : t.listNewItem}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 p-6 bg-lime-50 rounded-lg border border-lime-200">
          <h3 className="font-semibold text-emerald-700 text-xl mb-4">{t.listNewItem}</h3>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">{t.itemName}</label>
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
                placeholder="e.g., Fresh Jasmine Flowers (10 Atte)"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">{t.itemDescription}</label>
              <textarea
                name="description"
                value={newItem.description}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
                rows="3"
                placeholder="Provide a detailed description of your item..."
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">{t.itemPrice}</label>
                <input
                  type="number"
                  name="price"
                  value={newItem.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-neutral-300 rounded-md"
                  placeholder="e.g., 1500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">{t.uploadImage}</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-neutral-700
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-emerald-50 file:text-emerald-700
                    hover:file:bg-emerald-100"
                  required
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Image Preview" className="h-24 w-24 object-cover rounded-md border border-neutral-300" />
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newItem.name || !newItem.price || !newItem.image}
            >
              {t.postListing}
            </button>
          </form>
        </div>
      )}

      <h3 className="font-semibold text-emerald-700 text-2xl mb-4">{t.availableItems}</h3>
      {items.length === 0 ? (
        <div className="text-center text-neutral-500 italic py-10">{t.noItems}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-lime-50 rounded-xl shadow-md overflow-hidden flex flex-col justify-between border border-lime-300">
              <div className="relative h-48 w-full bg-neutral-200">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full text-neutral-400">
                      <FaImage className="text-5xl" />
                      <span className="ml-2 mt-2">{t.noImage}</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex-grow">
                <h4 className="font-bold text-lg text-emerald-800 mb-1">{item.name}</h4>
                <p className="text-neutral-600 text-sm mb-2 line-clamp-2">{item.description || "No description provided."}</p>
                <div className="flex items-center text-lg font-bold text-emerald-600 mb-2">
                  <span className="text-sm mr-1">₹</span>
                  <span>{item.price}</span>
                </div>
              </div>
              <div className="p-4 border-t border-lime-200 flex flex-col gap-2">
                <button
                  onClick={() => handleBuyItem(item.id)}
                  className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={item.seller === currentUser}
                >
                  {item.seller === currentUser ? t.yourListing : t.buyItem}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// The main dashboard component that brings everything together
export default function FarmerDashboard() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState("marketplace");
  const t = TEXT["en"];

  const navItems = [
    { key: "priceCalculator", label: t.priceCalculator, icon: <FaCalculator /> },
    { key: "sellFlowers", label: t.sellFlowers, icon: <FaLeaf /> },
    { key: "hireLaborers", label: t.hireLaborers, icon: <FaUsers /> },
    { key: "forum", label: t.forum, icon: <FaComments /> },
    { key: "historicalPrices", label: t.historicalPrices, icon: <FaHistory /> },
    { key: "marketplace", label: t.marketplace, icon: <FaStore /> },
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

        <div className="flex-1 flex flex-col items-center justify-start px-8 py-8 gap-8">
            {active === "priceCalculator" && (
              <PriceCalculator t={t} />
            )}
            {active === "sellFlowers" && (
              <SellFlowersForm t={t} />
            )}
            {active === "hireLaborers" && (
              <HireLaborers t={t} />
            )}
            {active === "marketplace" && (
              <Marketplace t={t} />
            )}
            {active === "forum" && (
              <FarmerForum t={t} />
            )}
            {active === "historicalPrices" && (
              <HistoricalPrices t={t} />
            )}
        </div>
        <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
          <p className="mb-1 text-base font-semibold">{t.copyright}</p>
          <p className="text-xs">{t.built}<span className="text-pink-300">❤</span> {t.by}</p>
        </footer>
      </div>
    </main>
  );
}
