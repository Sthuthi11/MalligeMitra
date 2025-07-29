"use client";

export default function FarmerForum() {
  return (
    <main className="font-sans text-neutral-900 bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="w-full bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white text-sm flex items-center px-4 py-2">
        <img src="/icon.jpg" alt="MalligeMitra Logo" className="h-8 w-8 rounded-full object-cover mr-3" />
        <span className="font-bold text-lg">MalligeMitra Farmer Forum</span>
      </div>
      <section className="py-10 px-6 w-full max-w-3xl flex flex-col items-center">
        <h1 className="font-extrabold text-emerald-800 mb-6 text-2xl md:text-3xl drop-shadow-lg">Farmer Forum</h1>
        <div className="bg-white rounded-lg border border-lime-200 shadow p-6 w-full mb-8">
          <p className="text-neutral-700 mb-4">Welcome to the Farmer Forum! Here you can discuss farming tips, ask questions, and connect with other farmers in the community.</p>
          <div className="text-neutral-500 text-sm">(Forum functionality coming soon...)</div>
        </div>
      <select className="absolute top-2 right-4 bg-white text-emerald-700 rounded px-2 py-1 text-xs font-semibold shadow focus:outline-none" defaultValue="en">
        <option value="en">English</option>
        <option value="kn">Kannada</option>
      </select>
      </section>
      <footer className="bg-gradient-to-r from-emerald-700 via-lime-600 to-green-700 text-white py-3 text-center shadow-inner w-full">
        <p className="mb-1 text-base font-semibold">&copy; 2025 MalligeMitra. All rights reserved.</p>
        <p className="text-xs">Built with <span className="text-pink-300">❤️</span> by Team Regenesis</p>
      </footer>
    </main>
  );
}
