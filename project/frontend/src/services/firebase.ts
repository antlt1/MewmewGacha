import {
  createUserWithEmailAndPassword,
  getIdTokenResult,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  position: 'admin' | 'user' | 'loot_mapper';
  role?: 'admin' | 'user' | 'loot_mapper';
  price: number;
  avatar?: string;
  phone?: string;
  address?: string;
  status: 'active' | 'blocked' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  isBanned: boolean;
  banReason?: string;
  lastLogin?: Date;
  totalPurchase?: number;
  totalDeposit?: number;
}

/**
 * Register user with email and password
 */
export const registerUser = async (
  email: string,
  password: string,
  username: string,
  position: 'user' | 'loot_mapper' = 'user',
): Promise<UserProfile> => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: username });

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      username,
      position,
      price: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      isBanned: false,
      totalPurchase: 0,
      totalDeposit: 0,
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);

    return userProfile;
  } catch (error) {
    const err = error as any;
    throw new Error(err.message || 'Failed to register user');
  }
};

/**
 * Login user with email and password
 */
export const loginUser = async (email: string, password: string): Promise<UserProfile> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user profile from Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error('User profile not found');
    }

    // Update last login
    await updateDoc(userDocRef, {
      lastLogin: new Date(),
    });

    return userDocSnap.data() as UserProfile;
  } catch (error) {
    const err = error as any;
    throw new Error(err.message || 'Failed to login');
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    const err = error as any;
    throw new Error(err.message || 'Failed to logout');
  }
};

/**
 * Get current user profile from Firestore
 */
export const getCurrentUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return null;
    }

    return userDocSnap.data() as UserProfile;
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    const err = error as any;
    throw new Error(err.message || 'Failed to update user profile');
  }
};

/**
 * Check if user is admin
 */
export const isUserAdmin = async (uid: string): Promise<boolean> => {
  try {
    const userProfile = await getCurrentUserProfile(uid);
    return userProfile ? userProfile.position === 'admin' : false;
  } catch (error) {
    return false;
  }
};

export const getCurrentUserClaimRole = async (): Promise<'admin' | 'user' | 'loot_mapper' | null> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;

    const tokenResult = await getIdTokenResult(currentUser, true);
    const claimRole = tokenResult.claims.role;
    return claimRole === 'admin' || claimRole === 'user' || claimRole === 'loot_mapper' ? claimRole : null;
  } catch (error) {
    return null;
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  updateUserProfile,
  isUserAdmin,
  getCurrentUserClaimRole,
};
