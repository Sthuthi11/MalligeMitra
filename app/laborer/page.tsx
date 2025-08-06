"use client";
import React, { useState, useEffect, useRef } from "react";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';
import { FaUserCog, FaClipboardList, FaChalkboardTeacher, FaStore, FaTasks, FaTimes, FaCamera, FaCheckCircle } from "react-icons/fa";

const TEXT = {
  en: {
    dashboard: "Laborer Dashboard",
    welcome: "Welcome, Laborer! ",
    listSkills: "List Yourself & Skills",
    listSkillsDesc: "Add your profile and skills to get hired by farmers.",
    pickJobs: "Pick Jobs",
    pickJobsDesc: "Browse and select jobs you want to do on the platform.",
    requestTraining: "Request Training",
    requestTrainingDesc: "Browse available programs or request specific training.",
    marketplace: "Marketplace",
    marketplaceDesc: "Explore the virtual marketplace for labor opportunities.",
    wagesAndSalary: "Wages & Salary",
    wagesAndSalaryDesc: "View your payment history for completed and pending jobs.",
    activeWorks: "Active Works",
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
    requestTrainingDesc: "ಲಭ್ಯವಿರುವ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ ಅಥವಾ ನಿರ್ದಿಷ್ಟ ತರಬೇತಿಯನ್ನು ವಿನಂತಿಸಿ.",
    marketplace: "ಮಾರ್ಕೆಟ್",
    marketplaceDesc: "ಕಾರ್ಮಿಕ ಅವಕಾಶಗಳ ವರ್ಚುವಲ್ ಮಾರ್ಕೆಟ್ ಅನ್ವೇಷಿಸಿ.",
    wagesAndSalary: "ವೇತನ ಮತ್ತು ಸಂಬಳ",
    wagesAndSalaryDesc: "ಪೂರ್ಣಗೊಂಡ ಮತ್ತು ಬಾಕಿ ಇರುವ ಕೆಲಸಗಳಿಗಾಗಿ ನಿಮ್ಮ ಪಾವತಿ ಇತಿಹಾಸವನ್ನು ವೀಕ್ಷಿಸಿ.",
    activeWorks: "ಸಕ್ರಿಯ ಕೆಲಸಗಳು",
    copyright: "© 2025 MalligeMitra. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    built: "ನಿರ್ಮಿಸಲಾಗಿದೆ ",
    by: "Team Regenesis"
  }
} as const;

type LangKey = keyof typeof TEXT;

