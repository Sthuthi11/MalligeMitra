"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaCalculator, FaLeaf, FaUsers, FaComments, FaHistory, FaStore } from 'react-icons/fa';

// Mock authentication data and functions
// Assume these are in `app/lib/auth-mock.ts`
import {
    isAuthenticated,
    getCurrentUser,
    mockLogin,
    mockLogout,
    mockUsers,
    mockQuestions,
    mockAnswers
} from '../../lib/auth-mock';
import { User, Question, Answer, NewAnswerFormData } from '../../types/forum';

// --- Placeholder for Google Translate Widget ---
const GoogleTranslateWidgetBlended = () => {
    // This is a placeholder. The actual implementation would
    // involve loading the Google Translate script.
    return (
        <div id="google_translate_element" className="text-sm">
            <style jsx>{`
                #google_translate_element {
                    display: inline-block;
                }
                .goog-te-gadget {
                    font-family: inherit !important;
                }
                .goog-te-gadget .goog-te-combo {
                    border: 1px solid #ccc;
                    padding: 4px 8px;
                    border-radius: 6px;
                    background-color: white;
                    color: #166534;
                }
            `}</style>
        </div>
    );
};

// --- Language Translations for single forum page ---
// This is moved here for context, assuming a real app would use a more robust i18n library
const translations = {
    EN: {
        backToHome: "Back to Home",
        english: "English",
        kannada: "ಕನ್ನಡ",
        allRightsReserved: "© 2025 MalligeMitra. All rights reserved.",
        builtWith: "Built with",
        byTeamRegenesis: "by Team Regenesis.",
        backToAllQuestions: "Back to all Questions",
        askedBy: "Asked by",
        on: "on",
        answers: "Answers",
        noAnswersYet: "No answers yet. Be the first to help!",
        yourAnswer: "Your Answer:",
        typeYourAnswer: "Type your answer here...",
        postAs: "You will post as:",
        submitAnswer: "Submit Answer",
        submitting: "Submitting...",
        questionNotFound: "Question not found.",
        missingFieldsAnswer: "Answer cannot be empty.",
        failedToSubmitAnswer: "Failed to submit answer.",
        loggedInAs: "Logged in as:",
        logout: "Logout",
        loginAs: "Login as (Mock)",
        accessDenied: "Access Denied",
        loginPrompt: "You must be logged in to view this question.",
        simulateLogin: "Simulate Farmer Login",
        // Dashboard translations
        priceCalculator: "Price Calculator",
        priceCalculatorDesc: "Estimate your flower price based on quantity and market trends."
    },
    KN: {
        backToHome: "ಹೋಮ್‌ಗೆ ಹಿಂತಿರುಗಿ",
        english: "English",
        kannada: "ಕನ್ನಡ",
        allRightsReserved: "© 2025 ಮಲ್ಲಿಗೆಮಿತ್ರ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
        builtWith: "ಇದನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ",
        byTeamRegenesis: "ಟೀಮ್ ರಿಜೆನೆಸಿಸ್ ಅವರಿಂದ.",
        backToAllQuestions: "ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
        askedBy: "ಕೇಳಿದ್ದು",
        on: "ರಂದು",
        answers: "ಉತ್ತರಗಳು",
        noAnswersYet: "ಯಾವುದೇ ಉತ್ತರಗಳು ಇನ್ನೂ ಲಭ್ಯವಿಲ್ಲ. ಮೊದಲು ಸಹಾಯ ಮಾಡಿ!",
        yourAnswer: "ನಿಮ್ಮ ಉತ್ತರ:",
        typeYourAnswer: "ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
        postAs: "ನೀವು ಹೀಗೆ ಪೋಸ್ಟ್ ಮಾಡುತ್ತೀರಿ:",
        submitAnswer: "ಉತ್ತರ ಸಲ್ಲಿಸಿ",
        submitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
        questionNotFound: "ಪ್ರಶ್ನೆ ಕಂಡುಬಂದಿಲ್ಲ.",
        missingFieldsAnswer: "ಉತ್ತರ ಖಾಲಿಯಾಗಿರಬಾರದು.",
        failedToSubmitAnswer: "ಉತ್ತರ ಸಲ್ಲಿಸಲು ವಿಫಲವಾಗಿದೆ.",
        loggedInAs: "ಹೀಗೆ ಲಾಗಿನ್ ಆಗಿದೆ:",
        logout: "ಲಾಗ್‌ಔಟ್",
        loginAs: "ಇದರಂತೆ ಲಾಗಿನ್ ಮಾಡಿ (ಅಣಕು)",
        accessDenied: "ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ",
        loginPrompt: "ಈ ಪ್ರಶ್ನೆಯನ್ನು ವೀಕ್ಷಿಸಲು ನೀವು ಲಾಗಿನ್ ಆಗಿರಬೇಕು.",
        simulateLogin: "ರೈತ ಲಾಗಿನ್ ಅನುಕರಿಸಿ",
        // Dashboard translations
        priceCalculator: "ಬೆಲೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
        priceCalculatorDesc: "ಪ್ರಮಾಣ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಹೂವಿನ ಬೆಲೆಯನ್ನು ಅಂದಾಜು ಮಾಡಿ."
    },
};

