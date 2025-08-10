"use client";

import React, { useState, useEffect, useRef } from "react";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';
import { FaUserCog, FaClipboardList, FaChalkboardTeacher, FaTasks, FaTimes, FaCamera, FaCheckCircle, FaHandsHelping } from "react-icons/fa";

const TEXT = {
  en: {
    dashboard: "Dashboard",
    welcome: "Welcome, Laborer!",
    listSkills: "My Profile",
    listSkillsDesc: "Add your profile and skills to get hired by farmers.",
    pickJobs: "Pick Jobs",
    pickJobsDesc: "Browse and select jobs you want to do on the platform.",
    requestTraining: "Request Training",
    requestTrainingDesc: "Browse available programs or request specific training.",
    wagesAndSalary: "Wages & Salary",
    wagesAndSalaryDesc: "View your payment history for completed and pending jobs.",
    activeWorks: "Active Works",
    copyright: "© 2025 MalligeMitra. All rights reserved.",
    built: "Built with ",
    by: "by Team Regenesis",
    profilePreview: "Profile Preview",
    yourName: "Your Name",
    yourLocation: "Your Location",
    yourPhone: "Your Phone Number",
    yearsExperience: "Experience",
    notSpecified: "Not specified",
    skills: "Skills",
    noSkills: "No skills listed.",
    aboutMe: "About Me",
    noBio: "No bio provided.",
    closePreview: "Close Preview",
    fullName: "Full Name",
    locationPlaceholder: "e.g., Udupi",
    phoneNumber: "Phone Number",
    yearsOfExperience: "Years of Experience",
    selectSkills: "Select Your Skills",
    skillsPlaceholder: "Your selected skills will appear here...",
    shortBio: "Short Bio / About Me",
    bioPlaceholder: "Describe your work experience and what you do best.",
    updateProfile: "Update Profile",
    availablePrograms: "Available Programs",
    optForTraining: "Opt for Training",
    requestTrainingTitle: "Request a Training",
    trainingTopic: "Training Topic",
    requestTrainingPlaceholder: "e.g., Advanced Soil Testing",
    additionalNotes: "Additional Notes (Optional)",
    notesPlaceholder: "Describe what you want to learn.",
    submitRequest: "Submit Request",
    wagesBreakdown: "Wages Breakdown",
    basePay: "Base Pay",
    bonus: "Bonus",
    deductions: "Deductions",
    total: "Total",
    received: "Received",
    pending: "Pending",
    availableJobs: "Available Jobs",
    jobDescription: "Job Description",
    applyNow: "Apply Now",
    applied: "Applied",
    noJobs: "No jobs are currently available.",
    profileUpdated: "Profile Updated Successfully!",
    requestSubmitted: "Request Submitted!",
    successfullyRegistered: "Successfully Registered!",
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    welcome: "ಸ್ವಾಗತ ಕಾರ್ಮಿಕರೆ!",
    listSkills: "ನನ್ನ ಪ್ರೊಫೈಲ್",
    listSkillsDesc: "ರೈತರು ನೇಮಿಸಲು ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಕೌಶಲ್ಯಗಳನ್ನು ಸೇರಿಸಿ.",
    pickJobs: "ಕೆಲಸಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    pickJobsDesc: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನಲ್ಲಿ ನೀವು ಮಾಡಲು ಬಯಸುವ ಕೆಲಸಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಆಯ್ಕೆಮಾಡಿ.",
    requestTraining: "ಪ್ರಶಿಕ್ಷಣ ಕೇಳಿ",
    requestTrainingDesc: "ಲಭ್ಯವಿರುವ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ ಅಥವಾ ನಿರ್ದಿಷ್ಟ ತರಬೇತಿಯನ್ನು ವಿನಂತಿಸಿ.",
    wagesAndSalary: "ವೇತನ ಮತ್ತು ಸಂಬಳ",
    wagesAndSalaryDesc: "ಪೂರ್ಣಗೊಂಡ ಮತ್ತು ಬಾಕಿ ಇರುವ ಕೆಲಸಗಳಿಗಾಗಿ ನಿಮ್ಮ ಪಾವತಿ ಇತಿಹಾಸವನ್ನು ವೀಕ್ಷಿಸಿ.",
    activeWorks: "ಸಕ್ರಿಯ ಕೆಲಸಗಳು",
    copyright: "© 2025 MalligeMitra. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    built: "ನಿರ್ಮಿಸಲಾಗಿದೆ ",
    by: "Team Regenesis",
    profilePreview: "ಪ್ರೊಫೈಲ್ ಪೂರ್ವವೀಕ್ಷಣೆ",
    yourName: "ನಿಮ್ಮ ಹೆಸರು",
    yourLocation: "ನಿಮ್ಮ ಸ್ಥಳ",
    yourPhone: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆ",
    yearsExperience: "ಅನುಭವ",
    notSpecified: "ನಿರ್ದಿಷ್ಟಪಡಿಸಿಲ್ಲ",
    skills: "ಕೌಶಲ್ಯಗಳು",
    noSkills: "ಯಾವುದೇ ಕೌಶಲ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.",
    aboutMe: "ನನ್ನ ಬಗ್ಗೆ",
    noBio: "ಯಾವುದೇ ಬಯೋ ಇಲ್ಲ.",
    closePreview: "ಪೂರ್ವವೀಕ್ಷಣೆ ಮುಚ್ಚಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    locationPlaceholder: "ಉದಾ. ಉಡುಪಿ",
    phoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ",
    yearsOfExperience: "ಅನುಭವದ ವರ್ಷಗಳು",
    selectSkills: "ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    skillsPlaceholder: "ನಿಮ್ಮ ಆಯ್ಕೆ ಮಾಡಿದ ಕೌಶಲ್ಯಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ...",
    shortBio: "ಚಿಕ್ಕ ಬಯೋ / ನನ್ನ ಬಗ್ಗೆ",
    bioPlaceholder: "ನಿಮ್ಮ ಕೆಲಸದ ಅನುಭವ ಮತ್ತು ನೀವು ಏನನ್ನು ಉತ್ತಮವಾಗಿ ಮಾಡುತ್ತೀರಿ ಎಂದು ವಿವರಿಸಿ.",
    updateProfile: "ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ",
    availablePrograms: "ಲಭ್ಯವಿರುವ ಕಾರ್ಯಕ್ರಮಗಳು",
    optForTraining: "ತರಬೇತಿ ಆಯ್ಕೆಮಾಡಿ",
    requestTrainingTitle: "ತರಬೇತಿಯನ್ನು ವಿನಂತಿಸಿ",
    trainingTopic: "ತರಬೇತಿ ವಿಷಯ",
    requestTrainingPlaceholder: "ಉದಾ. ಸುಧಾರಿತ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ",
    additionalNotes: "ಹೆಚ್ಚುವರಿ ಟಿಪ್ಪಣಿಗಳು (ಐಚ್ಛಿಕ)",
    notesPlaceholder: "ನೀವು ಏನನ್ನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ ಎಂದು ವಿವರಿಸಿ.",
    submitRequest: "ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಿ",
    wagesBreakdown: "ವೇತನದ ವಿವರಗಳು",
    basePay: "ಮೂಲ ವೇತನ",
    bonus: "ಬೋನಸ್",
    deductions: "ಕಡಿತಗಳು",
    total: "ಒಟ್ಟು",
    received: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
    pending: "ಬಾಕಿ ಇದೆ",
    availableJobs: "ಲಭ್ಯವಿರುವ ಕೆಲಸಗಳು",
    jobDescription: "ಕೆಲಸದ ವಿವರಣೆ",
    applyNow: "ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    applied: "ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    noJobs: "ಪ್ರಸ್ತುತ ಯಾವುದೇ ಕೆಲಸಗಳು ಲಭ್ಯವಿಲ್ಲ.",
    profileUpdated: "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!",
    requestSubmitted: "ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಲಾಗಿದೆ!",
    successfullyRegistered: "ಯಶಸ್ವಿಯಾಗಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ!",
  }
} as const;