// --- Helper Component 1: Profile Preview Modal ---
const ProfilePreviewModal = ({ profile, onClose }: { profile: any, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 transition-colors" aria-label="Close">
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold text-emerald-800 text-center mb-6">Profile Preview</h2>
        <div className="flex flex-col items-center">
          <img src={profile.imagePreviewUrl || "/laborerimg.jpg"} alt="Profile Preview" className="h-32 w-32 object-cover rounded-full shadow-lg border-4 border-lime-200 mb-4" />
          <h3 className="text-xl font-bold text-neutral-800">{profile.name || "Your Name"}</h3>
          <p className="text-neutral-500">{profile.location || "Your Location"}</p>
          <p className="text-emerald-700 font-semibold">{profile.phone || "Your Phone Number"}</p>
        </div>
        <hr className="my-6" />
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-neutral-700">Experience</h4>
            <p>{profile.experience ? `${profile.experience} years` : "Not specified"}</p>
          </div>
          <div>
            <h4 className="font-bold text-neutral-700">Skills</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.skills.length > 0 ? (
                profile.skills.map((skill: string) => (
                  <span key={skill} className="bg-lime-200 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full">{skill}</span>
                ))
              ) : (
                <p className="text-neutral-500">No skills listed.</p>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-neutral-700">About Me</h4>
            <p className="text-neutral-600 italic">"{profile.bio || "No bio provided."}"</p>
          </div>
        </div>
        <button onClick={onClose} className="w-full mt-6 py-2 px-4 text-sm font-medium text-neutral-700 bg-neutral-100 border border-neutral-300 rounded-md hover:bg-neutral-200">Close Preview</button>
      </div>
       <style jsx>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

// --- Helper Component 2: The form to list skills ---
const ListSkillsForm = ({ t }: { t: any }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  const availableSkills = [ "Soil Preparation", "Planting", "Weeding", "Pruning", "Manuring", "Fertilizing", "Pest Control", "Flower Picking", "Sorting", "Grading", "Stringing Flowers (Chendu)", "Packing", "Weighing", "Irrigation", "Greenhouse Work", "Disease Identification", "Driving", "Loading & Unloading", "Delivery" ];
  
  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    messageBox.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto">
            <p class="text-lg font-semibold text-gray-800 mb-4">Profile Updated Successfully!</p>
            <button id="close-popup" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md shadow-md">OK</button>
        </div>
    `;
    document.body.appendChild(messageBox);
    document.getElementById('close-popup')?.addEventListener('click', () => messageBox.remove());
  };

  return (
    <>
      <form onSubmit={handleUpdate} className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-lime-200 space-y-6">
        <h2 className="font-bold text-emerald-800 text-2xl mb-2">{t.listSkills}</h2>
        <p className="text-neutral-600 text-sm mb-4">{t.listSkillsDesc}</p>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img src={imagePreviewUrl || "/laborerimg.jpg"} alt="Profile" className="h-24 w-24 object-cover rounded-full shadow-md border-4 border-white" />
            <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors">
              <FaCamera />
              <input id="profile-image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Full Name</label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full p-2 border border-neutral-300 rounded-md" required />
              </div>
              <div>
                  <label htmlFor="location" className="block text-sm font-medium text-neutral-700">Location (e.g., Udupi)</label>
                  <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="mt-1 w-full p-2 border border-neutral-300 rounded-md" />
              </div>
              <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">Phone Number</label>
                  <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 w-full p-2 border border-neutral-300 rounded-md" required />
              </div>
              <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-neutral-700">Years of Experience</label>
                  <input type="number" id="experience" value={experience} onChange={e => setExperience(e.target.value)} className="mt-1 w-full p-2 border border-neutral-300 rounded-md" />
              </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Select Your Skills</label>
          <div className="p-3 bg-lime-50 rounded-lg border border-lime-200">
            <p className="text-xs text-neutral-600 mb-3">Your selected skills will appear here:</p>
            <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
              {selectedSkills.length > 0 ? (
                selectedSkills.map(skill => (
                  <span key={skill} className="flex items-center bg-emerald-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {skill}
                    <button type="button" onClick={() => handleSkillToggle(skill)} className="ml-2 text-emerald-100 hover:text-white">
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-sm text-neutral-400 p-1">Select skills from the list below...</span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {availableSkills.map(skill => (
              <button
                type="button"
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  selectedSkills.includes(skill)
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                    : 'bg-white border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
            <label htmlFor="bio" className="block text-sm font-medium text-neutral-700">Short Bio / About Me</label>
            <textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="Describe your work experience and what you do best." className="mt-1 w-full p-2 border border-neutral-300 rounded-md"></textarea>
        </div>

        <div className="flex items-center space-x-4 pt-4 border-t">
          <button type="submit" className="flex-1 py-3 px-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow">Update Profile</button>
          <button type="button" onClick={() => setIsPreviewModalOpen(true)} className="flex-1 py-3 px-4 bg-neutral-100 text-neutral-800 font-bold rounded-lg border border-neutral-300 hover:bg-neutral-200 transition-colors">Preview</button>
        </div>
      </form>
      {isPreviewModalOpen && <ProfilePreviewModal profile={{name, location, phone, experience, skills: selectedSkills, bio, imagePreviewUrl}} onClose={() => setIsPreviewModalOpen(false)} />}
    </>
  );
};

// --- Helper Component 3: The Wages & Salary Section ---
const WagesSalarySection = ({ t }: { t: any }) => {
  const [activePopupId, setActivePopupId] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const paymentsData = [ { id: 1, workDescription: "Harvesting at Farm A", date: "2025-08-04", amount: 1500, status: "Received", breakdown: { basePay: 1200, bonus: 300, deductions: 0 }, }, { id: 2, workDescription: "Weeding and Pruning at Farm C", date: "2025-08-06", amount: 950, status: "Pending", breakdown: { basePay: 950, bonus: 0, deductions: 0 }, }, { id: 3, workDescription: "Packing and Transport", date: "2025-07-28", amount: 700, status: "Received", breakdown: { basePay: 750, bonus: 0, deductions: 50 }, }, ];
  useEffect(() => { function handleClickOutside(event: MouseEvent) { if (popupRef.current && !popupRef.current.contains(event.target as Node)) { setActivePopupId(null); } } document.addEventListener("mousedown", handleClickOutside); return () => { document.removeEventListener("mousedown", handleClickOutside); }; }, [popupRef]);
  return (
    <div className="w-full max-w-2xl">
      <h2 className="font-bold text-emerald-700 text-xl mb-2">{t.wagesAndSalary}</h2>
      <p className="text-neutral-600 text-sm mb-6">{t.wagesAndSalaryDesc}</p>
      <div className="flex flex-col gap-4">
        {paymentsData .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) .map((payment) => (
          <div key={payment.id} className="relative">
            <button onClick={() => setActivePopupId(activePopupId === payment.id ? null : payment.id)} className="w-full bg-white p-4 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 flex items-center justify-between">
              <div><p className="font-bold text-emerald-800">{payment.workDescription}</p><p className="text-sm text-neutral-600">Date: {payment.date}</p></div>
              <div className="text-right"><p className="font-bold text-lg text-neutral-800">₹{payment.amount}</p><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ payment.status === 'Received' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800' }`}>{payment.status}</span></div>
            </button>
            {activePopupId === payment.id && (
              <div ref={popupRef} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-white p-4 rounded-lg shadow-2xl border z-10 animate-fade-in-up">
                <h4 className="font-bold text-center mb-2">Wages Breakdown</h4>
                <div className="text-sm space-y-1"><div className="flex justify-between"><span>Base Pay:</span> <span>₹{payment.breakdown.basePay}</span></div><div className="flex justify-between"><span>Bonus:</span> <span>₹{payment.breakdown.bonus}</span></div><div className="flex justify-between text-red-600"><span>Deductions:</span> <span>- ₹{payment.breakdown.deductions}</span></div><hr className="my-1"/><div className="flex justify-between font-bold text-emerald-700"><span>Total:</span> <span>₹{payment.amount}</span></div></div>
              </div>
            )}
          </div>
        ))}
      </div>
       <style jsx>{` @keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.2s ease-out forwards; } `}</style>
    </div>
  );
};

