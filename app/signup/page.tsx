"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// A simple utility to check for password complexity
const isPasswordStrong = (password: string): boolean => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[^A-Za-z0-9]/.test(password);
};

// Form components with integrated validation
const FarmerForm = ({ onSubmit }: { onSubmit: (e: React.FormEvent, errors: any) => void }) => {
    const [errors, setErrors] = useState<any>({});

    const validateForm = (formData: FormData): boolean => {
        const newErrors: any = {};
        const farmerName = (formData.get('farmerName') as string).trim();
        const farmerGender = formData.get('farmerGender') as string;
        const farmerDob = formData.get('farmerDob') as string;
        const idDocType = formData.get('idDocType') as string;
        const idDocNumber = (formData.get('idDocNumber') as string).trim();
        const farmerMobile = (formData.get('farmerMobile') as string).trim();
        const resVillage = (formData.get('resVillage') as string).trim();
        const resTaluka = (formData.get('resTaluka') as string).trim();
        const resDistrict = (formData.get('resDistrict') as string).trim();
        const resState = (formData.get('resState') as string).trim();
        const resPincode = (formData.get('resPincode') as string).trim();
        const farmerPassword = formData.get('farmerPassword') as string;
        const farmerConfirmPassword = formData.get('farmerConfirmPassword') as string;

        // Required fields validation
        if (!farmerName) newErrors.farmerName = 'Full Name is required.';
        if (!farmerGender) newErrors.farmerGender = 'Gender is required.';
        if (!farmerDob) newErrors.farmerDob = 'Date of Birth is required.';
        if (!idDocType) newErrors.idDocType = 'ID Document Type is required.';
        if (!idDocNumber) newErrors.idDocNumber = 'ID Document Number is required.';
        if (!farmerMobile) newErrors.farmerMobile = 'Mobile Number is required.';
        if (!resVillage) newErrors.resVillage = 'Village is required.';
        if (!resTaluka) newErrors.resTaluka = 'Taluka is required.';
        if (!resDistrict) newErrors.resDistrict = 'District is required.';
        if (!resState) newErrors.resState = 'State is required.';
        if (!resPincode) newErrors.resPincode = 'Pin Code is required.';
        if (!farmerPassword) newErrors.farmerPassword = 'Password is required.';
        if (!farmerConfirmPassword) newErrors.farmerConfirmPassword = 'Confirm Password is required.';

        // Format and pattern validation
        if (farmerName && !/^[A-Za-z\s.'-]+$/.test(farmerName)) newErrors.farmerName = 'Name can only contain letters, spaces, hyphens, and apostrophes.';
        if (farmerMobile && !/^\+?[1-9]\d{9,14}$/.test(farmerMobile)) newErrors.farmerMobile = 'Invalid mobile number format. e.g., +919876543210.';
        if (resPincode && !/^\d{6}$/.test(resPincode)) newErrors.resPincode = 'Pin Code must be exactly 6 digits.';
        if (idDocNumber && idDocType === 'aadhaar' && !/^\d{12}$/.test(idDocNumber)) newErrors.idDocNumber = 'Aadhaar number must be 12 digits.';
        if (idDocNumber && idDocType === 'voterid' && !/^[A-Z]{3}\d{7}$/i.test(idDocNumber)) newErrors.idDocNumber = 'Voter ID format is invalid (e.g., ABC1234567).';
        if (idDocNumber && idDocType === 'pan' && !/^[A-Z]{5}\d{4}[A-Z]{1}$/i.test(idDocNumber)) newErrors.idDocNumber = 'PAN format is invalid (e.g., ABCDE1234F).';


        // Age validation
        if (farmerDob) {
            const today = new Date();
            const birthDate = new Date(farmerDob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                newErrors.farmerDob = 'You must be at least 18 years old to register.';
            }
        }
        
        // Password validation
        if (farmerPassword && !isPasswordStrong(farmerPassword)) newErrors.farmerPassword = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
        if (farmerPassword && farmerConfirmPassword && farmerPassword !== farmerConfirmPassword) newErrors.farmerConfirmPassword = 'Passwords do not match.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        if (validateForm(formData)) {
            onSubmit(e, errors);
        }
    };

    return (
        <form id="farmer-form" onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Farmer Registration</h2>
            <fieldset className="border p-4 rounded-md shadow-sm">
                <legend className="text-lg font-medium text-gray-700 px-2">Personal Information</legend>
                <div>
                    <label htmlFor="farmer-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" id="farmer-name" name="farmerName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="John Doe" required />
                    {errors.farmerName && <p className="text-red-500 text-xs mt-1">{errors.farmerName}</p>}
                </div>
                <div>
                    <label htmlFor="farmer-gender" className="block text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
                    <select id="farmer-gender" name="farmerGender" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.farmerGender && <p className="text-red-500 text-xs mt-1">{errors.farmerGender}</p>}
                </div>
                <div>
                    <label htmlFor="farmer-dob" className="block text-sm font-medium text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                    <input type="date" id="farmer-dob" name="farmerDob" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required />
                    {errors.farmerDob && <p className="text-red-500 text-xs mt-1">{errors.farmerDob}</p>}
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
                        {errors.idDocType && <p className="text-red-500 text-xs mt-1">{errors.idDocType}</p>}
                    </div>
                    <div>
                        <label htmlFor="id-doc-number" className="block text-sm font-medium text-gray-700">Identity Document Number <span className="text-red-500">*</span></label>
                        <input type="text" id="id-doc-number" name="idDocNumber" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., XXXXXXXXXXXX" required />
                        {errors.idDocNumber && <p className="text-red-500 text-xs mt-1">{errors.idDocNumber}</p>}
                    </div>
                </div>
            </fieldset>
            <fieldset className="border p-4 rounded-md shadow-sm">
                <legend className="text-lg font-medium text-gray-700 px-2">Contact Information</legend>
                <div>
                    <label htmlFor="farmer-mobile" className="block text-sm font-medium text-gray-700">Mobile Number (for OTP verification) <span className="text-red-500">*</span></label>
                    <input type="tel" id="farmer-mobile" name="farmerMobile" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., +919876543210" required />
                    {errors.farmerMobile && <p className="text-red-500 text-xs mt-1">{errors.farmerMobile}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Residential Address <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="res-village" className="block text-xs font-medium text-gray-600">Village</label>
                            <input type="text" id="res-village" name="resVillage" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Village Name" required />
                            {errors.resVillage && <p className="text-red-500 text-xs mt-1">{errors.resVillage}</p>}
                        </div>
                        <div>
                            <label htmlFor="res-taluka" className="block text-xs font-medium text-gray-600">Taluka</label>
                            <input type="text" id="res-taluka" name="resTaluka" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Taluka Name" required />
                            {errors.resTaluka && <p className="text-red-500 text-xs mt-1">{errors.resTaluka}</p>}
                        </div>
                        <div>
                            <label htmlFor="res-district" className="block text-xs font-medium text-gray-600">District</label>
                            <input type="text" id="res-district" name="resDistrict" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="District Name" required />
                            {errors.resDistrict && <p className="text-red-500 text-xs mt-1">{errors.resDistrict}</p>}
                        </div>
                        <div>
                            <label htmlFor="res-state" className="block text-xs font-medium text-gray-600">State</label>
                            <input type="text" id="res-state" name="resState" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="State Name" required />
                            {errors.resState && <p className="text-red-500 text-xs mt-1">{errors.resState}</p>}
                        </div>
                        <div className="col-span-full sm:col-span-1">
                            <label htmlFor="res-pincode" className="block text-xs font-medium text-gray-600">Pin Code</label>
                            <input type="text" id="res-pincode" name="resPincode" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., 575001" required />
                            {errors.resPincode && <p className="text-red-500 text-xs mt-1">{errors.resPincode}</p>}
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
                    {errors.farmerPassword && <p className="text-red-500 text-xs mt-1">{errors.farmerPassword}</p>}
                </div>
                <div>
                    <label htmlFor="farmer-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                    <input type="password" id="farmer-confirm-password" name="farmerConfirmPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="********" required />
                    {errors.farmerConfirmPassword && <p className="text-red-500 text-xs mt-1">{errors.farmerConfirmPassword}</p>}
                </div>
            </fieldset>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">Register as Farmer</button>
        </form>
    );
};

const LabourerForm = ({ onSubmit }: { onSubmit: (e: React.FormEvent, errors: any) => void }) => {
    const [errors, setErrors] = useState<any>({});

    const validateForm = (formData: FormData): boolean => {
        const newErrors: any = {};
        const labourerName = (formData.get('labourerName') as string).trim();
        const labourerEmail = (formData.get('labourerEmail') as string).trim();
        const labourerPassword = formData.get('labourerPassword') as string;
        const labourerConfirmPassword = formData.get('labourerConfirmPassword') as string;

        if (!labourerName) newErrors.labourerName = 'Full Name is required.';
        if (!labourerEmail) newErrors.labourerEmail = 'Email Address is required.';
        if (!labourerPassword) newErrors.labourerPassword = 'Password is required.';
        if (!labourerConfirmPassword) newErrors.labourerConfirmPassword = 'Confirm Password is required.';

        if (labourerName && !/^[A-Za-z\s.'-]+$/.test(labourerName)) newErrors.labourerName = 'Name can only contain letters, spaces, hyphens, and apostrophes.';
        if (labourerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(labourerEmail)) newErrors.labourerEmail = 'Invalid email address format.';
        if (labourerPassword && !isPasswordStrong(labourerPassword)) newErrors.labourerPassword = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
        if (labourerPassword && labourerConfirmPassword && labourerPassword !== labourerConfirmPassword) newErrors.labourerConfirmPassword = 'Passwords do not match.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        if (validateForm(formData)) {
            onSubmit(e, errors);
        }
    };

    return (
        <form id="labourer-form" onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Labourer Registration</h2>
            <div>
                <label htmlFor="labourer-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                <input type="text" id="labourer-name" name="labourerName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Jane Doe" required />
                {errors.labourerName && <p className="text-red-500 text-xs mt-1">{errors.labourerName}</p>}
            </div>
            <div>
                <label htmlFor="labourer-email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                <input type="email" id="labourer-email" name="labourerEmail" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="jane.doe@example.com" required />
                {errors.labourerEmail && <p className="text-red-500 text-xs mt-1">{errors.labourerEmail}</p>}
            </div>
            <div>
                <label htmlFor="labourer-password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                <input type="password" id="labourer-password" name="labourerPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="********" required />
                {errors.labourerPassword && <p className="text-red-500 text-xs mt-1">{errors.labourerPassword}</p>}
            </div>
            <div>
                <label htmlFor="labourer-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                <input type="password" id="labourer-confirm-password" name="labourerConfirmPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="********" required />
                {errors.labourerConfirmPassword && <p className="text-red-500 text-xs mt-1">{errors.labourerConfirmPassword}</p>}
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
    );
};

const VendorForm = ({ onSubmit }: { onSubmit: (e: React.FormEvent, errors: any) => void }) => {
    const [errors, setErrors] = useState<any>({});

    const validateForm = (formData: FormData): boolean => {
        const newErrors: any = {};
        const vendorName = (formData.get('vendorName') as string).trim();
        const vendorEmail = (formData.get('vendorEmail') as string).trim();
        const vendorPassword = formData.get('vendorPassword') as string;
        const vendorConfirmPassword = formData.get('vendorConfirmPassword') as string;

        if (!vendorName) newErrors.vendorName = 'Full Name is required.';
        if (!vendorEmail) newErrors.vendorEmail = 'Email Address is required.';
        if (!vendorPassword) newErrors.vendorPassword = 'Password is required.';
        if (!vendorConfirmPassword) newErrors.vendorConfirmPassword = 'Confirm Password is required.';

        if (vendorName && !/^[A-Za-z\s.'-]+$/.test(vendorName)) newErrors.vendorName = 'Name can only contain letters, spaces, hyphens, and apostrophes.';
        if (vendorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vendorEmail)) newErrors.vendorEmail = 'Invalid email address format.';
        if (vendorPassword && !isPasswordStrong(vendorPassword)) newErrors.vendorPassword = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
        if (vendorPassword && vendorConfirmPassword && vendorPassword !== vendorConfirmPassword) newErrors.vendorConfirmPassword = 'Passwords do not match.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        if (validateForm(formData)) {
            onSubmit(e, errors);
        }
    };

    return (
        <form id="vendor-form" onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vendor/Shopper Registration</h2>
            <div>
                <label htmlFor="vendor-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                <input type="text" id="vendor-name" name="vendorName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="Alice Smith" required />
                {errors.vendorName && <p className="text-red-500 text-xs mt-1">{errors.vendorName}</p>}
            </div>
            <div>
                <label htmlFor="vendor-email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                <input type="email" id="vendor-email" name="vendorEmail" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="alice.smith@example.com" required />
                {errors.vendorEmail && <p className="text-red-500 text-xs mt-1">{errors.vendorEmail}</p>}
            </div>
            <div>
                <label htmlFor="vendor-password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                <input type="password" id="vendor-password" name="vendorPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="********" required />
                {errors.vendorPassword && <p className="text-red-500 text-xs mt-1">{errors.vendorPassword}</p>}
            </div>
            <div>
                <label htmlFor="vendor-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                <input type="password" id="vendor-confirm-password" name="vendorConfirmPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="********" required />
                {errors.vendorConfirmPassword && <p className="text-red-500 text-xs mt-1">{errors.vendorConfirmPassword}</p>}
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
    );
};

const IndustryForm = ({ onSubmit }: { onSubmit: (e: React.FormEvent, errors: any) => void }) => {
    const [errors, setErrors] = useState<any>({});

    const validateForm = (formData: FormData): boolean => {
        const newErrors: any = {};
        const industryName = (formData.get('industryName') as string).trim();
        const industryEmail = (formData.get('industryEmail') as string).trim();
        const industryPassword = formData.get('industryPassword') as string;
        const industryConfirmPassword = formData.get('industryConfirmPassword') as string;
        const companyWebsite = (formData.get('companyWebsite') as string).trim();

        if (!industryName) newErrors.industryName = 'Company Name is required.';
        if (!industryEmail) newErrors.industryEmail = 'Company Email Address is required.';
        if (!industryPassword) newErrors.industryPassword = 'Password is required.';
        if (!industryConfirmPassword) newErrors.industryConfirmPassword = 'Confirm Password is required.';

        if (industryEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(industryEmail)) newErrors.industryEmail = 'Invalid email address format.';
        if (companyWebsite && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(companyWebsite)) newErrors.companyWebsite = 'Invalid website URL format.';
        if (industryPassword && !isPasswordStrong(industryPassword)) newErrors.industryPassword = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
        if (industryPassword && industryConfirmPassword && industryPassword !== industryConfirmPassword) newErrors.industryConfirmPassword = 'Passwords do not match.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        if (validateForm(formData)) {
            onSubmit(e, errors);
        }
    };

    return (
        <form id="industry-form" onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Industry Registration</h2>
            <div>
                <label htmlFor="industry-name" className="block text-sm font-medium text-gray-700">Company Name <span className="text-red-500">*</span></label>
                <input type="text" id="industry-name" name="industryName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="AgroTech Solutions Pvt. Ltd." required />
                {errors.industryName && <p className="text-red-500 text-xs mt-1">{errors.industryName}</p>}
            </div>
            <div>
                <label htmlFor="industry-email" className="block text-sm font-medium text-gray-700">Company Email Address <span className="text-red-500">*</span></label>
                <input type="email" id="industry-email" name="industryEmail" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="contact@agrotech.com" required />
                {errors.industryEmail && <p className="text-red-500 text-xs mt-1">{errors.industryEmail}</p>}
            </div>
            <div>
                <label htmlFor="industry-password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                <input type="password" id="industry-password" name="industryPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="********" required />
                {errors.industryPassword && <p className="text-red-500 text-xs mt-1">{errors.industryPassword}</p>}
            </div>
            <div>
                <label htmlFor="industry-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                <input type="password" id="industry-confirm-password" name="industryConfirmPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="********" required />
                {errors.industryConfirmPassword && <p className="text-red-500 text-xs mt-1">{errors.industryConfirmPassword}</p>}
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
                {errors.companyWebsite && <p className="text-red-500 text-xs mt-1">{errors.companyWebsite}</p>}
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">Register as Industry</button>
        </form>
    );
};

const ConsultancyForm = ({ onSubmit }: { onSubmit: (e: React.FormEvent, errors: any) => void }) => {
    const [ownEquipment, setOwnEquipment] = useState('');
    const [errors, setErrors] = useState<any>({});

    const validateForm = (formData: FormData): boolean => {
        const newErrors: any = {};
        const consultantName = (formData.get('consultantName') as string).trim();
        const consultantPhone = (formData.get('consultantPhone') as string).trim();
        const consultantEmail = (formData.get('consultantEmail') as string).trim();
        const consultantAddress = (formData.get('consultantAddress') as string).trim();
        const consultantType = formData.get('consultantType') as string;
        const consultantExperience = formData.get('consultantExperience') as string;
        const consultantRegion = (formData.get('consultantRegion') as string).trim();
        const consultantLanguages = (formData.get('consultantLanguages') as string).trim();
        const consultantMode = formData.get('consultantMode') as string;
        const consultantAvailability = formData.get('consultantAvailability') as string;
        const consultantOwnEquipment = formData.get('consultantOwnEquipment') as string;
        const consultantFeeStructure = (formData.get('consultantFeeStructure') as string).trim();
        const consultantGovSchemes = formData.get('consultantGovSchemes') as string;
        const consultantDataConsent = formData.get('consultantDataConsent') as string;

        // Required fields validation
        if (!consultantName) newErrors.consultantName = 'Full Name is required.';
        if (!consultantPhone) newErrors.consultantPhone = 'Phone Number is required.';
        if (!consultantEmail) newErrors.consultantEmail = 'Email Address is required.';
        if (!consultantAddress) newErrors.consultantAddress = 'Address is required.';
        if (!consultantType) newErrors.consultantType = 'Consultant Type is required.';
        if (!consultantExperience) newErrors.consultantExperience = 'Years of Experience is required.';
        if (!consultantRegion) newErrors.consultantRegion = 'Preferred Region is required.';
        if (!consultantLanguages) newErrors.consultantLanguages = 'Languages Known is required.';
        if (!consultantMode) newErrors.consultantMode = 'Mode of Service is required.';
        if (!consultantAvailability) newErrors.consultantAvailability = 'Availability is required.';
        if (!consultantOwnEquipment) newErrors.consultantOwnEquipment = 'Please select an option.';
        if (!consultantFeeStructure) newErrors.consultantFeeStructure = 'Expected Fee Structure is required.';
        if (!consultantGovSchemes) newErrors.consultantGovSchemes = 'Please select an option.';
        if (!consultantDataConsent) newErrors.consultantDataConsent = 'Consent to Data Usage is required.';

        // Format and pattern validation
        if (consultantName && !/^[A-Za-z\s.'-]+$/.test(consultantName)) newErrors.consultantName = 'Name can only contain letters, spaces, hyphens, and apostrophes.';
        if (consultantPhone && !/^\+?[1-9]\d{9,14}$/.test(consultantPhone)) newErrors.consultantPhone = 'Invalid phone number format. e.g., +919876543210.';
        if (consultantEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultantEmail)) newErrors.consultantEmail = 'Invalid email address format.';
        if (consultantExperience && (isNaN(Number(consultantExperience)) || Number(consultantExperience) < 0 || Number(consultantExperience) > 60)) newErrors.consultantExperience = 'Experience must be a positive number up to 60 years.';
        if (consultantLanguages && !/^[A-Za-z,\s]+$/.test(consultantLanguages)) newErrors.consultantLanguages = 'Languages should be a comma-separated list of letters.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        if (validateForm(formData)) {
            onSubmit(e, errors);
        }
    };

    return (
        <form id="consultancy-form" onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consultancy Registration</h2>
            <fieldset className="border p-4 rounded-md shadow-sm">
                <legend className="text-lg font-medium text-gray-700 px-2">Personal & Contact Information</legend>
                <div>
                    <label htmlFor="consultant-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" id="consultant-name" name="consultantName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="John Doe" required />
                    {errors.consultantName && <p className="text-red-500 text-xs mt-1">{errors.consultantName}</p>}
                </div>
                <div>
                    <label htmlFor="consultant-phone" className="block text-sm font-medium text-gray-700">Phone Number (WhatsApp preferred?) <span className="text-red-500">*</span></label>
                    <input type="tel" id="consultant-phone" name="consultantPhone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="+919876543210" required />
                    {errors.consultantPhone && <p className="text-red-500 text-xs mt-1">{errors.consultantPhone}</p>}
                </div>
                <div>
                    <label htmlFor="consultant-email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" id="consultant-email" name="consultantEmail" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="john.doe@example.com" required />
                    {errors.consultantEmail && <p className="text-red-500 text-xs mt-1">{errors.consultantEmail}</p>}
                </div>
                <div>
                    <label htmlFor="consultant-address" className="block text-sm font-medium text-gray-700">Address/Location <span className="text-red-500">*</span></label>
                    <textarea id="consultant-address" name="consultantAddress" rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Village, Taluka, District, State, Pin Code" required></textarea>
                    {errors.consultantAddress && <p className="text-red-500 text-xs mt-1">{errors.consultantAddress}</p>}
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
                    {errors.consultantType && <p className="text-red-500 text-xs mt-1">{errors.consultantType}</p>}
                </div>
                <div>
                    <label htmlFor="consultant-experience" className="block text-sm font-medium text-gray-700">Years of Experience <span className="text-red-500">*</span></label>
                    <input type="number" id="consultant-experience" name="consultantExperience" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., 5" required />
                    {errors.consultantExperience && <p className="text-red-500 text-xs mt-1">{errors.consultantExperience}</p>}
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
                    {errors.consultantRegion && <p className="text-red-500 text-xs mt-1">{errors.consultantRegion}</p>}
                </div>
                <div>
                    <label htmlFor="consultant-languages" className="block text-sm font-medium text-gray-700">Languages Known <span className="text-red-500">*</span></label>
                    <input type="text" id="consultant-languages" name="consultantLanguages" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., English, Kannada, Hindi" required />
                    {errors.consultantLanguages && <p className="text-red-500 text-xs mt-1">{errors.consultantLanguages}</p>}
                </div>
                <div>
                    <label htmlFor="consultant-mode" className="block text-sm font-medium text-gray-700">Mode of Service <span className="text-red-500">*</span></label>
                    <select id="consultant-mode" name="consultantMode" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                        <option value="">Select Mode</option>
                        <option value="on-site">On-site</option>
                        <option value="remote">Remote</option>
                        <option value="both">Both</option>
                    </select>
                    {errors.consultantMode && <p className="text-red-500 text-xs mt-1">{errors.consultantMode}</p>}
                </div>
                <div>
                    <label htmlFor="consultant-availability" className="block text-sm font-medium text-gray-700">Availability <span className="text-red-500">*</span></label>
                    <select id="consultant-availability" name="consultantAvailability" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                        <option value="">Select Availability</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="seasonal">Seasonal</option>
                    </select>
                    {errors.consultantAvailability && <p className="text-red-500 text-xs mt-1">{errors.consultantAvailability}</p>}
                </div>
            </fieldset>
            <fieldset className="border p-4 rounded-md shadow-sm">
                <legend className="text-lg font-medium text-gray-700 px-2">Tools & Equipment</legend>
                <div>
                    <label htmlFor="consultant-own-equipment" className="block text-sm font-medium text-gray-700">Do you own soil testing kits, drones, or equipment? <span className="text-red-500">*</span></label>
                    <select id="consultant-own-equipment" name="consultantOwnEquipment" value={ownEquipment} onChange={(e) => setOwnEquipment(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {errors.consultantOwnEquipment && <p className="text-red-500 text-xs mt-1">{errors.consultantOwnEquipment}</p>}
                </div>
                {ownEquipment === 'yes' && (
                    <div id="equipment-type-div">
                        <label htmlFor="consultant-equipment-type" className="block text-sm font-medium text-gray-700">Type of equipment</label>
                        <input type="text" id="consultant-equipment-type" name="consultantEquipmentType" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="e.g., Drone DJI Mavic, pH meter" />
                    </div>
                )}
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
                    {errors.consultantFeeStructure && <p className="text-red-500 text-xs mt-1">{errors.consultantFeeStructure}</p>}
                </div>
                <div>
                    <label htmlFor="consultant-gov-schemes" className="block text-sm font-medium text-gray-700">Willingness to work with government schemes / NGOs? <span className="text-red-500">*</span></label>
                    <select id="consultant-gov-schemes" name="consultantGovSchemes" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" required>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {errors.consultantGovSchemes && <p className="text-red-500 text-xs mt-1">{errors.consultantGovSchemes}</p>}
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
                    {errors.consultantDataConsent && <p className="text-red-500 text-xs mt-1">{errors.consultantDataConsent}</p>}
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
    );
};

// Main page component
export default function RegisterPage() {
    const [activeRole, setActiveRole] = useState<string | null>(null);
    const router = useRouter();
    
    const handleFormSubmit = (event: React.FormEvent, errors: any) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        console.log(`Form Submitted for ${activeRole}`, Object.fromEntries(formData));

        if (Object.keys(errors).length > 0) {
            console.error('Form has validation errors:', errors);
            return;
        }

        const messageBox = document.createElement('div');
        messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        messageBox.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
                <p class="text-lg font-semibold text-gray-800 mb-4">Registration Successful!</p>
                <p class="text-gray-600 mb-4">You will be redirected to the login page.</p>
            </div>
        `;
        document.body.appendChild(messageBox);
        
        setTimeout(() => {
            messageBox.remove();
            router.push('/login');
        }, 1500);
    };

    const roleData = [
        { id: 'farmer', name: 'Farmer', image: '/farmer.png' },
        { id: 'labourer', name: 'Labourer', image: '/laborers.png' },
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
                </nav>
            </header>

            <main id="dynamic-content-area" className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-start relative z-10">
                <section id="register-page-section" className="page-section w-full max-w-4xl">
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 overflow-hidden">
                        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 title-font">Register with MalligeMitra</h1>
                        
                        {!activeRole && (
                            <p id="initial-message" className="text-center text-gray-600 mb-8">Please select your role to proceed with registration.</p>
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
                            {activeRole === 'farmer' && <FarmerForm onSubmit={handleFormSubmit} />}
                            {activeRole === 'labourer' && <LabourerForm onSubmit={handleFormSubmit} />}
                            {activeRole === 'vendor' && <VendorForm onSubmit={handleFormSubmit} />}
                            {activeRole === 'industry' && <IndustryForm onSubmit={handleFormSubmit} />}
                            {activeRole === 'consultancy' && <ConsultancyForm onSubmit={handleFormSubmit} />}
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
                    cursor: pointer;
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
                .app-header #language-selector {
                    background-color: #065F46;
                    border-color: #065F46;
                    color: #FFFFFF;
                }
                .app-header #language-selector:focus {
                    border-color: #34D399;
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
                    background-color: #D1FAE5;
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