type LangKey = keyof typeof TEXT;

// --- Helper Component 1: Profile Preview Modal ---
const ProfilePreviewModal = ({ profile, onClose, t }: { profile: any, onClose: () => void, t: any }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 transition-colors" aria-label="Close">
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold text-emerald-800 text-center mb-6">{t.profilePreview}</h2>
        <div className="flex flex-col items-center">
          <img src={profile.imagePreviewUrl || "/laborerimg.jpg"} alt="Profile Preview" className="h-32 w-32 object-cover rounded-full shadow-lg border-4 border-lime-200 mb-4" />
          <h3 className="text-xl font-bold text-neutral-800">{profile.name || t.yourName}</h3>
          <p className="text-neutral-500">{profile.location || t.yourLocation}</p>
          <p className="text-emerald-700 font-semibold">{profile.phone || t.yourPhone}</p>
        </div>
        <hr className="my-6" />
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-neutral-700">{t.yearsExperience}</h4>
            <p>{profile.experience ? `${profile.experience} years` : t.notSpecified}</p>
          </div>
          <div>
            <h4 className="font-bold text-neutral-700">{t.skills}</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.skills.length > 0 ? (
                profile.skills.map((skill: string) => (
                  <span key={skill} className="bg-lime-200 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full">{skill}</span>
                ))
              ) : (
                <p className="text-neutral-500">{t.noSkills}</p>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-neutral-700">{t.aboutMe}</h4>
            <p className="text-neutral-600 italic">"{profile.bio || t.noBio}"</p>
          </div>
        </div>
        <button onClick={onClose} className="w-full mt-6 py-2 px-4 text-sm font-medium text-neutral-700 bg-neutral-100 border border-neutral-300 rounded-md hover:bg-neutral-200">{t.closePreview}</button>
      </div>
    </div>
  );
};