// --- Helper Component 4: The Request Training Section ---
const RequestTrainingSection = ({ t }: { t: any }) => {
  const availableTrainings = [ { id: 1, title: "Advanced Pruning & Plant Care", provider: "Krishi Vigyan Kendra, Mangaluru", duration: "2 Days", description: "Learn techniques for effective pruning to increase flower yield and plant health." }, { id: 2, title: "Natural Pest Control Methods", provider: "Local Farmer's Cooperative", duration: "1 Day Workshop", description: "Hands-on training for creating and using organic pesticides for jasmine plants." } ];
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const handleOptIn = (trainingTitle: string) => {
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    messageBox.innerHTML = ` <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto"> <p class="text-lg font-semibold text-gray-800 mb-4">Successfully Registered!</p> <p class="text-gray-600 mb-4">You have opted for the "${trainingTitle}" training. You will be contacted with more details soon.</p> <button id="close-popup" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md shadow-md">OK</button> </div> `;
    document.body.appendChild(messageBox);
    document.getElementById('close-popup')?.addEventListener('click', () => messageBox.remove());
  };
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    messageBox.innerHTML = ` <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto"> <p class="text-lg font-semibold text-gray-800 mb-4">Request Submitted!</p> <p class="text-gray-600 mb-4">Your request for training on "${topic}" has been sent to the administrators.</p> <button id="close-popup" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md shadow-md">OK</button> </div> `;
    document.body.appendChild(messageBox);
    document.getElementById('close-popup')?.addEventListener('click', () => messageBox.remove());
    setTopic("");
    setNotes("");
  };
  return (
    <div className="w-full max-w-4xl">
      <h2 className="font-bold text-emerald-800 text-2xl mb-2">{t.requestTraining}</h2>
      <p className="text-neutral-600 text-sm mb-6">{t.requestTrainingDesc}</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-lg text-neutral-800">Available Programs</h3>
          {availableTrainings.map(training => (
            <div key={training.id} className="bg-white p-6 rounded-xl shadow border border-lime-200">
              <h4 className="font-bold text-emerald-700">{training.title}</h4>
              <p className="text-xs text-neutral-500 my-1"><span className="font-semibold">Provider:</span> {training.provider} | <span className="font-semibold">Duration:</span> {training.duration}</p>
              <p className="text-sm text-neutral-700 mt-2">{training.description}</p>
              <button onClick={() => handleOptIn(training.title)} className="mt-4 py-2 px-5 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow">Opt for Training</button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-lime-200 sticky top-28">
            <h3 className="font-semibold text-lg text-neutral-800 mb-4">Request a Training</h3>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div><label htmlFor="topic" className="block text-sm font-medium text-neutral-700">Training Topic</label><input type="text" id="topic" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Advanced Soil Testing" className="mt-1 w-full p-2 border border-neutral-300 rounded-md" required /></div>
              <div><label htmlFor="notes" className="block text-sm font-medium text-neutral-700">Additional Notes (Optional)</label><textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={4} placeholder="Describe what you want to learn." className="mt-1 w-full p-2 border border-neutral-300 rounded-md"></textarea></div>
              <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Dashboard Component ---
export default function LaborerDashboard() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  // Use English text for nav and content, Google Translate widget will handle translation
  const t = TEXT["en"];
  const navItems = [
    { key: "dashboard", label: t.dashboard, icon: <FaUserCog /> },
    { key: "listSkills", label: t.listSkills, icon: <FaClipboardList /> },
    { key: "requestTraining", label: t.requestTraining, icon: <FaChalkboardTeacher /> },
    { key: "wagesSalary", label: t.wagesAndSalary, icon: <FaTasks /> },
    { key: "marketplace", label: t.marketplace, icon: <FaStore /> },
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
            <img src="/laborerimg.jpg" alt="Laborer" className="h-14 w-14 object-cover rounded-full shadow border-4 border-lime-200" />
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
            <div className="w-full max-w-2xl">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.activeWorks}</h2>
              <div className="flex flex-col gap-6">
                <div className="bg-white p-6 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 w-full">
                  <div className="flex flex-col gap-2"><span className="font-bold text-emerald-700">Order ID: 001</span><span className="text-neutral-700 text-sm">Duration: 3 days</span><span className="text-neutral-700 text-sm">Description: Harvesting at Farm A - Help with picking and sorting flowers.</span><span className="mt-2 bg-lime-200 text-emerald-800 px-4 py-2 rounded text-sm font-semibold self-end">Available</span></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 w-full">
                  <div className="flex flex-col gap-2"><span className="font-bold text-emerald-700">Order ID: 002</span><span className="text-neutral-700 text-sm">Duration: 1 day</span><span className="text-neutral-700 text-sm">Description: Weeding at Farm B - Remove weeds from flower beds.</span><span className="mt-2 bg-gray-300 text-gray-600 px-4 py-2 rounded text-sm font-semibold self-end cursor-not-allowed">Completed</span></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 w-full">
                  <div className="flex flex-col gap-2"><span className="font-bold text-emerald-700">Order ID: 003</span><span className="text-neutral-700 text-sm">Duration: 2 days</span><span className="text-neutral-700 text-sm">Description: Transporting Flowers - Assist with packing and delivery.</span><span className="mt-2 bg-lime-200 text-emerald-800 px-4 py-2 rounded text-sm font-semibold self-end">Available</span></div>
                </div>
              </div>
            </div>
          )}
          
          {active === "listSkills" && (
            <ListSkillsForm t={t} />
          )}

          {active === "requestTraining" && (
            <RequestTrainingSection t={t} />
          )}
          
          {active === "wagesSalary" && (
            <WagesSalarySection t={t} />
          )}

          {active === "marketplace" && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
              <h2 className="font-bold text-emerald-700 text-xl mb-4">{t.marketplace}</h2>
              <p className="text-neutral-700 text-sm mb-4">{t.marketplaceDesc}</p>
              <div className="text-center text-neutral-400">[Marketplace Coming Soon]</div>
            </div>
          )}
        </div>

        <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
          <p className="mb-1 text-base font-semibold">{t.copyright}</p>
          <p className="text-xs">{t.built}<span className="text-pink-300">❤️</span> {t.by}</p>
        </footer>
      </div>
    </main>
  );
}