// --- Dashboard Components ---
function SellFlowersForm() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ variety: "Udupi Mallige", quantity: "", price: "" });
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
            <h2 className="font-bold text-emerald-700 text-xl mb-4">Sell Flowers</h2>
            <p className="text-neutral-700 text-sm mb-4">List your jasmine flowers for sale, set price and quantity.</p>
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

function HireLaborers() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ desc: "", date: "", count: "" });
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
            <h2 className="font-bold text-emerald-700 text-xl mb-4">Hire Laborers</h2>
            <p className="text-neutral-700 text-sm mb-4">Find, request, and manage skilled labor for your farm.</p>
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

function FarmerForum() {
    const [posts, setPosts] = useState([
        { q: "How do you control pests naturally?", a: "I use neem oil spray and intercropping with marigold.", user: "Suresh" },
        { q: "Best time to harvest Mallige?", a: "Early morning before sunrise gives best fragrance.", user: "Lakshmi" },
    ]);
    const [newPost, setNewPost] = useState("");
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (newPost.trim()) {
            setPosts([{ q: newPost, a: "(Awaiting replies)", user: "You" }, ...posts]);
            setNewPost("");
        }
    }
    return (
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
            <h2 className="font-bold text-emerald-700 text-xl mb-4">Farmer Forum</h2>
            <p className="text-neutral-700 text-sm mb-4">Discuss, share advice, and connect with other farmers.</p>
            <div className="space-y-4">
                {posts.map((post, i) => (
                    <div key={i} className="bg-lime-50 p-4 rounded border border-lime-200">
                        <p className="font-semibold text-emerald-700">{post.q}</p>
                        <p className="text-neutral-700 text-sm">- {post.user}: {post.a}</p>
                    </div>
                ))}
                <form className="pt-4 border-t mt-4" onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Start a Discussion</label>
                    <input type="text" value={newPost} onChange={e => setNewPost(e.target.value)} className="w-full p-2 border border-neutral-300 rounded-md shadow-sm mb-2" placeholder="Ask a question or share advice..." required />
                    <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700">Post</button>
                </form>
            </div>
        </div>
    );
}

