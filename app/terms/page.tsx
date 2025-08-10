"use client";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-lime-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 text-white shadow-md" style={{ backgroundColor: "#047857" }}>
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
        </div>
        <div className="flex items-center gap-4">
          <GoogleTranslateWidgetBlended />
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-8 py-8 gap-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-4">Terms & Conditions</h1>
        <p className="mb-6 text-lg max-w-2xl text-emerald-900">Please read our terms and conditions carefully before using MalligeMitra.</p>
        <div className="w-full max-w-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">1. Acceptance of Terms</h2>
            <p className="text-emerald-900 text-base">By accessing or using the MalligeMitra platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please discontinue using our services immediately.</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">2. User Responsibilities</h2>
            <ul className="text-emerald-900 text-base list-disc pl-6 space-y-2">
              <li>You agree to use MalligeMitra only for lawful purposes and in accordance with applicable laws and regulations.</li>
              <li>You must not attempt to disrupt or compromise the functionality, security, or integrity of the platform.</li>
              <li>You are solely responsible for the information you provide and for ensuring it is accurate and up to date.</li>
              <li>Unauthorized access, data scraping, reverse engineering, or any activity that could harm MalligeMitra is strictly prohibited.</li>
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">3. Limitation of Liability</h2>
            <ul className="text-emerald-900 text-base list-disc pl-6 space-y-2">
              <li>MalligeMitra and its team are not liable for any direct, indirect, incidental, consequential, or special damages arising from your use of the platform.</li>
              <li>We do not guarantee uninterrupted or error-free service, and we are not responsible for losses caused by downtime, technical issues, or third-party services.</li>
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">4. Updates to Terms</h2>
            <p className="text-emerald-900 text-base">We reserve the right to update or modify these Terms and Conditions at any time. Changes will be posted on this page with the updated effective date. Continued use of MalligeMitra after changes indicates your acceptance of the revised terms.</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">5. Contact Us</h2>
            <p className="text-emerald-900 text-base">For any questions or concerns regarding these Terms & Conditions, please reach out to us at:<br />
            <span className="font-medium">Email:</span> malligemitra@gmail.com</p>
          </div>
        </div>
      </main>
      <footer className="text-white py-3 text-center shadow-inner mt-auto" style={{ backgroundColor: "#047857" }}>
        <p className="mb-1 text-base font-semibold">© 2025 MalligeMitra. All rights reserved.</p>
        <p className="text-xs">Built with <span className="text-pink-300">❤️</span> by Team Regenesis</p>
      </footer>
    </div>
  );
}
