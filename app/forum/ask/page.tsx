// my-farmer-forum/app/forum/ask/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NewQuestionFormData } from '../../../types/forum'; // Import forum-specific types
import { User } from '../../../types'; // Import User from your main shared types
import Link from 'next/link';
import { isAuthenticated, getCurrentUser, mockLogin, mockLogout, mockUsers } from '../../../lib/auth-mock'; // Import from centralized mock auth

// --- Language Translations for this page ---
const translations = {
    EN: {
        backToHome: "Back to Home",
        english: "English",
        kannada: "ಕನ್ನಡ",
        allRightsReserved: "© 2025 MalligeMitra. All rights reserved.",
        builtWith: "Built with",
        byTeamRegenesis: "by Team Regenesis.",
        askQuestionTitle: "Ask a New Question",
        questionTitleLabel: "Question Title:",
        detailsLabel: "Details (describe your problem/query):",
        postAs: "You will post as:",
        submitQuestion: "Submit Question",
        submitting: "Submitting...",
        backToForum: "Back to Forum",
        missingFields: "Missing required fields or authentication info.",
        failedToAsk: "Failed to ask question",
        loggedInAs: "Logged in as:",
        logout: "Logout",
        loginAs: "Login as (Mock)",
        accessDenied: "Access Denied",
        loginPrompt: "You must be logged in as a farmer to ask a question.",
        simulateLogin: "Simulate Farmer Login"
    },
    KN: {
        backToHome: "ಹೋಮ್‌ಗೆ ಹಿಂತಿರುಗಿ",
        english: "English",
        kannada: "ಕನ್ನಡ",
        allRightsReserved: "© 2025 ಮಲ್ಲಿಗೆಮಿತ್ರ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
        builtWith: "ಇದನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ",
        byTeamRegenesis: "ಟೀಮ್ ರಿಜೆನೆಸಿಸ್ ಅವರಿಂದ.",
        askQuestionTitle: "ಹೊಸ ಪ್ರಶ್ನೆ ಕೇಳಿ",
        questionTitleLabel: "ಪ್ರಶ್ನೆ ಶೀರ್ಷಿಕೆ:",
        detailsLabel: "ವಿವರಗಳು (ನಿಮ್ಮ ಸಮಸ್ಯೆ/ಪ್ರಶ್ನೆಯನ್ನು ವಿವರಿಸಿ):",
        postAs: "ನೀವು ಹೀಗೆ ಪೋಸ್ಟ್ ಮಾಡುತ್ತೀರಿ:",
        submitQuestion: "ಪ್ರಶ್ನೆ ಸಲ್ಲಿಸಿ",
        submitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
        backToForum: "ವೇದಿಕೆಗೆ ಹಿಂತಿರುಗಿ",
        missingFields: "ಅಗತ್ಯವಿರುವ ಕ್ಷೇತ್ರಗಳು ಅಥವಾ ದೃಢೀಕರಣ ಮಾಹಿತಿ ಕಾಣೆಯಾಗಿದೆ.",
        failedToAsk: "ಪ್ರಶ್ನೆ ಕೇಳಲು ವಿಫಲವಾಗಿದೆ",
        loggedInAs: "ಹೀಗೆ ಲಾಗಿನ್ ಆಗಿದೆ:",
        logout: "ಲಾಗ್‌ಔಟ್",
        loginAs: "ಇದರಂತೆ ಲಾಗಿನ್ ಮಾಡಿ (ಅಣಕು)",
        accessDenied: "ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ",
        loginPrompt: "ಪ್ರಶ್ನೆ ಕೇಳಲು ನೀವು ರೈತರಾಗಿ ಲಾಗಿನ್ ಆಗಿರಬೇಕು.",
        simulateLogin: "ರೈತ ಲಾಗಿನ್ ಅನುಕರಿಸಿ"
    },
};
// --- End: Language Translations for this page ---

