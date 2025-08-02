// Tells Next.js to run this code in the browser
"use client";

import { useEffect } from 'react';
import Link from 'next/link'; // Import the Link component for navigation

// This is the Login Page component
export default function LoginPage() {

  // This hook runs the interactive code after the page has loaded
  useEffect(() => {
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    // Login Form Submission Handler
    loginForm?.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        console.log('Login attempt:', { username, password });

        const messageBox = document.createElement('div');
        messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        messageBox.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
                <p class="text-lg font-semibold text-gray-800 mb-4">Login attempt Successful!</p>
                <p class="text-gray-600 mb-2">Username: ${username}</p>
                <p class="text-gray-600 mb-4">Password: ${'*'.repeat(password.length)}</p>
                <button id="close-message-login" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md">Close</button>
            </div>
        `;
        document.body.appendChild(messageBox);

        document.getElementById('close-message-login')?.addEventListener('click', () => {
            messageBox.remove();
        });
    });
  }, []); // Empty array means this runs only once

  return (
    <>
      <header className="app-header shadow-sm py-4 px-6 md:px-10 flex justify-between items-center">
        <div className="text-2xl font-bold text-white title-font">MalligeMitra</div>
        <nav className="flex items-center space-x-4">
          <Link href="/" className="text-white hover:text-green-200 px-3 py-2 rounded-md transition-colors duration-200">
            Home
          </Link>
        </nav>
      </header>

      <main id="dynamic-content-area" className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-center relative z-10">
        <section id="login-page-section" className="page-section w-full max-w-md">
             <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 title-font">Login</h1>
                <form id="login-form" className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username or Email</label>
                        <input type="text" id="username" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="your_username or your@email.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="********" required />
                    </div>
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
                        Log In
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-green-600 hover:underline">
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </section>
      </main>

      <footer className="bg-green-700 text-white py-6 mt-auto">
        <div className="container mx-auto text-center text-sm">
            &copy; 2025 MalligeMitra. All rights reserved.
        </div>
      </footer>
      
      {/* This CSS is required for this page to function correctly */}
      <style jsx global>{`
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F0FDF4;
            position: relative;
            overflow-x: hidden;
        }
        /* Add this to your style tag in both files */
        input, select, textarea {
        color: #1f2937; /* A dark gray color, equivalent to Tailwind's gray-800 */
        }
        .title-font {
            font-family: 'Montserrat', sans-serif;
        }
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
        .app-header a {
            color: #FFFFFF;
        }
        .app-header a:hover {
            color: #D1FAE5;
        }
      `}</style>
    </>
  );
}