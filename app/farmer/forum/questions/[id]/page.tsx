'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Import forum-specific types and mock data from a centralized location
import { Question, Answer, NewAnswerFormData, User } from '../../../../../types/forum';
import {
    isAuthenticated,
    getCurrentUser,
    mockLogin,
    mockLogout,
    mockUsers,
    mockQuestions, // Now importing mock data
    mockAnswers // Now importing mock data
} from '../../../../../lib/auth-mock';

// --- Language Translations for this page ---
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
        simulateLogin: "Simulate Farmer Login"
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
        simulateLogin: "ರೈತ ಲಾಗಿನ್ ಅನುಕರಿಸಿ"
    },
};
// --- End: Language Translations for this page ---

export default function SingleQuestionPage() {
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
                {/* Header */}
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

                {/* Footer */}
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
            {/* Header - No changes here, as it's a shared component */}
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

            {/* Footer - No changes here */}
            <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
                <p className="mb-1 text-base font-semibold">{t.allRightsReserved}</p>
                <p className="text-xs">{t.builtWith} <span className="text-pink-300">❤️</span> {t.byTeamRegenesis}</p>
            </footer>
        </div>
    );
}