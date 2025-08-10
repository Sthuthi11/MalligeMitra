"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUserCircle, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

// A placeholder image for the profile picture
const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/150';

// Define the shape of the farmer profile data
interface FarmerProfileData {
  username: string;
  profilePicUrl: string;
  fullName: string;
  gender: string;
  dob: string;
  idDocType: string;
  idDocNumber: string;
  mobile: string;
  resVillage: string;
  resTaluka: string;
  resDistrict: string;
  resState: string;
  resPincode: string;
  farmAddress: string;
  farmSize: string;
  farmOwnership: string;
}

// Dummy data for a new or unedited profile
const DUMMY_DATA: FarmerProfileData = {
  username: 'Suresh09',
  profilePicUrl: PLACEHOLDER_IMAGE_URL,
  fullName: 'Suresh Kumar',
  gender: 'male',
  dob: '1985-05-20',
  idDocType: 'aadhaar',
  idDocNumber: '1234-5678-9012',
  mobile: '+919876543210',
  resVillage: 'Shankarapura',
  resTaluka: 'Udupi',
  resDistrict: 'Udupi',
  resState: 'Karnataka',
  resPincode: '576101',
  farmAddress: 'Matha Kripa, Shankarapura, Udupi',
  farmSize: '5 Acres',
  farmOwnership: 'owned',
};

export default function FarmerProfilePage() {
  const [profileData, setProfileData] = useState<FarmerProfileData>(DUMMY_DATA);
  const [originalData, setOriginalData] = useState<FarmerProfileData>(DUMMY_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Load data from local storage on initial render
  useEffect(() => {
    const savedProfile = localStorage.getItem('farmerProfile');
    if (savedProfile) {
      const parsedData = JSON.parse(savedProfile);
      setProfileData(parsedData);
      setOriginalData(parsedData);
      setProfileImage(parsedData.profilePicUrl);
    } else {
      // Save dummy data if no profile exists
      localStorage.setItem('farmerProfile', JSON.stringify(DUMMY_DATA));
      setProfileImage(DUMMY_DATA.profilePicUrl);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem('farmerProfile', JSON.stringify(profileData));
    setOriginalData(profileData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setProfileImage(originalData.profilePicUrl);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        setProfileImage(newImageUrl);
        setProfileData({ ...profileData, profilePicUrl: newImageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProfileFields = () => {
    const fields = [
      { label: 'Full Name', name: 'fullName', type: 'text', value: profileData.fullName },
      { label: 'Gender', name: 'gender', type: 'select', value: profileData.gender, options: ['male', 'female', 'other'] },
      { label: 'Date of Birth', name: 'dob', type: 'date', value: profileData.dob },
      { label: 'ID Document', name: 'idDocType', type: 'select', value: profileData.idDocType, options: ['aadhaar', 'voterid', 'pan'] },
      { label: 'ID Number', name: 'idDocNumber', type: 'text', value: profileData.idDocNumber },
      { label: 'Mobile Number', name: 'mobile', type: 'tel', value: profileData.mobile },
      { label: 'Farm Size', name: 'farmSize', type: 'text', value: profileData.farmSize },
      { label: 'Farm Ownership', name: 'farmOwnership', type: 'select', value: profileData.farmOwnership, options: ['owned', 'leased', 'shared'] },
    ];
  
    return (
      <>
        {fields.map((field, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            {isEditing ? (
              field.type === 'select' ? (
                <select name={field.name} value={field.value} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                  {field.options?.map(option => (
                    <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                  ))}
                </select>
              ) : (
                <input type={field.type} name={field.name} value={field.value} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
              )
            ) : (
              <p className="text-gray-900 font-semibold">{field.value || 'N/A'}</p>
            )}
          </div>
        ))}
  
        {/* Corrected Residential Address fields */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Residential Address</label>
            {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <input type="text" name="resVillage" value={profileData.resVillage} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Village" />
                        <span className="text-xs text-gray-500">Village</span>
                    </div>
                    <div>
                        <input type="text" name="resTaluka" value={profileData.resTaluka} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Taluka" />
                        <span className="text-xs text-gray-500">Taluka</span>
                    </div>
                    <div>
                        <input type="text" name="resDistrict" value={profileData.resDistrict} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="District" />
                        <span className="text-xs text-gray-500">District</span>
                    </div>
                    <div>
                        <input type="text" name="resState" value={profileData.resState} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="State" />
                        <span className="text-xs text-gray-500">State</span>
                    </div>
                    <div className="col-span-full sm:col-span-1">
                        <input type="text" name="resPincode" value={profileData.resPincode} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Pin Code" />
                        <span className="text-xs text-gray-500">Pin Code</span>
                    </div>
                </div>
            ) : (
                <p className="text-gray-900 font-semibold">{`${profileData.resVillage}, ${profileData.resTaluka}, ${profileData.resDistrict}, ${profileData.resState} - ${profileData.resPincode}`}</p>
            )}
        </div>
        
        {/* Farm Address field */}
        <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">Farm Address</label>
            {isEditing ? (
                <textarea name="farmAddress" value={profileData.farmAddress} onChange={handleChange} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            ) : (
                <p className="text-gray-900 font-semibold">{profileData.farmAddress || 'N/A'}</p>
            )}
        </div>
      </>
    );
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-lime-100">
      <header className="app-header shadow-sm py-4 px-6 md:px-10 flex justify-between items-center">
        <div className="text-2xl font-bold text-white title-font">MalligeMitra</div>
        <nav className="flex items-center space-x-4">
          <Link href="/farmer" className="text-white hover:text-green-200 px-3 py-2 rounded-md transition-colors duration-200">
            Dashboard
          </Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 title-font">Farmer Profile</h1>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2">
                    <FaCheck /> Save
                  </button>
                  <button onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2">
                    <FaTimes /> Cancel
                  </button>
                </>
              ) : (
                <button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2">
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6 md:space-y-0 md:flex-row md:items-start md:space-x-8">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-lime-500 shadow-lg">
              <img src={profileImage || PLACEHOLDER_IMAGE_URL} alt="Profile" className="object-cover w-full h-full" />
              {isEditing && (
                <label htmlFor="profile-pic-upload" className="absolute bottom-0 right-0 p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                  <FaEdit className="text-gray-600" />
                  <input type="file" id="profile-pic-upload" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="text-center md:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    className="text-3xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-2"
                  />
                ) : (
                  <h2 className="text-3xl font-bold text-gray-900">{profileData.username}</h2>
                )}
                <p className="text-green-600 font-medium">Farmer</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                {renderProfileFields()}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-green-700 text-white py-6 mt-auto">
        <div className="container mx-auto text-center text-sm">
          &copy; 2025 MalligeMitra. All rights reserved.
        </div>
      </footer>

      <style jsx global>{`
        .app-header { background-color: #047857; }
        .title-font { font-family: 'Montserrat', sans-serif; }
        body { font-family: 'Inter', sans-serif; }
        .app-header a, .app-header .title-font { color: white; }
      `}</style>
    </div>
  );
}
