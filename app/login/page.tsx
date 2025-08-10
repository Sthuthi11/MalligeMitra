"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import GoogleTranslateWidgetBlended from '../../lib/GoogleTranslateWidgetBlended'; // Import the Google Translate component

// A small, reusable component for the login form fields.
const LoginForm = ({ roleName, onSubmit }: { roleName: string; onSubmit: (e: React.FormEvent) => void }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{roleName} Login</h2>
        
        {/* Username Input */}
        <div>
          <label htmlFor={`${roleName.toLowerCase()}-username`} className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id={`${roleName.toLowerCase()}-username`}
            name="username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor={`${roleName.toLowerCase()}-password`} className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id={`${roleName.toLowerCase()}-password`}
            name="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder=""
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
          Login as {roleName}
        </button>

        {/* Link to Register Page, now correctly pointing to /signup */}
        <p className="text-center text-sm text-gray-600 pt-2">
          No account?{' '}
          <Link href="/signup" className="text-green-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
};


// This is your main page component.
export default function LoginPage() {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  // This handles the form submission and redirects the user
  const handleLoginFormSubmit = (roleId: string) => (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get('username');

    console.log(`Login Form Submitted for ${roleId}`, Object.fromEntries(formData));

    // Simulate a successful login and then redirect
    // In a real application, you would make an API call here.
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    messageBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
        <p class="text-lg font-semibold text-gray-800 mb-4">Login Successful!</p>
        <p class="text-gray-600 mb-4">Welcome back, ${username}!</p>
      </div>
    `;
    document.body.appendChild(messageBox);
    
    // Redirect to the dashboard after a short delay to show the message
    setTimeout(() => {
        messageBox.remove();
        router.push(`/${roleId}`);
    }, 1500); // 1.5 seconds delay

  };

  const roleData = [
    { id: 'farmer', name: 'Farmer', image: '/farmer.png' },
    { id: 'laborer', name: 'Laborer', image: '/laborers.png' },
    { id: 'vendor', name: 'Vendor/Shopper', image: '/shop.png' },
    { id: 'industry', name: 'Fragrance/Cosmetic Industry', image: '/industry.png' },
    { id: 'consultancy', name: 'Consultancy', image: '/consultancy.png' },
  ];

  return (
    <>
      <header className="app-header shadow-sm py-4 px-6 md:px-10 flex justify-between items-center">
        <div className="text-2xl font-bold text-white title-font">MalligeMitra</div>
        <nav className="flex items-center space-x-4">
          <Link href="/" className="text-white hover:text-green-200 px-3 py-2 rounded-md transition-colors duration-200">
            Home
          </Link>
          <GoogleTranslateWidgetBlended /> {/* Added the Google Translate component here */}
        </nav>
      </header>

      <main id="dynamic-content-area" className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-start relative z-10">
        <section className="page-section w-full max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 overflow-hidden">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 title-font">Login to MalligeMitra</h1>
            
            {!activeRole && (
              <p id="initial-message" className="text-center text-gray-600 mb-8">Please select your role to proceed.</p>
            )}

            <div id="role-grp" className={`role-grp flex flex-wrap justify-center gap-6 mb-10 ${activeRole ? 'grp-compact' : ''}`}>
              {roleData.map((role) => (
                <div 
                  key={role.id}
                  id={`${role.id}-option`}
                  className={`role-item flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-green-500 w-40 h-40 justify-center text-center ${activeRole === role.id ? 'item-active' : ''}`}
                  onClick={() => setActiveRole(role.id)}
                >
                  <img src={role.image} alt={`${role.name} Icon`} className="w-16 h-16 mb-3 object-contain" />
                  <span className="text-lg font-semibold text-gray-800">{role.name}</span>
                </div>
              ))}
            </div>

            <div id="form-box" className={`mt-8 p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-200 ${activeRole ? 'form-show' : ''}`}>
              {activeRole === 'farmer' && <LoginForm roleName="Farmer" onSubmit={handleLoginFormSubmit('farmer')} />}
              {activeRole === 'laborer' && <LoginForm roleName="Laborer" onSubmit={handleLoginFormSubmit('laborer')} />}
              {activeRole === 'vendor' && <LoginForm roleName="Vendor" onSubmit={handleLoginFormSubmit('vendor')} />}
              {activeRole === 'industry' && <LoginForm roleName="Industry" onSubmit={handleLoginFormSubmit('industry')} />}
              {activeRole === 'consultancy' && <LoginForm roleName="Consultancy" onSubmit={handleLoginFormSubmit('consultancy')} />}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-700 text-white py-6 mt-auto">
        <div className="container mx-auto text-center text-sm">
            &copy; 2025 MalligeMitra. All rights reserved.
        </div>
      </footer>

      <style jsx global>{`
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F0FDF4;
            position: relative;
            overflow-x: hidden;
        }
        input, select, textarea {
            color: #1f2937;
        }
        .title-font {
            font-family: 'Montserrat', sans-serif;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                url('/farmer.png'),
                url('/laborers.png'),
                url('/shop.png'),
                url('/industry.png'),
                url('/consultancy.png');
            background-repeat: repeat;
            background-size: 400px 400px;
            background-position: 10% 10%, 70% 20%, 30% 80%, 90% 50%, 50% 40%;
            opacity: 0.015;
            pointer-events: none;
            z-index: 0;
        }
        .app-header {
            background-color: #047857;
        }
        .app-header .title-font,
        .app-header a,
        .app-header #language-selector,
        .app-header #language-selector + div svg {
            color: #FFFFFF;
        }
        .app-header a:hover {
            color: #D1FAE5;
        }
        .role-grp {
            transition: all 0.5s ease-in-out;
            padding: 1.5rem;
            margin-bottom: 2.5rem;
            height: auto;
            align-items: center;
            flex-wrap: nowrap;
            justify-content: center;
        }
        .role-grp.grp-compact {
            height: 120px;
            padding: 0.5rem 1rem;
            justify-content: center;
            gap: 0.75rem;
            background-color: #f8f8f8;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 1rem;
            flex-wrap: nowrap;
        }
        .role-item {
            transition: all 0.3s ease-in-out;
            position: relative;
            background-color: #D1FAE5;
            flex-shrink: 0;
            width: 18%;
            min-width: 120px;
            max-width: 160px;
            height: 160px;
            padding: 1rem;
        }
        .role-grp.grp-compact .role-item {
            width: 100px;
            height: 100px;
            padding: 0.25rem;
            box-shadow: none;
            transform: none;
            border-color: transparent !important;
        }
        .role-grp.grp-compact .role-item.item-active {
            border-width: 2px;
            border-style: solid;
            background-color: #ECFDF5;
        }
        .role-grp.grp-compact .role-item:hover {
            transform: scale(1.1);
            z-index: 10;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            background-color: #F0FDF4;
        }
        .role-grp.grp-compact .role-item img {
            width: 64px;
            height: 64px;
            margin-bottom: 0;
            transition: all 0.3s ease-in-out;
        }
        .role-item span {
            font-size: 0.8rem;
            font-weight: 600;
            text-align: center;
            line-height: 1.2;
            padding: 0 0.1rem;
            word-break: break-word;
        }
        .role-grp.grp-compact .role-item span {
            font-size: 0.7rem;
            transition: all 0.3s ease-in-out;
            opacity: 0;
            position: absolute;
            pointer-events: none;
            top: 50%;
            white-space: nowrap;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
        .role-grp.grp-compact .role-item:hover span {
            opacity: 1;
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(255, 255, 255, 0.95);
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            white-space: nowrap;
            font-size: 0.875rem;
            color: #333;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        #form-box {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out, margin-top 0.5s ease-in-out; 
            margin-top: 2.5rem;
        }
        #form-box.form-show {
            opacity: 1;
            transform: translateY(0);
            margin-top: 1rem;
        }
        .page-section {
            transition: opacity 0.5s ease-in-out;
            width: 100%;
        }
        .page-section.hidden {
            opacity: 0;
            pointer-events: none;
            height: 0;
            overflow: hidden;
        }
      `}</style>
    </>
  );
}
