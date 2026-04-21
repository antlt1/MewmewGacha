import { httpsCallable } from 'firebase/functions';
import { auth, functions } from './firebaseConfig';

export type UserRole = 'admin' | 'user' | 'loot_mapper';

type SetUserRoleRequest = {
  userId: string;
  role: UserRole;
};

type SetUserRoleResponse = {
  success: boolean;
  userId: string;
  role: UserRole;
  message: string;
};

export async function setUserRole(userId: string, role: UserRole): Promise<SetUserRoleResponse> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Not authenticated');
  }

  // Ensure latest custom claims are used when invoking admin actions.
  await currentUser.getIdToken(true);

  const callable = httpsCallable<SetUserRoleRequest, SetUserRoleResponse>(functions, 'setUserRole');
  const result = await callable({ userId, role });
  return result.data;
}
