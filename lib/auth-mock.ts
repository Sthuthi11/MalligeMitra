// This module provides MOCK AUTHENTICATION data and functions for demonstration purposes.

import { User } from '../types';

// --- Mock User Data ---
// This array holds all available mock users that can "log in" for testing.
// It needs to be exported so UI components can access it.
export const mockUsers: User[] = [
  { id: 'farmer-user-123', username: 'Mahesh K' },
  { id: 'farmer-user-456', username: 'Bhadra Gowda' },
  { id: 'farmer-user-789', username: 'Madhu S' },
  { id: 'farmer-user-101', username: 'Deva' },
  { id: 'farmer-user-999', username: 'Vishwanatha N' },
];

// --- Simulate a logged-in user state ---
// In a real application, this state would be managed via session, localStorage, or a global auth context.
// For this mock, we initialize it with the first mock user for convenience.
let currentMockUser: User | null = mockUsers[0] || null; // Auto-login the first user from mockUsers array

// --- Authentication Functions ---

/**
 * Checks if a user is currently "authenticated" (i.e., if currentMockUser is not null).
 * @returns {boolean} True if a user is logged in, false otherwise.
 */
export function isAuthenticated(): boolean {
  return currentMockUser !== null;
}

/**
 * Returns the currently "logged-in" mock user.
 * @returns {User | null} The current User object, or null if no user is logged in.
 */
export function getCurrentUser(): User | null {
  return currentMockUser;
}

/**
 * Simulates a user login by setting the currentMockUser.
 * This function now accepts a `User` object, matching how it's called in the UI components.
 * @param {User} user - The User object to log in.
 */
export function mockLogin(user: User) {
  // Basic validation to ensure a valid user object is passed
  if (!user || typeof user.id !== 'string' || typeof user.username !== 'string') {
    console.error("Error: Attempted to mock login with an invalid user object.", user);
    return;
  }
  currentMockUser = user;
  console.log(`Mock user logged in: ${user.username} (ID: ${user.id})`);
}

/**
 * Simulates a user logout by setting currentMockUser to null.
 */
export function mockLogout() {
  currentMockUser = null;
  console.log('Mock user logged out.');
}