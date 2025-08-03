'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Question } from '../../types/forum';
import { User } from '../../types';
import { getCurrentUser, mockLogin, mockLogout, mockUsers, isAuthenticated } from '../../lib/auth-mock';
import { useRouter } from 'next/navigation';

// --- Language Translations for this page ---
const translations = {
    EN: {
        backToHome: "Back to Home",
        allRightsReserved: "© 2025 MalligeMitra. All rights reserved.",
        builtWith: "Built with",
        byTeamRegenesis: "by Team Regenesis.",
        forumTitle: "Farmer Q&A Forum",
        forumIntro: "Connect with other farmers to ask questions, share knowledge, and find solutions.",
        askQuestion: "Ask a Question",
        loadingQuestions: "Loading questions...",
        errorFetchingQuestions: "Error: Failed to fetch questions.",
        noQuestionsYet: "No questions yet. Be the first to ask!",
        askedBy: "Asked by",
        on: "on",
        viewAnswers: "View Answers",
        logout: "Logout",
        loginAs: "Login as (Mock)",
        accessDenied: "Access Denied",
        loginPrompt: "You must be logged in as a farmer to view the forum.",
        simulateLogin: "Simulate Farmer Login"
    },
    KN: {
        backToHome: "ಹೋಮ್‌ಗೆ ಹಿಂತಿರುಗಿ",
        allRightsReserved: "© 2025 ಮಲ್ಲಿಗೆಮಿತ್ರ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
        builtWith: "ಇದನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ",
        byTeamRegenesis: "ಟೀಮ್ ರಿಜೆನೆಸಿಸ್ ಅವರಿಂದ.",
        forumTitle: "ರೈತ ಪ್ರಶ್ನೋತ್ತರ ವೇದಿಕೆ",
        forumIntro: "ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಲು, ಜ್ಞಾನವನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಮತ್ತು ಪರಿಹಾರಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಲು ಇತರ ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",
        askQuestion: "ಪ್ರಶ್ನೆ ಕೇಳಿ",
        loadingQuestions: "ಪ್ರಶ್ನೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
        errorFetchingQuestions: "ದೋಷ: ಪ್ರಶ್ನೆಗಳನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ.",
        noQuestionsYet: "ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು ಇನ್ನೂ ಲಭ್ಯವಿಲ್ಲ. ಮೊದಲು ಕೇಳಿ!",
        askedBy: "ಕೇಳಿದ್ದು",
        on: "ರಂದು",
        viewAnswers: "ಉತ್ತರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
        logout: "ಲಾಗ್‌ಔಟ್",
        loginAs: "ಇದರಂತೆ ಲಾಗಿನ್ ಮಾಡಿ (ಅಣಕು)",
        accessDenied: "ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ",
        loginPrompt: "ಫೋರಂ ವೀಕ್ಷಿಸಲು ನೀವು ರೈತರಾಗಿ ಲಾಗಿನ್ ಆಗಿರಬೇಕು.",
        simulateLogin: "ರೈತ ಲಾಗಿನ್ ಅನುಕರಿಸಿ"
    },
};
// --- End: Language Translations for this page ---

export default function ForumPage() {
    const [lang] = useState<"EN" | "KN">("EN");
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const t = translations[lang];

    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        setLoggedInUser(getCurrentUser());
    }, []);

    useEffect(() => {
        if (!isAuthenticated()) {
            setLoading(false);
            setQuestions([]);
            return;
        }

        async function fetchQuestions() {
            try {
                const response = await fetch('/api/questions');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Question[] = await response.json();
                setQuestions(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchQuestions();
    }, [loggedInUser]);

    const handleMockLogin = (user: User) => {
        mockLogin(user);
        setLoggedInUser(user);
        setProfileDropdownOpen(false);
        router.refresh();
    };

    const handleLogout = () => {
        mockLogout();
        setLoggedInUser(null);
        setProfileDropdownOpen(false);
        router.refresh();
    };

    // Render the access denied page if not authenticated
    if (!isAuthenticated()) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-lime-100">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-4" style={{ backgroundColor: "#047857" }}>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            {t.backToHome}
                        </Link>
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
                                            Logged in as: {loggedInUser.username}
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

                {/* Footer */}
                <footer className="text-white py-3 text-center shadow-inner mt-auto" style={{ backgroundColor: "#047857" }}>
                    <p className="mb-1 text-base font-semibold">{t.allRightsReserved}</p>
                    <p className="text-xs">{t.builtWith} <span className="text-pink-300">❤️</span> {t.byTeamRegenesis}</p>
                </footer>
            </div>
        );
    }

    // Render the actual forum content if authenticated
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-lime-100">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4" style={{ backgroundColor: "#047857" }}>
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        {t.backToHome}
                    </Link>
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
                                        Logged in as: {loggedInUser.username}
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
            </header>

            <main className="flex-1 container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-emerald-800">{t.forumTitle}</h1>

                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <p className="text-lg text-gray-700">{t.forumIntro}</p>
                    <Link href="/forum/ask" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md">
                        {t.askQuestion}
                    </Link>
                </div>

                {loading && <p className="text-center text-blue-500 text-lg">{t.loadingQuestions}</p>}
                {error && <p className="text-center text-red-500 text-lg">{error}</p>}

                <div className="space-y-6">
                    {questions.length === 0 && !loading && !error ? (
                        <p className="col-span-full text-center text-gray-600 text-lg mt-10">{t.noQuestionsYet}</p>
                    ) : (
                        questions.map((question) => (
                            <div key={question.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition duration-200">
                                <Link href={`/forum/questions/${question.id}`}>
                                    <h2 className="text-2xl font-semibold text-blue-700 hover:text-blue-800 transition duration-200 cursor-pointer">
                                        {question.title}
                                    </h2>
                                </Link>
                                <p className="text-gray-600 text-sm mt-2">
                                    {t.askedBy} <span className="font-medium text-green-600">{question.authorUsername}</span> {t.on} {new Date(question.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-gray-800 mt-4 line-clamp-3">
                                    {question.content}
                                </p>
                                <div className="mt-4 text-right">
                                    <Link href={`/forum/questions/${question.id}`} className="text-blue-600 hover:underline font-medium">
                                        {t.viewAnswers} ({question.answersCount})
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="text-white py-3 text-center shadow-inner mt-auto" style={{ backgroundColor: "#047857" }}>
                <p className="mb-1 text-base font-semibold">{t.allRightsReserved}</p>
                <p className="text-xs">{t.builtWith} <span className="text-pink-300">❤️</span> {t.byTeamRegenesis}</p>
            </footer>
        </div>
    );
}