// --- Helper Component 2: The form to list skills ---
const ListSkillsForm = ({ t }: { t: any }) => {
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    phone: "",
    experience: "",
    bio: "",
    skills: [],
    imagePreviewUrl: "",
  });
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  
  const availableSkills = [ "Soil Preparation", "Planting", "Weeding", "Pruning", "Manuring", "Fertilizing", "Pest Control", "Flower Picking", "Sorting", "Grading", "Stringing Flowers (Chendu)", "Packing", "Weighing", "Irrigation", "Greenhouse Work", "Disease Identification", "Driving", "Loading & Unloading", "Delivery" ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setProfile(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfile(prev => ({ ...prev, imagePreviewUrl: URL.createObjectURL(file) }));
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.profileUpdated);
  };

  return (
    <>
      <form onSubmit={handleUpdate} className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-lime-200 space-y-6">
        <h2 className="font-bold text-emerald-800 text-2xl mb-2">{t.listSkills}</h2>
        <p className="text-neutral-600 text-sm mb-4">{t.listSkillsDesc}</p>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img src={profile.imagePreviewUrl || "/laborerimg.jpg"} alt="Profile" className="h-24 w-24 object-cover rounded-full shadow-md border-4 border-white" />
            <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors">
              <FaCamera />
              <input id="profile-image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700">{t.fullName}</label>
                  <input type="text" id="name" name="name" value={profile.name} onChange={handleInputChange} className="mt-1 w-full p-2 border border-neutral-300 rounded-md" required />
              </div>
              <div>
                  <label htmlFor="location" className="block text-sm font-medium text-neutral-700">Location</label>
                  <input type="text" id="location" name="location" value={profile.location} onChange={handleInputChange} className="mt-1 w-full p-2 border border-neutral-300 rounded-md" placeholder={t.locationPlaceholder} />
              </div>
              <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">{t.phoneNumber}</label>
                  <input type="tel" id="phone" name="phone" value={profile.phone} onChange={handleInputChange} className="mt-1 w-full p-2 border border-neutral-300 rounded-md" required />
              </div>
              <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-neutral-700">{t.yearsOfExperience}</label>
                  <input type="number" id="experience" name="experience" value={profile.experience} onChange={handleInputChange} className="mt-1 w-full p-2 border border-neutral-300 rounded-md" />
              </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">{t.selectSkills}</label>
          <div className="p-3 bg-lime-50 rounded-lg border border-lime-200">
            <p className="text-xs text-neutral-600 mb-3">{t.skillsPlaceholder}</p>
            <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
              {profile.skills.length > 0 ? (
                profile.skills.map((skill: string) => (
                  <span key={skill} className="flex items-center bg-emerald-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {skill}
                    <button type="button" onClick={() => handleSkillToggle(skill)} className="ml-2 text-emerald-100 hover:text-white">
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-sm text-neutral-400 p-1">{t.skillsPlaceholder}</span>
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
                  profile.skills.includes(skill)
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
            <label htmlFor="bio" className="block text-sm font-medium text-neutral-700">{t.shortBio}</label>
            <textarea id="bio" name="bio" value={profile.bio} onChange={handleInputChange} rows={3} placeholder={t.bioPlaceholder} className="mt-1 w-full p-2 border border-neutral-300 rounded-md"></textarea>
        </div>

        <div className="flex items-center space-x-4 pt-4 border-t">
          <button type="submit" className="flex-1 py-3 px-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow">
            {t.updateProfile}
          </button>
          <button type="button" onClick={() => setIsPreviewModalOpen(true)} className="flex-1 py-3 px-4 bg-neutral-100 text-neutral-800 font-bold rounded-lg border border-neutral-300 hover:bg-neutral-200 transition-colors">
            Preview
          </button>
        </div>
      </form>
      {isPreviewModalOpen && <ProfilePreviewModal profile={profile} onClose={() => setIsPreviewModalOpen(false)} t={t} />}
    </>
  );
};

// --- Helper Component 3: The Wages & Salary Section ---
const WagesSalarySection = ({ t }: { t: any }) => {
  const [activePopupId, setActivePopupId] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const paymentsData = [
    { id: 1, workDescription: "Harvesting at Farm A", date: "2025-08-04", amount: 1500, status: t.received, breakdown: { basePay: 1200, bonus: 300, deductions: 0 } },
    { id: 2, workDescription: "Weeding and Pruning at Farm C", date: "2025-08-06", amount: 950, status: t.pending, breakdown: { basePay: 950, bonus: 0, deductions: 0 } },
    { id: 3, workDescription: "Packing and Transport", date: "2025-07-28", amount: 700, status: t.received, breakdown: { basePay: 750, bonus: 0, deductions: 50 } },
  ];
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setActivePopupId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, [popupRef]);

  return (
    <div className="w-full max-w-2xl">
      <h2 className="font-bold text-emerald-700 text-xl mb-2">{t.wagesAndSalary}</h2>
      <p className="text-neutral-600 text-sm mb-6">{t.wagesAndSalaryDesc}</p>
      <div className="flex flex-col gap-4">
        {paymentsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((payment) => (
          <div key={payment.id} className="relative">
            <button onClick={() => setActivePopupId(activePopupId === payment.id ? null : payment.id)} className="w-full bg-white p-4 rounded-lg shadow text-left border border-lime-200 hover:border-emerald-400 transition-colors duration-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-emerald-800">{payment.workDescription}</p>
                <p className="text-sm text-neutral-600">Date: {payment.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-neutral-800">₹{payment.amount}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ payment.status === t.received ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800' }`}>{payment.status}</span>
              </div>
            </button>
            {activePopupId === payment.id && (
              <div ref={popupRef} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-white p-4 rounded-lg shadow-2xl border z-10 animate-fade-in-up">
                <h4 className="font-bold text-center mb-2">{t.wagesBreakdown}</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between"><span>{t.basePay}:</span> <span>₹{payment.breakdown.basePay}</span></div>
                  <div className="flex justify-between"><span>{t.bonus}:</span> <span>₹{payment.breakdown.bonus}</span></div>
                  <div className="flex justify-between text-red-600"><span>{t.deductions}:</span> <span>- ₹{payment.breakdown.deductions}</span></div>
                  <hr className="my-1"/>
                  <div className="flex justify-between font-bold text-emerald-700"><span>{t.total}:</span> <span>₹{payment.amount}</span></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- NEW Component: Pick Jobs ---
const PickJobsSection = ({ t }: { t: any }) => {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Flower Picking", description: "Help with the morning harvest of jasmine flowers.", date: "2025-08-08", duration: "1 day", location: "Farm A", status: "Available" },
    { id: 2, title: "Soil Preparation", description: "Prepare new plots for planting new jasmine saplings.", date: "2025-08-10", duration: "2 days", location: "Farm B", status: "Available" },
    { id: 3, title: "Pest Control & Spraying", description: "Apply organic pest control solutions to plants.", date: "2025-08-12", duration: "1 day", location: "Farm C", status: "Available" },
    { id: 4, title: "Weeding", description: "Manual removal of weeds from flower beds.", date: "2025-08-15", duration: "3 days", location: "Farm D", status: "Available" },
  ]);

  const handleApply = (jobId: number) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: "Applied" } : job
    ));
    alert("Application submitted successfully!");
  };

  return (
    <div className="w-full max-w-4xl">
      <h2 className="font-bold text-emerald-800 text-2xl mb-2">{t.pickJobs}</h2>
      <p className="text-neutral-600 text-sm mb-6">{t.pickJobsDesc}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-md border border-lime-200 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-emerald-800 text-lg">{job.title}</h3>
                <p className="text-sm text-neutral-600 my-2">{job.description}</p>
                <ul className="text-xs text-neutral-500 space-y-1">
                  <li><span className="font-semibold">Date:</span> {job.date}</li>
                  <li><span className="font-semibold">Duration:</span> {job.duration}</li>
                  <li><span className="font-semibold">Location:</span> {job.location}</li>
                </ul>
              </div>
              <div className="mt-4">
                {job.status === "Available" ? (
                  <button onClick={() => handleApply(job.id)} className="w-full py-2 px-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
                    {t.applyNow}
                  </button>
                ) : (
                  <div className="w-full py-2 px-4 bg-green-100 text-green-700 font-bold rounded-lg flex items-center justify-center gap-2">
                    <FaCheckCircle /> {t.applied}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-neutral-500 italic py-10 col-span-full">
            {t.noJobs}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Helper Component 4: The Request Training Section ---
const RequestTrainingSection = ({ t }: { t: any }) => {
  const availableTrainings = [ 
    { id: 1, title: "Advanced Pruning & Plant Care", provider: "Krishi Vigyan Kendra, Mangaluru", duration: "2 Days", description: "Learn techniques for effective pruning to increase flower yield and plant health." }, 
    { id: 2, title: "Natural Pest Control Methods", provider: "Local Farmer's Cooperative", duration: "1 Day Workshop", description: "Hands-on training for creating and using organic pesticides for jasmine plants." } 
  ];
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const handleOptIn = (trainingTitle: string) => {
    alert(t.successfullyRegistered);
  };
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.requestSubmitted);
    setTopic("");
    setNotes("");
  };
  return (
    <div className="w-full max-w-4xl">
      <h2 className="font-bold text-emerald-800 text-2xl mb-2">{t.requestTraining}</h2>
      <p className="text-neutral-600 text-sm mb-6">{t.requestTrainingDesc}</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-lg text-neutral-800">{t.availablePrograms}</h3>
          {availableTrainings.map(training => (
            <div key={training.id} className="bg-white p-6 rounded-xl shadow border border-lime-200">
              <h4 className="font-bold text-emerald-700">{training.title}</h4>
              <p className="text-xs text-neutral-500 my-1"><span className="font-semibold">Provider:</span> {training.provider} | <span className="font-semibold">Duration:</span> {training.duration}</p>
              <p className="text-sm text-neutral-700 mt-2">{training.description}</p>
              <button onClick={() => handleOptIn(training.title)} className="mt-4 py-2 px-5 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow">
                {t.optForTraining}
              </button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-lime-200 sticky top-28">
            <h3 className="font-semibold text-lg text-neutral-800 mb-4">{t.requestTrainingTitle}</h3>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-neutral-700">{t.trainingTopic}</label>
                <input type="text" id="topic" value={topic} onChange={e => setTopic(e.target.value)} placeholder={t.requestTrainingPlaceholder} className="mt-1 w-full p-2 border border-neutral-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-neutral-700">{t.additionalNotes}</label>
                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={4} placeholder={t.notesPlaceholder} className="mt-1 w-full p-2 border border-neutral-300 rounded-md"></textarea>
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow">
                {t.submitRequest}
              </button>
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
  const t = TEXT["en"];

  const navItems = [
    { key: "dashboard", label: t.dashboard, icon: <FaUserCog /> },
    { key: "listSkills", label: t.listSkills, icon: <FaClipboardList /> },
    { key: "pickJobs", label: t.pickJobs, icon: <FaHandsHelping /> },
    { key: "requestTraining", label: t.requestTraining, icon: <FaChalkboardTeacher /> },
    { key: "wagesSalary", label: t.wagesAndSalary, icon: <FaTasks /> },
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

          {active === "pickJobs" && (
            <PickJobsSection t={t} />
          )}

          {active === "requestTraining" && (
            <RequestTrainingSection t={t} />
          )}
          
          {active === "wagesSalary" && (
            <WagesSalarySection t={t} />
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
