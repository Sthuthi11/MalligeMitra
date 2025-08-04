import GoogleTranslateWidget from '../../lib/GoogleTranslateWidget';
// This is the most important line! It tells Next.js to run this code in the browser.
"use client";

import { useEffect } from 'react';
import Link from 'next/link';

// This is your main page component. It now contains EVERYTHING.
export default function RegisterPage() {
  
  // This hook runs all the interactive TypeScript logic after the page has loaded.
  useEffect(() => {
    // --- Global Elements ---
    const navHome = document.getElementById('nav-home') as HTMLAnchorElement;
    const languageSelector = document.getElementById('language-selector') as HTMLSelectElement;
    const dynamicContentArea = document.getElementById('dynamic-content-area') as HTMLElement;
    const registerPageSection = document.getElementById('register-page-section') as HTMLElement;
    const loginPageSection = document.getElementById('login-page-section') as HTMLElement;
    const roleItems = document.querySelectorAll<HTMLDivElement>('.role-item');
    const roleGrp = document.getElementById('role-grp') as HTMLDivElement;
    const formBox = document.getElementById('form-box') as HTMLDivElement;
    const initialMessage = document.getElementById('initial-message') as HTMLParagraphElement;
    const registerForms: { [key: string]: HTMLFormElement | null } = {
        'farmer-option': document.getElementById('farmer-form') as HTMLFormElement,
        'labourer-option': document.getElementById('labourer-form') as HTMLFormElement,
        'vendor-option': document.getElementById('vendor-form') as HTMLFormElement,
        'industry-option': document.getElementById('industry-form') as HTMLFormElement,
        'consultancy-option': document.getElementById('consultancy-form') as HTMLFormElement
    };
    const loginToRegisterLink = document.getElementById('login-to-register') as HTMLAnchorElement;
    const consultantOwnEquipment = document.getElementById('consultant-own-equipment') as HTMLSelectElement;
    const equipmentTypeDiv = document.getElementById('equipment-type-div') as HTMLDivElement;

    // --- Function to switch between sections ---
    function showSection(sectionToShowId: 'register-page-section' | 'login-page-section') {
        const sections: (HTMLElement | null)[] = [registerPageSection, loginPageSection];
        sections.forEach(section => {
            if(section) {
                if (section.id === sectionToShowId) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            }
        });
        if(dynamicContentArea) dynamicContentArea.scrollTop = 0;
        if (sectionToShowId !== 'register-page-section') {
            roleGrp?.classList.remove('grp-compact');
            initialMessage?.classList.remove('hidden');
            Object.values(registerForms).forEach(form => form?.classList.add('hidden'));
            formBox?.classList.remove('form-show');
            roleItems.forEach(opt => {
                opt.classList.remove('item-active');
                opt.style.borderColor = '';
            });
        }
    }
    showSection('register-page-section');

    // --- Event Listeners ---
    navHome?.addEventListener('click', (e: MouseEvent) => { e.preventDefault(); showSection('register-page-section'); });
    loginToRegisterLink?.addEventListener('click', (e: MouseEvent) => { e.preventDefault(); showSection('register-page-section'); });
    languageSelector?.addEventListener('change', (event: Event) => { console.log('Language changed to:', (event.target as HTMLSelectElement).value); });
    roleItems.forEach(item => {
        item.addEventListener('click', () => {
            roleItems.forEach(opt => {
                opt.classList.remove('item-active');
                opt.style.borderColor = '';
            });
            roleGrp?.classList.add('grp-compact');
            item.classList.add('item-active');
            item.style.borderColor = item.id === 'consultancy-option' ? '#34D399' : '#16A34A';
            initialMessage?.classList.add('hidden');
            Object.values(registerForms).forEach(form => form?.classList.add('hidden'));
            const selectedForm = registerForms[item.id];
            if (selectedForm) {
                formBox?.classList.remove('form-show');
                setTimeout(() => {
                    selectedForm.classList.remove('hidden');
                    formBox?.classList.add('form-show');
                }, 100);
            }
        });
    });
    const handleFormSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => { data[key] = value; });
        console.log(`Form Submitted (${form.id}):`, data);
        const messageBox = document.createElement('div');
        messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        messageBox.innerHTML = `<div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto"><p class="text-lg font-semibold text-gray-800 mb-4">Registration form submitted!</p><p class="text-gray-600 mb-4">Check the Profile for submitted data.</p><button id="close-message-${form.id}" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md">Close</button></div>`;
        document.body.appendChild(messageBox);
        document.getElementById(`close-message-${form.id}`)?.addEventListener('click', () => messageBox.remove());
    };
    Object.values(registerForms).forEach(form => { if(form) form.addEventListener('submit', handleFormSubmit); });
    consultantOwnEquipment?.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLSelectElement;
        if (equipmentTypeDiv) {
            equipmentTypeDiv.classList.toggle('hidden', target.value !== 'yes');
        }
    });
  }, []); // The empty array [] means this effect runs only once.

  // The return statement contains all your HTML (as JSX) and now the CSS as well.
  return (
    <>
      {/* This is the JSX (HTML) part of your component */}
    <header className="app-header shadow-sm py-4 px-6 md:px-10 flex justify-between items-center">
        <div className="text-2xl font-bold text-white title-font">MalligeMitra</div>
        <nav className="flex items-center space-x-4">
        {/* Link to go Home (the registration page) */}
        <Link href="/" className="text-white hover:text-green-200 px-3 py-2 rounded-md transition-colors duration-200">
            Home
        </Link>
        {/* <div className="relative">
            <select id="language-selector" className="block appearance-none w-full bg-transparent border border-white text-white py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200">
            <GoogleTranslateWidget />
            <option value="kn" className="text-gray-800">Kannada</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
        </div> */}
        </nav>
    </header>

      <main id="dynamic-content-area" className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-start relative z-10">
        <section id="register-page-section" className="page-section w-full max-w-4xl">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 overflow-hidden">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 title-font">Register with MalligeMitra</h1>
                <p id="initial-message" className="text-center text-gray-600 mb-8">Please select your role to proceed with registration.</p>
                <div id="role-grp" className="role-grp flex flex-wrap justify-center gap-6 mb-10">
                    <div id="farmer-option" className="role-item flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-green-500 w-40 h-40 justify-center text-center">
                        <img src="/farmer.png" alt="Farmer Icon" className="w-16 h-16 mb-3 object-contain" />
                        <span className="text-lg font-semibold text-gray-800">Farmer</span>
                    </div>
                    <div id="labourer-option" className="role-item flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-green-500 w-40 h-40 justify-center text-center">
                        <img src="/laborers.png" alt="Labourer Icon" className="w-16 h-16 mb-3 object-contain" />
                        <span className="text-lg font-semibold text-gray-800">Labourer</span>
                    </div>
                    <div id="vendor-option" className="role-item flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-green-500 w-40 h-40 justify-center text-center">
                        <img src="/shop.png" alt="Vendor/Shopper Icon" className="w-16 h-16 mb-3 object-contain" />
                        <span className="text-lg font-semibold text-gray-800">Vendor/Shopper</span>
                    </div>
                    <div id="industry-option" className="role-item flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-green-500 w-40 h-40 justify-center text-center">
                        <img src="/industry.png" alt="Industry Icon" className="w-16 h-16 mb-3 object-contain" />
                        <span className="text-lg font-semibold text-gray-800">Fragrance/   Cosmetic Industry</span>
                    </div>
                    <div id="consultancy-option" className="role-item flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-green-500 w-40 h-40 justify-center text-center">
                        <img src="/consultancy.png" alt="Consultancy Icon" className="w-16 h-16 mb-3 object-contain" />
                        <span className="text-lg font-semibold text-gray-800">Consultancy</span>
                    </div>
                </div>
                <div id="form-box" className="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                    <form id="farmer-form" className="hidden space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Farmer Registration</h2>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Personal Information</legend>
                            <div>
                                <label htmlFor="farmer-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" id="farmer-name" name="farmerName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="John Doe" required />
                            </div>
                            <div>
                                <label htmlFor="farmer-gender" className="block text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
                                <select id="farmer-gender" name="farmerGender" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="farmer-dob" className="block text-sm font-medium text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                                <input type="date" id="farmer-dob" name="farmerDob" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="id-doc-type" className="block text-sm font-medium text-gray-700">Identity Document Type <span className="text-red-500">*</span></label>
                                    <select id="id-doc-type" name="idDocType" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                                        <option value="">Select Document</option>
                                        <option value="aadhaar">Aadhaar</option>
                                        <option value="voterid">Voter ID</option>
                                        <option value="pan">PAN</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="id-doc-number" className="block text-sm font-medium text-gray-700">Identity Document Number <span className="text-red-500">*</span></label>
                                    <input type="text" id="id-doc-number" name="idDocNumber" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., XXXXXXXXXXXX" required />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Contact Information</legend>
                            <div>
                                <label htmlFor="farmer-mobile" className="block text-sm font-medium text-gray-700">Mobile Number (for OTP verification) <span className="text-red-500">*</span></label>
                                <input type="tel" id="farmer-mobile" name="farmerMobile" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., +919876543210" pattern="[0-9]{10,15}" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Residential Address <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="res-village" className="block text-xs font-medium text-gray-600">Village</label>
                                        <input type="text" id="res-village" name="resVillage" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Village Name" required />
                                    </div>
                                    <div>
                                        <label htmlFor="res-taluka" className="block text-xs font-medium text-gray-600">Taluka</label>
                                        <input type="text" id="res-taluka" name="resTaluka" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Taluka Name" required />
                                    </div>
                                    <div>
                                        <label htmlFor="res-district" className="block text-xs font-medium text-gray-600">District</label>
                                        <input type="text" id="res-district" name="resDistrict" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="District Name" required />
                                    </div>
                                    <div>
                                        <label htmlFor="res-state" className="block text-xs font-medium text-gray-600">State</label>
                                        <input type="text" id="res-state" name="resState" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="State Name" required />
                                    </div>
                                    <div className="col-span-full sm:col-span-1">
                                        <label htmlFor="res-pincode" className="block text-xs font-medium text-gray-600">Pin Code</label>
                                        <input type="text" id="res-pincode" name="resPincode" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., 575001" pattern="[0-9]{6}" required />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Land and Farm Details</legend>
                            <div>
                                <label htmlFor="farm-address" className="block text-sm font-medium text-gray-700">Farm/Land Address (optional)</label>
                                <textarea id="farm-address" name="farmAddress" rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Survey No. 123, Village, District"></textarea>
                            </div>
                            <div>
                                <label htmlFor="farm-size" className="block text-sm font-medium text-gray-700">Size of Farm (acres/hectares)</label>
                                <input type="text" id="farm-size" name="farmSize" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., 10 Acres or 4 Hectares" />
                            </div>
                            <div>
                                <label htmlFor="farm-ownership" className="block text-sm font-medium text-gray-700">Farm Ownership Status</label>
                                <select id="farm-ownership" name="farmOwnership" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                                    <option value="">Select Status</option>
                                    <option value="owned">Owned</option>
                                    <option value="leased">Leased</option>
                                    <option value="shared">Shared</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="land-doc-upload" className="block text-sm font-medium text-gray-700">Land Document Upload (optional)</label>
                                <input type="file" id="land-doc-upload" name="landDocUpload" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                            </div>
                        </fieldset>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Account Security</legend>
                            <div>
                                <label htmlFor="farmer-password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                                <input type="password" id="farmer-password" name="farmerPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="********" required />
                            </div>
                            <div>
                                <label htmlFor="farmer-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                                <input type="password" id="farmer-confirm-password" name="farmerConfirmPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="********" required />
                            </div>
                        </fieldset>
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">Register as Farmer</button>
                    </form>
                    <form id="labourer-form" className="hidden space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Labourer Registration</h2>
                        <div>
                            <label htmlFor="labourer-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                            <input type="text" id="labourer-name" name="labourerName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Jane Doe" required />
                        </div>
                        <div>
                            <label htmlFor="labourer-email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                            <input type="email" id="labourer-email" name="labourerEmail" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="jane.doe@example.com" required />
                        </div>
                        <div>
                            <label htmlFor="labourer-password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                            <input type="password" id="labourer-password" name="labourerPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="********" required />
                        </div>
                        <div>
                            <label htmlFor="labourer-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                            <input type="password" id="labourer-confirm-password" name="labourerConfirmPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="********" required />
                        </div>
                        <div>
                            <label htmlFor="labourer-skills" className="block text-sm font-medium text-gray-700">Skills (e.g., harvesting, planting)</label>
                            <input type="text" id="labourer-skills" name="labourerSkills" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="e.g., Tractor operation, Irrigation" />
                        </div>
                        <div>
                            <label htmlFor="preferred-work-type" className="block text-sm font-medium text-gray-700">Preferred Work Type</label>
                            <select id="preferred-work-type" name="preferredWorkType" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                <option value="">Select...</option>
                                <option value="daily">Daily Wage</option>
                                <option value="contract">Contract Based</option>
                                <option value="seasonal">Seasonal</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="labourer-availability" className="block text-sm font-medium text-gray-700">Availability (e.g., Full-time, Part-time)</label>
                            <input type="text" id="labourer-availability" name="labourerAvailability" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="e.g., Mon-Fri, Weekends" />
                        </div>
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">Register as Labourer</button>
                    </form>
                    <form id="vendor-form" className="hidden space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vendor/Shopper Registration</h2>
                        <div>
                            <label htmlFor="vendor-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                            <input type="text" id="vendor-name" name="vendorName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="Alice Smith" required />
                        </div>
                        <div>
                            <label htmlFor="vendor-email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                            <input type="email" id="vendor-email" name="vendorEmail" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="alice.smith@example.com" required />
                        </div>
                        <div>
                            <label htmlFor="vendor-password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                            <input type="password" id="vendor-password" name="vendorPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="********" required />
                        </div>
                        <div>
                            <label htmlFor="vendor-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                            <input type="password" id="vendor-confirm-password" name="vendorConfirmPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="********" required />
                        </div>
                        <div>
                            <label htmlFor="business-name" className="block text-sm font-medium text-gray-700">Business Name (if applicable)</label>
                            <input type="text" id="business-name" name="businessName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="e.g., Green Grocers" />
                        </div>
                        <div>
                            <label htmlFor="product-category" className="block text-sm font-medium text-gray-700">Primary Product Category</label>
                            <input type="text" id="product-category" name="productCategory" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="e.g., Organic Produce, Dairy, Fertilizers" />
                        </div>
                        <div>
                            <label htmlFor="delivery-area" className="block text-sm font-medium text-gray-700">Preferred Delivery/Service Area</label>
                            <input type="text" id="delivery-area" name="deliveryArea" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="e.g., City, State, Pincode" />
                        </div>
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">Register as Vendor/Shopper</button>
                    </form>
                    <form id="industry-form" className="hidden space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Industry Registration</h2>
                        <div>
                            <label htmlFor="industry-name" className="block text-sm font-medium text-gray-700">Company Name <span className="text-red-500">*</span></label>
                            <input type="text" id="industry-name" name="industryName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="AgroTech Solutions Pvt. Ltd." required />
                        </div>
                        <div>
                            <label htmlFor="industry-email" className="block text-sm font-medium text-gray-700">Company Email Address <span className="text-red-500">*</span></label>
                            <input type="email" id="industry-email" name="industryEmail" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="contact@agrotech.com" required />
                        </div>
                        <div>
                            <label htmlFor="industry-password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                            <input type="password" id="industry-password" name="industryPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="********" required />
                        </div>
                        <div>
                            <label htmlFor="industry-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                            <input type="password" id="industry-confirm-password" name="industryConfirmPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="********" required />
                        </div>
                        <div>
                            <label htmlFor="industry-sector" className="block text-sm font-medium text-gray-700">Industry Sector</label>
                            <input type="text" id="industry-sector" name="industrySector" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="e.g., Agri-tech, Food Processing, Logistics" />
                        </div>
                        <div>
                            <label htmlFor="primary-interest" className="block text-sm font-medium text-gray-700">Primary Interest in Agriculture</label>
                            <input type="text" id="primary-interest" name="primaryInterest" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="e.g., Sourcing raw materials, Technology adoption" />
                        </div>
                        <div>
                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">Company Website (Optional)</label>
                            <input type="url" id="company-website" name="companyWebsite" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="https://www.agrotech.com" />
                        </div>
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">Register as Industry</button>
                    </form>
                    <form id="consultancy-form" className="hidden space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consultancy Registration</h2>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Personal & Contact Information</legend>
                            <div>
                                <label htmlFor="consultant-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" id="consultant-name" name="consultantName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="John Doe" required />
                            </div>
                            <div>
                                <label htmlFor="consultant-phone" className="block text-sm font-medium text-gray-700">Phone Number (WhatsApp preferred?) <span className="text-red-500">*</span></label>
                                <input type="tel" id="consultant-phone" name="consultantPhone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="+919876543210" required />
                            </div>
                            <div>
                                <label htmlFor="consultant-email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" id="consultant-email" name="consultantEmail" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="john.doe@example.com" required />
                            </div>
                            <div>
                                <label htmlFor="consultant-address" className="block text-sm font-medium text-gray-700">Address/Location <span className="text-red-500">*</span></label>
                                <textarea id="consultant-address" name="consultantAddress" rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Village, Taluka, District, State, Pin Code" required></textarea>
                            </div>
                            <div>
                                <label htmlFor="consultant-id-proof" className="block text-sm font-medium text-gray-700">ID Proof (optional)</label>
                                <select id="consultant-id-proof" name="consultantIdProof" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                                    <option value="">Select ID Type</option>
                                    <option value="aadhaar">Aadhaar</option>
                                    <option value="pan">PAN</option>
                                    <option value="driving_license">Driving License</option>
                                </select>
                            </div>
                        </fieldset>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Professional Background</legend>
                            <div>
                                <label htmlFor="consultant-type" className="block text-sm font-medium text-gray-700">Consultant Type <span className="text-red-500">*</span></label>
                                <select id="consultant-type" name="consultantType" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                                    <option value="">Select Type</option>
                                    <option value="soil_testing">Soil Testing</option>
                                    <option value="crop_advisor">Crop Advisor</option>
                                    <option value="fertilizer_expert">Fertilizer Expert</option>
                                    <option value="irrigation_specialist">Irrigation Specialist</option>
                                    <option value="drone_operator">Drone Operator</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="consultant-experience" className="block text-sm font-medium text-gray-700">Years of Experience <span className="text-red-500">*</span></label>
                                <input type="number" id="consultant-experience" name="consultantExperience" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., 5" required />
                            </div>
                            <div>
                                <label htmlFor="consultant-certifications" className="block text-sm font-medium text-gray-700">Certifications / Licenses</label>
                                <input type="text" id="consultant-certifications" name="consultantCertifications" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Soil Testing Certification" />
                            </div>
                            <div>
                                <label htmlFor="consultant-organization" className="block text-sm font-medium text-gray-700">Affiliated Organization (optional)</label>
                                <input type="text" id="consultant-organization" name="consultantOrganization" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., AgriTech Solutions" />
                            </div>
                        </fieldset>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Expertise Areas</legend>
                            <div>
                                <label htmlFor="consultant-crops" className="block text-sm font-medium text-gray-700">Crops Specialized In</label>
                                <input type="text" id="consultant-crops" name="consultantCrops" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Paddy, Wheat, Sugarcane" />
                            </div>
                            <div>
                                <label htmlFor="consultant-services" className="block text-sm font-medium text-gray-700">Services Provided</label>
                                <input type="text" id="consultant-services" name="consultantServices" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Pest Management, Irrigation Planning" />
                            </div>
                            <div>
                                <label htmlFor="consultant-tech-skills" className="block text-sm font-medium text-gray-700">Technology Skills</label>
                                <input type="text" id="consultant-tech-skills" name="consultantTechSkills" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Drones, IoT Sensors, Mobile Apps" />
                            </div>
                        </fieldset>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Service Preferences</legend>
                            <div>
                                <label htmlFor="consultant-region" className="block text-sm font-medium text-gray-700">Preferred Region (District/State) <span className="text-red-500">*</span></label>
                                <input type="text" id="consultant-region" name="consultantRegion" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Mangaluru, Karnataka" required />
                            </div>
                            <div>
                                <label htmlFor="consultant-languages" className="block text-sm font-medium text-gray-700">Languages Known <span className="text-red-500">*</span></label>
                                <input type="text" id="consultant-languages" name="consultantLanguages" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., English, Kannada, Hindi" required />
                            </div>
                            <div>
                                <label htmlFor="consultant-mode" className="block text-sm font-medium text-gray-700">Mode of Service <span className="text-red-500">*</span></label>
                                <select id="consultant-mode" name="consultantMode" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                                    <option value="">Select Mode</option>
                                    <option value="on-site">On-site</option>
                                    <option value="remote">Remote</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="consultant-availability" className="block text-sm font-medium text-gray-700">Availability <span className="text-red-500">*</span></label>
                                <select id="consultant-availability" name="consultantAvailability" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                                    <option value="">Select Availability</option>
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="seasonal">Seasonal</option>
                                </select>
                            </div>
                        </fieldset>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Tools & Equipment</legend>
                            <div>
                                <label htmlFor="consultant-own-equipment" className="block text-sm font-medium text-gray-700">Do you own soil testing kits, drones, or equipment? <span className="text-red-500">*</span></label>
                                <select id="consultant-own-equipment" name="consultantOwnEquipment" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                                    <option value="">Select Option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div id="equipment-type-div" className="hidden">
                                <label htmlFor="consultant-equipment-type" className="block text-sm font-medium text-gray-700">Type of equipment</label>
                                <input type="text" id="consultant-equipment-type" name="consultantEquipmentType" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Drone DJI Mavic, pH meter" />
                            </div>
                            <div>
                                <label htmlFor="consultant-rent-equipment" className="block text-sm font-medium text-gray-700">Willing to rent/share equipment? (optional)</label>
                                <select id="consultant-rent-equipment" name="consultantRentEquipment" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                                    <option value="">Select Option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </fieldset>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Payment & Engagement</legend>
                            <div>
                                <label htmlFor="consultant-fee-structure" className="block text-sm font-medium text-gray-700">Expected Fee Structure <span className="text-red-500">*</span></label>
                                <input type="text" id="consultant-fee-structure" name="consultantFeeStructure" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Rs. 500/visit, Rs. 1000/acre" required />
                            </div>
                            <div>
                                <label htmlFor="consultant-gov-schemes" className="block text-sm font-medium text-gray-700">Willingness to work with government schemes / NGOs? <span className="text-red-500">*</span></label>
                                <select id="consultant-gov-schemes" name="consultantGovSchemes" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                                    <option value="">Select Option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </fieldset>
                        <fieldset className="border p-4 rounded-md shadow-sm">
                            <legend className="text-lg font-medium text-gray-700 px-2">Other Information</legend>
                            <div>
                                <label htmlFor="consultant-alt-contact" className="block text-sm font-medium text-gray-700">Alternate Contact Person</label>
                                <input type="text" id="consultant-alt-contact" name="consultantAltContact" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Name and Phone Number" />
                            </div>
                            <div>
                                <label htmlFor="consultant-prev-networks" className="block text-sm font-medium text-gray-700">Any Previous Farmer Networks Worked With (optional)</label>
                                <input type="text" id="consultant-prev-networks" name="consultantPrevNetworks" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Krishi Vikas Kendra" />
                            </div>
                            <div>
                                <label htmlFor="consultant-data-consent" className="block text-sm font-medium text-gray-700">Consent to Data Usage <span className="text-red-500">*</span></label>
                                <select id="consultant-data-consent" name="consultantDataConsent" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                                    <option value="">Select Option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="space-y-2 mt-4">
                                <label className="block text-lg font-medium text-gray-700">Optional Add-ons</label>
                                <div>
                                    <label htmlFor="consultant-profile-photo" className="block text-sm font-medium text-gray-700">Upload Profile Photo</label>
                                    <input type="file" id="consultant-profile-photo" name="consultantProfilePhoto" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                                </div>
                                <div>
                                    <label htmlFor="consultant-upload-certs" className="block text-sm font-medium text-gray-700">Upload Certificates / ID Proof</label>
                                    <input type="file" id="consultant-upload-certs" name="consultantUploadCerts" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" multiple />
                                </div>
                                <div>
                                    <label htmlFor="consultant-sample-reports" className="block text-sm font-medium text-gray-700">Upload Sample Reports</label>
                                    <input type="file" id="consultant-sample-reports" name="consultantSampleReports" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" multiple />
                                </div>
                            </div>
                        </fieldset>
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">Register as Consultant</button>
                    </form>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-green-700 text-white py-6 mt-auto">
        <div className="container mx-auto text-center text-sm">
            &copy; 2025 MalligeMitra. All rights reserved.
        </div>
      </footer>

      {/* This is the CSS part of your component, using Next.js's built-in styled-jsx. */}
      {/* The 'global' keyword makes these styles apply everywhere, like a normal stylesheet. */}
      <style jsx global>{
      `
        /* Custom styles to ensure Inter is the default font and Montserrat for titles */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F0FDF4; /* Very light green background (Tailwind green-50) */
            position: relative; /* Needed for pseudo-element positioning */
            overflow-x: hidden; /* Prevent horizontal scroll due to background images */
        }
        /* Add this to your style tag in both files */
        input, select, textarea {
        color: #1f2937; /* A dark gray color, equivalent to Tailwind's gray-800 */
        }
        .title-font {
            font-family: 'Montserrat', sans-serif; /* A more distinct font for the title */
        }
        /* Custom scrollbar for better aesthetics */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
            cursor: pointer; /* Indicate scrollability */
        }
        /* Background with multiple, lightly repeating images */
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
            background-position: 
                10% 10%,
                70% 20%,
                30% 80%,
                90% 50%,
                50% 40%;
            opacity: 0.015;
            pointer-events: none;
            z-index: 0;
        }
        /* Custom style for the dark green header */
        .app-header {
            background-color: #047857; /* Dark green background (Tailwind emerald-700) */
        }
        /* Ensure text and links in the header are white */
        .app-header .title-font,
        .app-header a,
        .app-header #language-selector,
        .app-header #language-selector + div svg {
            color: #FFFFFF;
        }
        /* Adjust specific hover states for header links */
        .app-header a:hover {
            color: #D1FAE5;
        }
        /* Adjust language selector appearance in dark header */
        .app-header #language-selector {
            background-color: #065F46;
            border-color: #065F46;
            color: #FFFFFF;
        }
        .app-header #language-selector:focus {
            border-color: #34D399;
        }
        /* Styles for the role selection group animation */
        .role-grp {
            transition: all 0.5s ease-in-out;
            padding: 1.5rem;
            margin-bottom: 2.5rem;
            height: auto;
            align-items: center;
            flex-wrap: nowrap;
            justify-content: center;
        }
        /* Class added when a role is selected, making the group compact */
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
        /* Base styles for individual role items */
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
        /* Styles for individual role items when the parent group is in compact mode */
        .role-grp.grp-compact .role-item {
            width: 100px;
            height: 100px;
            padding: 0.25rem;
            box-shadow: none;
            transform: none;
            border-color: transparent !important;
            background-color: #D1FAE5;
        }
        /* Style for the currently selected role item when the group is compact */
        .role-grp.grp-compact .role-item.item-active {
            border-width: 2px;
            border-style: solid;
            background-color: #ECFDF5;
        }
        /* Hover effect for individual role items when the group is compact */
        .role-grp.grp-compact .role-item:hover {
            transform: scale(1.1);
            z-index: 10;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            background-color: #F0FDF4;
        }
        /* Styles for images within role items when the group is compact */
        .role-grp.grp-compact .role-item img {
            width: 64px;
            height: 64px;
            margin-bottom: 0;
            transition: all 0.3s ease-in-out;
        }
        /* Styles for text (role names) within role items (initial state) */
        .role-item span {
            font-size: 0.8rem;
            font-weight: 600;
            text-align: center;
            line-height: 1.2;
            padding: 0 0.1rem;
            word-break: break-word;
        }
        /* Styles for text (role names) within role items when the group is compact */
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
        /* Make the role name visible on hover when the group is compact */
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
        /* Styles for the dynamic form box animation */
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
        /* General styles for page sections to handle visibility */
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