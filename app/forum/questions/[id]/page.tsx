// my-farmer-forum/app/forum/questions/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Question, Answer, NewAnswerFormData } from '../../../../types/forum'; // Import forum-specific types
import { User } from '../../../../types'; // Import User from your main shared types
import Link from 'next/link';
import { isAuthenticated, getCurrentUser, mockLogin, mockLogout, mockUsers } from '../../../../lib/auth-mock'; // Import from centralized mock auth

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
        failedToLoadQuestion: "Failed to load question:",
        failedToLoadAnswers: "Failed to load answers:",
        questionNotFound: "Question not found.",
        missingFieldsAnswer: "You must be logged in to post an answer.",
        failedToSubmitAnswer: "Failed to submit answer",
        loggedInAs: "Logged in as:",
        logout: "Logout",
        loginAs: "Login as (Mock)",
        accessDenied: "Access Denied",
        loginPrompt: "You must be logged in as a farmer to view this question.",
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
        failedToLoadQuestion: "ಪ್ರಶ್ನೆಯನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ:",
        failedToLoadAnswers: "ಉತ್ತರಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ:",
        questionNotFound: "ಪ್ರಶ್ನೆ ಕಂಡುಬಂದಿಲ್ಲ.",
        missingFieldsAnswer: "ಉತ್ತರ ಪೋಸ್ಟ್ ಮಾಡಲು ನೀವು ಲಾಗಿನ್ ಆಗಿರಬೇಕು.",
        failedToSubmitAnswer: "ಉತ್ತರ ಸಲ್ಲಿಸಲು ವಿಫಲವಾಗಿದೆ",
        loggedInAs: "ಹೀಗೆ ಲಾಗಿನ್ ಆಗಿದೆ:",
        logout: "ಲಾಗ್‌ಔಟ್",
        loginAs: "ಇದರಂತೆ ಲಾಗಿನ್ ಮಾಡಿ (ಅಣಕು)",
        accessDenied: "ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ",
        loginPrompt: "ಈ ಪ್ರಶ್ನೆಯನ್ನು ವೀಕ್ಷಿಸಲು ನೀವು ರೈತರಾಗಿ ಲಾಗಿನ್ ಆಗಿರಬೇಕು.",
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

    useEffect(() => {
        setLoggedInUser(getCurrentUser());
    }, []);

    useEffect(() => {
        if (!isAuthenticated()) {
            setLoading(false);
            return;
        }

        if (!id) return;

        async function fetchData() {
            try {
                const questionResponse = await fetch(`/api/questions/${id}`);
                if (!questionResponse.ok) {
                    throw new Error(`${t.failedToLoadQuestion} ${questionResponse.statusText}`);
                }
                const questionData: Question = await questionResponse.json();
                setQuestion(questionData);

                const answersResponse = await fetch(`/api/questions/${id}/answers`);
                if (!answersResponse.ok) {
                    throw new Error(`${t.failedToLoadAnswers} ${answersResponse.statusText}`);
                }
                const answersData: Answer[] = await answersResponse.json();
                setAnswers(answersData);

            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, loggedInUser, t]); // Re-fetch on ID or login change

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswerFormData({ ...answerFormData, [e.target.name]: e.target.value });
    };

    const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmittingAnswer(true);
        setAnswerError(null);

        if (!loggedInUser) {
            setAnswerError(t.missingFieldsAnswer);
            setIsSubmittingAnswer(false);
            return;
        }

        try {
            const response = await fetch(`/api/questions/${id}/answers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...answerFormData,
                    authorId: loggedInUser.id,
                    authorUsername: loggedInUser.username,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || t.failedToSubmitAnswer);
            }

            const newAnswer: Answer = await response.json();
            setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
            setAnswerFormData({ content: '' }); // Clear form

            if (question) {
                setQuestion({ ...question, answersCount: question.answersCount + 1 });
            }

        } catch (e: any) {
            setAnswerError(e.message);
        } finally {
            setIsSubmittingAnswer(false);
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

    if (loading || !loggedInUser) {
        // Render the access denied page if not authenticated or still loading user
        if (!isAuthenticated()) {
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
        return <div className="text-center py-8 text-gray-700">Loading question...</div>;
    }

    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    if (!question) return <div className="text-center py-8 text-gray-600">{t.questionNotFound}</div>;

    const formattedDate = new Date(question.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

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

            <main className="flex-1 container mx-auto p-4 max-w-3xl">
                <Link href="/forum" className="text-blue-600 hover:underline mb-4 block">
                    &larr; {t.backToAllQuestions}
                </Link>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
                    <h1 className="text-3xl font-bold text-blue-800 mb-2">{question.title}</h1>
                    <p className="text-gray-600 text-sm mb-4">
                        {t.askedBy} <span className="font-medium text-green-600">{question.authorUsername}</span> {t.on} {formattedDate}
                    </p>
                    <div className="prose max-w-none text-gray-800 leading-relaxed mb-6">
                        <p>{question.content}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.answers} ({answers.length})</h2>
                    {answers.length === 0 ? (
                        <p className="text-gray-600 mb-4">{t.noAnswersYet}</p>
                    ) : (
                        <div className="space-y-4 mb-6">
                            {answers.map((answer) => (
                                <div key={answer.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                    <p className="text-gray-800">{answer.content}</p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        {t.byTeamRegenesis} <span className="font-medium">{answer.authorUsername}</span> {t.on}{' '}
                                        {new Date(answer.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                            ></textarea>
                        </div>
                        <p className="text-gray-600 text-sm italic">
                            {t.postAs} <span className="font-semibold text-blue-700">{loggedInUser?.username}</span>
                        </p>
                        <button
                            type="submit"
                            disabled={isSubmittingAnswer}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                        >
                            {isSubmittingAnswer ? t.submitting : t.submitAnswer}
                        </button>
                    </form>
                </div>
            </main>

            {/* Footer - Copied from marketplace/page.tsx pattern */}
            <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner mt-auto">
                <p className="mb-1 text-base font-semibold">{t.allRightsReserved}</p>
                <p className="text-xs">{t.builtWith} <span className="text-pink-300">❤️</span> {t.byTeamRegenesis}</p>
            </footer>
        </div>
    );
}