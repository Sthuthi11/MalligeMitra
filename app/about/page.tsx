"use client";
import React from "react";
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended';

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

const team: TeamMember[] = [
  {
    name: "Sthuthi",
    role: "Project Lead",
    image: "/sthuthi.jpeg",
  },
  {
    name: "Vijal D'Souza",
    role: "Ideator",
    image: "/vijal.jpg",
  },
  {
    name: "Vinit",
    role: "Lead Developer",
    image: "/vinit.jpg",
  },
  {
    name: "Sudhir S Nayak",
    role: "Frontend Developer",
    image: "/sudhir.jpg",
  },
  {
    name: "Krithi S",
    role: "Developer",
    image: "/krithi.jpg",
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-lime-50 to-emerald-100">
      {/* Header (copied from Contact Us) */}
      <header className="flex items-center justify-between px-8 py-4 text-white shadow-md" style={{ backgroundColor: "#047857" }}>
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
        </div>
        <GoogleTranslateWidgetBlended />
      </header>

      <section className="py-12 px-6" id="about">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">About Us</h2>
            <p className="text-lg text-emerald-700">
              Mallige Mitra is dedicated to connecting communities and empowering users through technology and collaboration.
            </p>
          </div>

          {/* Team Display */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-emerald-800 mb-8">Meet the Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-items-center">
              {team.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-emerald-400 shadow-md mb-4"
                  />
                  <h4 className="text-xl font-semibold text-emerald-900">{member.name}</h4>
                  <p className="text-sm text-emerald-700">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission, Vision, Team Description - one below the other */}
          <div className="max-w-3xl mx-auto space-y-10 text-center">
            <div>
              <h3 className="text-2xl font-semibold text-emerald-800 mb-2">Our Mission</h3>
              <p className="text-emerald-700">
                To build a strong and inclusive platform that helps local communities, especially Mallige farmers - grow and collaborate through shared digital tools.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-emerald-800 mb-2">Our Vision</h3>
              <p className="text-emerald-700">
                Bridging the gap between traditional practices and modern technology to support sustainable and inclusive development in rural areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-3 text-center shadow-inner mt-auto" style={{ backgroundColor: "#047857" }}>
        <p className="mb-1 text-base font-semibold">© 2025 MalligeMitra. All rights reserved.</p>
        <p className="text-xs">Built with <span className="text-pink-300">❤️</span> by Team Regenesis</p>
      </footer>
    </div>
  );
};

export default AboutUs;