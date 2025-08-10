"use client";

import React, { useState, useEffect } from "react";
import { FaUserTie, FaFlask, FaMapMarkerAlt, FaChalkboardTeacher, FaHistory, FaCheckCircle, FaTimesCircle, FaCheck, FaTimes } from "react-icons/fa";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';

const TEXT = {
  en: {
    dashboard: "Dashboard",
    welcome: "Welcome, Consultant!",
    soilTest: "Soil Test Requests",
    soilTestDesc: "Review and approve soil test requests from farmers.",
    farmVisits: "Farm Visit Requests",
    farmVisitsDesc: "Manage and schedule requests for on-site farm visits.",
    trainingRequests: "Training Requests",
    trainingRequestsDesc: "View and approve training requests from laborers.",
    history: "Request History",
    historyDesc: "View a complete history of all requests you have handled.",
    copyright: "© 2025 MalligeMitra. All rights reserved.",
    built: "Built with ",
    by: "by Team Regenesis",
    requestDetails: "Request Details",
    farmer: "Farmer",
    location: "Location",
    requestDate: "Request Date",
    status: "Status",
    approve: "Approve",
    decline: "Decline",
    approved: "Approved",
    declined: "Declined",
    viewDetails: "View Details",
    description: "Description",
    trainingTopic: "Training Topic",
    requestedBy: "Requested By",
    noPendingRequests: "No pending requests at this time.",
    allRequests: "All Requests",
    pending: "Pending",
    pendingRequests: "Pending Requests",
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    welcome: "ಸ್ವಾಗತ ಸಲಹೆಗಾರರೆ!",
    soilTest: "ಮಣ್ಣು ಪರೀಕ್ಷೆಯ ವಿನಂತಿಗಳು",
    soilTestDesc: "ರೈತರಿಂದ ಬಂದ ಮಣ್ಣು ಪರೀಕ್ಷೆಯ ವಿನಂತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅನುಮೋದಿಸಿ.",
    farmVisits: "ಕೃಷಿಭೂಮಿ ಭೇಟಿಯ ವಿನಂತಿಗಳು",
    farmVisitsDesc: "ರೈತರಿಂದ ಬಂದ ಕೃಷಿಭೂಮಿ ಭೇಟಿಯ ವಿನಂತಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ನಿಗದಿಪಡಿಸಿ.",
    trainingRequests: "ತರಬೇತಿ ವಿನಂತಿಗಳು",
    trainingRequestsDesc: "ಕಾರ್ಮಿಕರಿಂದ ಬಂದ ತರಬೇತಿ ವಿನಂತಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ ಮತ್ತು ಅನುಮೋದಿಸಿ.",
    history: "ವಿನಂತಿಗಳ ಇತಿಹಾಸ",
    historyDesc: "ನೀವು ನಿರ್ವಹಿಸಿದ ಎಲ್ಲಾ ವಿನಂತಿಗಳ ಸಂಪೂರ್ಣ ಇತಿಹಾಸವನ್ನು ವೀಕ್ಷಿಸಿ.",
    copyright: "© 2025 MalligeMitra. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    built: "ನಿರ್ಮಿಸಲಾಗಿದೆ ",
    by: "Team Regenesis",
    requestDetails: "ವಿನಂತಿಯ ವಿವರಗಳು",
    farmer: "ರೈತ",
    location: "ಸ್ಥಳ",
    requestDate: "ವಿನಂತಿ ದಿನಾಂಕ",
    status: "ಸ್ಥಿತಿ",
    approve: "ಅನುಮೋದಿಸಿ",
    decline: "ನಿರಾಕರಿಸಿ",
    approved: "ಅನುಮೋದಿಸಲಾಗಿದೆ",
    declined: "ನಿರಾಕರಿಸಲಾಗಿದೆ",
    viewDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    description: "ವಿವರಣೆ",
    trainingTopic: "ತರಬೇತಿ ವಿಷಯ",
    requestedBy: "ವಿನಂತಿಸಿದವರು",
    noPendingRequests: "ಪ್ರಸ್ತುತ ಯಾವುದೇ ಬಾಕಿ ಇರುವ ವಿನಂತಿಗಳಿಲ್ಲ.",
    allRequests: "ಎಲ್ಲಾ ವಿನಂತಿಗಳು",
    pending: "ಬಾಕಿ ಇದೆ",
    pendingRequests: "ಬಾಕಿ ಇರುವ ವಿನಂತಿಗಳು",
  }
} as const;

type RequestStatus = "Pending" | "Approved" | "Declined";

interface Request {
  id: number;
  type: string;
  requester: string;
  details: string;
  date: string;
  status: RequestStatus;
  location?: string;
  contact?: string;
}