function HistoricalPrices() {
    const prices = [
        { date: "2025-08-01", variety: "Udupi Mallige", price: 1200 },
        { date: "2025-07-28", variety: "Mangaluru Mallige", price: 1100 },
        { date: "2025-07-25", variety: "Jaji Mallige", price: 950 },
    ];
    return (
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
            <h2 className="font-bold text-emerald-700 text-xl mb-4">Historical Prices</h2>
            <p className="text-neutral-700 text-sm mb-4">View jasmine flower prices from previous seasons.</p>
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

// --- Single Question Page Component ---
function SingleQuestionPage() {
    const { id } = useParams();
    const [lang, setLang] = useState<"EN" | "KN">("EN");
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const t = translations[lang];

    const [question, setQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [answerFormData, setAnswerFormData] = useState<NewAnswerFormData>({ content: '' });
    const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
    const [answerError, setAnswerError] = useState<string | null>(null);

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const router = useRouter();

    const profileRef = useRef<HTMLDivElement>(null);
    const langRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileDropdownOpen(false);
            }
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setLangDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setLoggedInUser(getCurrentUser());
    }, []);

    useEffect(() => {
        if (!isAuthenticated()) {
            setLoading(false);
            return;
        }

        if (!id) return;

        // Use mock data directly instead of API calls
        const foundQuestion = mockQuestions.find(q => q.id === id);
        if (foundQuestion) {
            setQuestion(foundQuestion);
            // Find all answers for the current question ID
            const foundAnswers = mockAnswers.filter(a => a.questionId === id);
            setAnswers(foundAnswers);
            setLoading(false);
        } else {
            setLoading(false);
            setError(t.questionNotFound);
        }
    }, [id, t]);

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswerFormData({ ...answerFormData, [e.target.name]: e.target.value });
    };

    const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmittingAnswer(true);
        setAnswerError(null);

        if (!loggedInUser) {
            setAnswerError(t.loginPrompt);
            setIsSubmittingAnswer(false);
            return;
        }

        if (!answerFormData.content.trim()) {
            setAnswerError(t.missingFieldsAnswer);
            setIsSubmittingAnswer(false);
            return;
        }

        // Mock API call for submitting an answer
        try {
            const newAnswer: Answer = {
                id: `ans-${mockAnswers.length + 1}`,
                questionId: id as string,
                authorId: loggedInUser.id,
                authorUsername: loggedInUser.username,
                content: answerFormData.content.trim(),
                createdAt: new Date().toISOString(),
                upvotes: 0
            };
            mockAnswers.push(newAnswer); // Add new answer to mock data

            // Update the question's answer count locally
            if (question) {
                setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
                setQuestion({ ...question, answersCount: (question.answersCount || 0) + 1 });
            }

            setAnswerFormData({ content: '' }); // Clear form
        } catch (e: any) {
            setAnswerError(t.failedToSubmitAnswer);
        } finally {
            setIsSubmittingAnswer(false);
        }
    };

    const handleMockLogin = (user: User) => {
        mockLogin(user);
        setLoggedInUser(user);
        setProfileDropdownOpen(false);
        setLoading(true); // Trigger re-fetch for new user
    };

    const handleLogout = () => {
        mockLogout();
        setLoggedInUser(null);
        setProfileDropdownOpen(false);
        setLoading(true); // Trigger re-fetch
    };

    if (!isAuthenticated()) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-lime-100">
                <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white shadow-md">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            {t.backToHome}
                        </Link>
                        <Link href="/farmer/marketplace" className="text-lg font-semibold hover:underline ml-4">Marketplace</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative" ref={langRef}>
                            <button className="px-3 py-1 rounded bg-white text-emerald-700 flex items-center gap-2" onClick={() => setLangDropdownOpen(prev => !prev)} type="button">
                                <span>{lang === "EN" ? t.english : t.kannada}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {langDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white text-emerald-700 rounded shadow-lg z-10">
                                    <button className={`block w-full text-left px-4 py-2 hover:bg-emerald-100 ${lang === "EN" ? "font-bold" : ""}`} onClick={() => { setLang("EN"); setLangDropdownOpen(false); }}>{t.english}</button>
                                    <button className={`block w-full text-left px-4 py-2 hover:bg-emerald-100 ${lang === "KN" ? "font-bold" : ""}`} onClick={() => { setLang("KN"); setLangDropdownOpen(false); }}>{t.kannada}</button>
                                </div>
                            )}
                        </div>
                        <div className="relative" ref={profileRef}>
                            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-800 hover:bg-emerald-900" aria-label="Profile" type="button" onClick={() => setProfileDropdownOpen(prev => !prev)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-7"><circle cx="12" cy="8" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-3.333 5.333-5 8-5s8 1.667 8 5" /></svg>
                            </button>
                            {profileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-emerald-700 rounded shadow-lg z-10">
                                    <div className="px-4 py-2 text-sm text-gray-800 font-semibold border-b border-gray-200">{t.loginAs}</div>
                                    {mockUsers.map(user => (
                                        <button key={user.id} className="block w-full text-left px-4 py-2 hover:bg-emerald-100" onClick={() => handleMockLogin(user)}>{user.username}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                <main className="flex-1 container mx-auto p-8 text-center bg-white shadow-lg rounded-lg mt-10 max-w-xl">
                    <h1 className="text-3xl font-bold text-red-700 mb-4">{t.accessDenied}</h1>
                    <p className="text-lg text-gray-700 mb-6">{t.loginPrompt}</p>
                    <button
                        onClick={() => handleMockLogin(mockUsers[0])}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-md"
                    >
                        {t.simulateLogin}
                    </button>
                </main>
                <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
                    <p className="mb-1 text-base font-semibold">{t.allRightsReserved}</p>
                    <p className="text-xs">{t.builtWith} <span className="text-pink-300">❤️</span> {t.byTeamRegenesis}</p>
                </footer>
            </div>
        );
    }

    if (loading) return <div className="text-center py-8 text-gray-700">Loading question...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    if (!question) return <div className="text-center py-8 text-gray-600">{t.questionNotFound}</div>;

    const formattedDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-lime-100">
            <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white shadow-md">
                <div className="flex items-center gap-4">
                    <Link href="/farmer" className="flex items-center gap-2 text-lg font-semibold hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        {t.backToHome}
                    </Link>
                    <Link href="/farmer/marketplace" className="text-lg font-semibold hover:underline ml-4">Marketplace</Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative" ref={langRef}>
                        <button className="px-3 py-1 rounded bg-white text-emerald-700 flex items-center gap-2" onClick={() => setLangDropdownOpen(prev => !prev)} type="button">
                            <span>{lang === "EN" ? t.english : t.kannada}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {langDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white text-emerald-700 rounded shadow-lg z-10">
                                <button className={`block w-full text-left px-4 py-2 hover:bg-emerald-100 ${lang === "EN" ? "font-bold" : ""}`} onClick={() => { setLang("EN"); setLangDropdownOpen(false); }}>{t.english}</button>
                                <button className={`block w-full text-left px-4 py-2 hover:bg-emerald-100 ${lang === "KN" ? "font-bold" : ""}`} onClick={() => { setLang("KN"); setLangDropdownOpen(false); }}>{t.kannada}</button>
                            </div>
                        )}
                    </div>
                    <div className="relative" ref={profileRef}>
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-emerald-800 shadow" aria-label="Profile" type="button" onClick={() => setProfileDropdownOpen(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                <circle cx="12" cy="8" r="4" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-3.333 5.333-5 8-5s8 1.667 8 5" />
                            </svg>
                        </button>
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-emerald-700 rounded shadow-lg z-10">
                                {loggedInUser ? (
                                    <>
                                        <div className="px-4 py-2 text-sm text-gray-800 font-semibold border-b border-gray-200">
                                            {t.loggedInAs} {loggedInUser.username}
                                        </div>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-emerald-100 text-red-600" onClick={handleLogout}>{t.logout}</button>
                                    </>
                                ) : (
                                    <>
                                        <div className="px-4 py-2 text-sm text-gray-800 font-semibold border-b border-gray-200">{t.loginAs}</div>
                                        {mockUsers.map(user => (
                                            <button key={user.id} className="block w-full text-left px-4 py-2 hover:bg-emerald-100" onClick={() => handleMockLogin(user)}>{user.username}</button>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="flex-1 container mx-auto p-4 max-w-3xl">
                <Link href="/farmer/forum" className="text-emerald-600 hover:underline mb-4 block">
                    &larr; {t.backToAllQuestions}
                </Link>
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-2">{question.title}</h1>
                    <p className="text-gray-600 text-sm mb-4">
                        {t.askedBy} <span className="font-medium text-emerald-600">{question.authorUsername}</span> {t.on} {formattedDate(question.createdAt)}
                    </p>
                    <div className="prose max-w-none text-gray-800 leading-relaxed mb-6">
                        <p>{question.content}</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-emerald-800 mb-4">{t.answers} ({answers.length})</h2>
                    {answers.length === 0 ? (
                        <p className="text-gray-600 mb-4">{t.noAnswersYet}</p>
                    ) : (
                        <div className="space-y-4 mb-6">
                            {answers.map((answer) => (
                                <div key={answer.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                    <p className="text-gray-800">{answer.content}</p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        {t.byTeamRegenesis} <span className="font-medium">{answer.authorUsername}</span> {t.on} {formattedDate(answer.createdAt)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">{t.yourAnswer}</h3>
                    {answerError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{answerError}</div>}
                    <form onSubmit={handleAnswerSubmit} className="space-y-3">
                        <div>
                            <label htmlFor="answerContent" className="sr-only">{t.yourAnswer}</label>
                            <textarea
                                id="answerContent"
                                name="content"
                                value={answerFormData.content}
                                onChange={handleAnswerChange}
                                required
                                rows={4}
                                placeholder={t.typeYourAnswer}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                            ></textarea>
                        </div>
                        <p className="text-gray-600 text-sm italic">
                            {t.postAs} <span className="font-semibold text-emerald-700">{loggedInUser?.username}</span>
                        </p>
                        <button
                            type="submit"
                            disabled={isSubmittingAnswer}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                        >
                            {isSubmittingAnswer ? t.submitting : t.submitAnswer}
                        </button>
                    </form>
                </div>
            </main>
            <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
                <p className="mb-1 text-base font-semibold">{t.allRightsReserved}</p>
                <p className="text-xs">{t.builtWith} <span className="text-pink-300">❤️</span> {t.byTeamRegenesis}</p>
            </footer>
        </div>
    );
}

// --- Farmer Dashboard Page Component ---
export default function FarmerDashboard() {
    const [profileOpen, setProfileOpen] = useState(false);
    const [active, setActive] = useState("dashboard");
    const navItems = [
        { key: "priceCalculator", label: "Price Calculator", icon: <FaCalculator /> },
        { key: "sellFlowers", label: "Sell Flowers", icon: <FaLeaf /> },
        { key: "hireLaborers", label: "Hire Laborers", icon: <FaUsers /> },
        { key: "forum", label: "Farmer Forum", icon: <FaComments /> },
        { key: "historicalPrices", label: "Historical Prices", icon: <FaHistory /> },
        { key: "marketplace", label: "Marketplace & Orders", icon: <FaStore /> },
    ];

    const profileRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderActiveComponent = () => {
        const t = translations["EN"]; // Using English as default for dashboard components, as the widget handles translation.
        switch (active) {
            case "priceCalculator":
                return <PriceCalculator t={t} />;
            case "sellFlowers":
                return <SellFlowersForm />;
            case "hireLaborers":
                return <HireLaborers />;
            case "forum":
                return <FarmerForum />;
            case "historicalPrices":
                return <HistoricalPrices />;
            case "marketplace":
                return (
                    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow border border-lime-200">
                        <h2 className="font-bold text-emerald-700 text-xl mb-4">Marketplace & Orders</h2>
                        <p className="text-neutral-700 text-sm mb-4">View your orders and explore the virtual marketplace.</p>
                        <div className="text-center text-neutral-400">[Marketplace Coming Soon]</div>
                    </div>
                );
            default:
                return null;
        }
    };

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
                    <div className="flex items-center gap-4 relative" ref={profileRef}>
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
                            <div className="absolute top-16 right-0 mt-2 bg-white text-emerald-700 rounded shadow-lg py-2 w-32 z-10 border border-lime-200">
                                <a href="/profile" className="block px-4 py-2 hover:bg-lime-50 text-sm">Profile</a>
                                <button className="block w-full text-left px-4 py-2 hover:bg-lime-50 text-sm" onClick={() => alert('Logged out!')}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-start px-8 py-8 gap-8">
                    {renderActiveComponent()}
                </div>

                <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
                    <p className="mb-1 text-base font-semibold">© 2025 MalligeMitra. All rights reserved.</p>
                    <p className="text-xs">Built with <span className="text-pink-300">❤</span> by Team Regenesis</p>
                </footer>
            </div>
        </main>
    );
}