export default function AskQuestionPage() {
    const [lang, setLang] = useState<"EN" | "KN">("EN");
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const t = translations[lang];

    const [formData, setFormData] = useState<NewQuestionFormData>({ title: '', content: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        setLoggedInUser(getCurrentUser());
    }, []);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/forum'); // Redirect to forum homepage if not logged in
        }
    }, [loggedInUser, router]); // Dependency on loggedInUser and router

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!loggedInUser) {
            setError(t.missingFields); // More generic error message for missing user
            setIsSubmitting(false);
            return;
        }
        const currentUser: User = loggedInUser; 
        try {
            const response = await fetch('/api/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    authorId: loggedInUser.id,
                    authorUsername: loggedInUser!.username,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || t.failedToAsk);
            }

            const newQuestion = await response.json();
            router.push(`/forum/questions/${newQuestion.id}`);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMockLogin = (user: User) => {
        mockLogin(user);
        setLoggedInUser(user); // Update local state
        setProfileDropdownOpen(false);
        router.refresh();
    };

    const handleLogout = () => {
        mockLogout();
        setLoggedInUser(null); // Update local state
        setProfileDropdownOpen(false);
        router.refresh();
    };

    if (!loggedInUser) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-lime-100">
                {/* Header - Copied from marketplace/page.tsx pattern */}
                <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white shadow-md">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            {t.backToHome}
                        </Link>
                        <Link href="/marketplace" className="flex items-center gap-2 text-lg font-semibold hover:underline ml-4">
                            {t.marketplace}
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                className="px-3 py-1 rounded bg-white text-emerald-700 flex items-center gap-2"
                                onClick={() => setLangDropdownOpen((open) => !open)}
                                type="button"
                            >
                                <span>{lang === "EN" ? t.english : t.kannada}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {langDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white text-emerald-700 rounded shadow-lg z-10">
                                    <button
                                        className={`block w-full text-left px-4 py-2 hover:bg-emerald-100 ${lang === "EN" ? "font-bold" : ""}`}
                                        onClick={() => { setLang("EN"); setLangDropdownOpen(false); }}
                                    >{t.english}</button>
                                    <button
                                        className={`block w-full text-left px-4 py-2 hover:bg-emerald-100 ${lang === "KN" ? "font-bold" : ""}`}
                                        onClick={() => { setLang("KN"); setLangDropdownOpen(false); }}
                                    >{t.kannada}</button>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-800 hover:bg-emerald-900"
                                aria-label="Profile"
                                type="button"
                                onClick={() => setProfileDropdownOpen((open) => !open)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-7">
                                    <circle cx="12" cy="8" r="4" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-3.333 5.333-5 8-5s8 1.667 8 5" />
                                </svg>
                            </button>
                            {profileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-emerald-700 rounded shadow-lg z-10">
                                    {loggedInUser ? (
                                        <>
                                            <div className="px-4 py-2 text-sm text-gray-800 font-semibold border-b border-gray-200">
                                            {t.loggedInAs} {loggedInUser?.username}
                                            </div>
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-emerald-100 text-red-600"
                                                onClick={handleLogout}
                                            >
                                                {t.logout}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="px-4 py-2 text-sm text-gray-800 font-semibold border-b border-gray-200">
                                                {t.loginAs}
                                            </div>
                                            {mockUsers.map(user => (
                                                <button
                                                    key={user.id}
                                                    className="block w-full text-left px-4 py-2 hover:bg-emerald-100"
                                                    onClick={() => handleMockLogin(user)}
                                                >
                                                    {user.username}
                                                </button>
                                            ))}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 container mx-auto p-8 text-center bg-white shadow-lg rounded-lg mt-10">
                    <h1 className="text-3xl font-bold text-red-700 mb-4">{t.accessDenied}</h1>
                    <p className="text-lg text-gray-700 mb-6">{t.loginPrompt}</p>
                    <button
                        onClick={() => handleMockLogin(mockUsers[0] || { id: 'default', username: 'DefaultUser' })}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-md"
                    >
                        {t.simulateLogin}
                    </button>
                </main>

                {/* Footer - Copied from marketplace/page.tsx pattern */}
                <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
                    <p className="mb-1 text-base font-semibold">{t.allRightsReserved}</p>
                    <p className="text-xs">{t.builtWith} <span className="text-pink-300">❤️</span> {t.byTeamRegenesis}</p>
                </footer>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-lime-100">
            {/* Header - Copied from marketplace/page.tsx pattern */}
            <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white shadow-md">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        {t.backToHome}
                    </Link>
                    <Link href="/marketplace" className="flex items-center gap-2 text-lg font-semibold hover:underline ml-4">
                        {t.marketplace}
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            className="px-3 py-1 rounded bg-white text-emerald-700 flex items-center gap-2"
                            onClick={() => setLangDropdownOpen((open) => !open)}
                            type="button"
                        >
                            <span>{lang === "EN" ? t.english : t.kannada}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {langDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white text-emerald-700 rounded shadow-lg z-10">
                                <button
                                    className={`block w-full text-left px-4 py-2 hover:bg-emerald-100 ${lang === "EN" ? "font-bold" : ""}`}
                                    onClick={() => { setLang("EN"); setLangDropdownOpen(false); }}
                                >{t.english}</button>
                                <button
                                    className={`block w-full text-left px-4 py-2 hover:bg-emerald-100 ${lang === "KN" ? "font-bold" : ""}`}
                                    onClick={() => { setLang("KN"); setLangDropdownOpen(false); }}
                                >{t.kannada}</button>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-800 hover:bg-emerald-900"
                            aria-label="Profile"
                            type="button"
                            onClick={() => setProfileDropdownOpen((open) => !open)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-7">
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
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-emerald-100 text-red-600"
                                            onClick={handleLogout}
                                        >
                                            {t.logout}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="px-4 py-2 text-sm text-gray-800 font-semibold border-b border-gray-200">
                                            {t.loginAs}
                                        </div>
                                        {mockUsers.map(user => (
                                            <button
                                                key={user.id}
                                                className="block w-full text-left px-4 py-2 hover:bg-emerald-100"
                                                onClick={() => handleMockLogin(user)}
                                            >
                                                {user.username}
                                            </button>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto p-4 max-w-2xl">
                <h1 className="text-3xl font-bold text-green-700 mb-6">{t.askQuestionTitle}</h1>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                            {t.questionTitleLabel}
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                            {t.detailsLabel}
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                        ></textarea>
                    </div>
                    <p className="text-gray-600 text-sm italic">
                        {t.postAs} <span className="font-semibold text-green-700">{loggedInUser?.username}</span>
                    </p>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                    >
                        {isSubmitting ? t.submitting : t.submitQuestion}
                    </button>
                    <Link href="/forum" className="ml-4 text-blue-600 hover:underline">
                        {t.backToForum}
                    </Link>
                </form>
            </main>

            {/* Footer - Copied from marketplace/page.tsx pattern */}
            <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
                <p className="mb-1 text-base font-semibold">{t.allRightsReserved}</p>
                <p className="text-xs">{t.builtWith} <span className="text-pink-300">❤️</span> {t.byTeamRegenesis}</p>
            </footer>
        </div>
    );
}