const initialRequests: Request[] = [
  { id: 1, type: "Soil Test", requester: "Ramesh H", details: "Urgent test for low yield plot.", date: "2025-08-04", status: "Pending", location: "Udupi" },
  { id: 2, type: "Farm Visit", requester: "Sunitha P", details: "Pest identification and control guidance.", date: "2025-08-05", status: "Pending", location: "Mangaluru" },
  { id: 3, type: "Training", requester: "Kumar S", details: "Request for advanced pruning training.", date: "2025-08-06", status: "Pending" },
  { id: 4, type: "Farm Visit", requester: "Prakash V", details: "Guidance on new irrigation system installation.", date: "2025-07-28", status: "Approved", location: "Kundapura" },
  { id: 5, type: "Soil Test", requester: "Lalitha M", details: "Routine soil check for nutrient balance.", date: "2025-07-29", status: "Declined", location: "Karkala" },
];

// --- Helper Component: Request Card ---
const RequestCard = ({ request, t, onUpdateStatus, showActionButtons = true }: { request: Request, t: any, onUpdateStatus: (id: number, status: RequestStatus) => void, showActionButtons?: boolean }) => {
  const [showDetails, setShowDetails] = useState(false);
  const statusColor = request.status === "Approved" ? "bg-green-100 text-green-800" : request.status === "Declined" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800";

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-neutral-200">
      <div className="flex justify-between items-center">
        <div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${statusColor}`}>{t[request.status.toLowerCase()]}</span>
          <h3 className="font-bold text-emerald-800 mt-2">{request.type} Request</h3>
          <p className="text-sm text-neutral-600">from <span className="font-semibold">{request.requester}</span></p>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-500">{t.requestDate}: {request.date}</p>
          <button onClick={() => setShowDetails(!showDetails)} className="text-sm text-emerald-600 hover:underline mt-1">{showDetails ? "Hide Details" : t.viewDetails}</button>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 p-4 bg-lime-50 rounded-lg border border-lime-200 text-sm">
          <p className="font-semibold text-neutral-700">{t.description}:</p>
          <p className="text-neutral-600 mb-2">{request.details}</p>
          {request.location && (
            <p><span className="font-semibold text-neutral-700">{t.location}:</span> {request.location}</p>
          )}
        </div>
      )}

      {showActionButtons && request.status === "Pending" && (
        <div className="mt-4 flex space-x-2">
          <button onClick={() => onUpdateStatus(request.id, "Approved")} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
            <FaCheck /> {t.approve}
          </button>
          <button onClick={() => onUpdateStatus(request.id, "Declined")} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
            <FaTimes /> {t.decline}
          </button>
        </div>
      )}
    </div>
  );
};


// --- Main Dashboard Component ---
export default function ConsultantDashboard() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [requests, setRequests] = useState<Request[]>([]);
  const t = TEXT["en"];

  useEffect(() => {
    const savedRequests = localStorage.getItem('consultantRequests');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      setRequests(initialRequests);
    }
  }, []);

  const updateRequestStatus = (id: number, status: RequestStatus) => {
    const updatedRequests = requests.map(req => 
      req.id === id ? { ...req, status } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('consultantRequests', JSON.stringify(updatedRequests));
  };
  
  const pendingRequests = requests.filter(req => req.status === "Pending");
  const requestHistory = requests.filter(req => req.status !== "Pending");

  const navItems = [
    { key: "dashboard", label: t.dashboard, icon: <FaUserTie /> },
    { key: "soilTest", label: t.soilTest, icon: <FaFlask /> },
    { key: "farmVisits", label: t.farmVisits, icon: <FaMapMarkerAlt /> },
    { key: "trainingRequests", label: t.trainingRequests, icon: <FaChalkboardTeacher /> },
    { key: "history", label: t.history, icon: <FaHistory /> },
  ];

  return (
    <main className="font-sans text-neutral-900 bg-gradient-to-br from-lime-100 via-emerald-50 to-white min-h-screen flex flex-row">
      <aside className="h-screen w-20 bg-gradient-to-b from-emerald-700 via-lime-600 to-green-700 text-white flex flex-col items-center py-6 gap-4 shadow-xl fixed left-0 top-0 z-20">
        <img src="/icon.jpg" alt="MalligeMitra Logo" className="h-10 w-10 rounded-full object-cover mb-2" />
        {navItems.map(item => (
          <button key={item.key} className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-200 hover:bg-lime-600 focus:outline-none ${active === item.key ? "bg-lime-400 text-emerald-900" : ""}`} onClick={() => setActive(item.key)} aria-label={item.label}>
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        ))}
      </aside>

      <div className="flex-1 flex flex-col ml-20 min-h-screen">
        <div className="w-full bg-white/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-8 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/consultancy.jpg" alt="Consultant" className="h-14 w-14 object-cover rounded-full shadow border-4 border-lime-200" />
            <div>
              <h1 className="font-extrabold text-emerald-800 text-2xl md:text-3xl drop-shadow-lg">{t.welcome}</h1>
              <span className="font-bold text-base text-emerald-700">MalligeMitra</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GoogleTranslateWidgetBlended />
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border-2 border-white shadow cursor-pointer" onClick={() => setProfileOpen((open) => !open)} aria-label="Profile">
              <svg viewBox="0 0 32 32" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="12" r="6" fill="#d1fae5" stroke="#059669" strokeWidth="2" /><path d="M6 26c0-4.418 4.477-8 10-8s10 3.582 10 8" stroke="#059669" strokeWidth="2" fill="#d1fae5" /></svg>
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
            <div className="w-full max-w-4xl">
              <h2 className="font-bold text-emerald-700 text-2xl mb-4 flex items-center gap-2">
                <FaCheckCircle /> {t.pendingRequests}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map(req => (
                    <RequestCard key={req.id} request={req} t={t} onUpdateStatus={updateRequestStatus} />
                  ))
                ) : (
                  <div className="p-6 bg-white rounded-lg shadow-md border col-span-full text-center text-neutral-500 italic">
                    {t.noPendingRequests}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {active === "soilTest" && (
            <div className="w-full max-w-4xl">
              <h2 className="font-bold text-emerald-700 text-2xl mb-4 flex items-center gap-2">
                <FaFlask /> {t.soilTest}
              </h2>
              <p className="text-neutral-600 text-sm mb-6">{t.soilTestDesc}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingRequests.filter(req => req.type === "Soil Test").length > 0 ? (
                  pendingRequests.filter(req => req.type === "Soil Test").map(req => (
                    <RequestCard key={req.id} request={req} t={t} onUpdateStatus={updateRequestStatus} />
                  ))
                ) : (
                  <div className="p-6 bg-white rounded-lg shadow-md border col-span-full text-center text-neutral-500 italic">
                    {t.noPendingRequests}
                  </div>
                )}
              </div>
            </div>
          )}

          {active === "farmVisits" && (
            <div className="w-full max-w-4xl">
              <h2 className="font-bold text-emerald-700 text-2xl mb-4 flex items-center gap-2">
                <FaMapMarkerAlt /> {t.farmVisits}
              </h2>
              <p className="text-neutral-600 text-sm mb-6">{t.farmVisitsDesc}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingRequests.filter(req => req.type === "Farm Visit").length > 0 ? (
                  pendingRequests.filter(req => req.type === "Farm Visit").map(req => (
                    <RequestCard key={req.id} request={req} t={t} onUpdateStatus={updateRequestStatus} />
                  ))
                ) : (
                  <div className="p-6 bg-white rounded-lg shadow-md border col-span-full text-center text-neutral-500 italic">
                    {t.noPendingRequests}
                  </div>
                )}
              </div>
            </div>
          )}

          {active === "trainingRequests" && (
            <div className="w-full max-w-4xl">
              <h2 className="font-bold text-emerald-700 text-2xl mb-4 flex items-center gap-2">
                <FaChalkboardTeacher /> {t.trainingRequests}
              </h2>
              <p className="text-neutral-600 text-sm mb-6">{t.trainingRequestsDesc}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingRequests.filter(req => req.type === "Training").length > 0 ? (
                  pendingRequests.filter(req => req.type === "Training").map(req => (
                    <RequestCard key={req.id} request={req} t={t} onUpdateStatus={updateRequestStatus} />
                  ))
                ) : (
                  <div className="p-6 bg-white rounded-lg shadow-md border col-span-full text-center text-neutral-500 italic">
                    {t.noPendingRequests}
                  </div>
                )}
              </div>
            </div>
          )}

          {active === "history" && (
            <div className="w-full max-w-4xl">
              <h2 className="font-bold text-emerald-700 text-2xl mb-4 flex items-center gap-2">
                <FaHistory /> {t.history}
              </h2>
              <p className="text-neutral-600 text-sm mb-6">{t.historyDesc}</p>
              <div className="flex flex-col gap-6">
                {requestHistory.length > 0 ? (
                  requestHistory.map(req => (
                    <RequestCard key={req.id} request={req} t={t} onUpdateStatus={updateRequestStatus} showActionButtons={false} />
                  ))
                ) : (
                  <div className="p-6 bg-white rounded-lg shadow-md border col-span-full text-center text-neutral-500 italic">
                    No past requests found.
                  </div>
                )}
              </div>
            </div>
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
