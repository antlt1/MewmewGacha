import * as admin from 'firebase-admin';
import { onCall, HttpsError } from 'firebase-functions/v2/https';

admin.initializeApp();

type Role = 'admin' | 'user' | 'loot_mapper';

type SetUserRolePayload = {
  userId?: string;
  role?: Role;
};

export const setUserRole = onCall<SetUserRolePayload>(async (request) => {
  const { auth, data } = request;

  if (!auth?.uid) {
    throw new HttpsError('unauthenticated', 'Not authenticated');
  }

  const targetUserId = data?.userId?.trim();
  const targetRole = data?.role;

  if (!targetUserId) {
    throw new HttpsError('invalid-argument', 'userId is required');
  }

  if (!targetRole || !['admin', 'user', 'loot_mapper'].includes(targetRole)) {
    throw new HttpsError('invalid-argument', 'role is invalid');
  }

  const adminDoc = await admin.firestore().collection('users').doc(auth.uid).get();
  const adminRole = adminDoc.exists ? adminDoc.data()?.role ?? adminDoc.data()?.position : null;

  if (adminRole !== 'admin') {
    throw new HttpsError('permission-denied', 'Not authorized');
  }

  await admin.auth().setCustomUserClaims(targetUserId, { role: targetRole });

  await admin.firestore().collection('users').doc(targetUserId).set(
    {
      role: targetRole,
      position: targetRole,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return {
    success: true,
    userId: targetUserId,
    role: targetRole,
    message: 'Role updated successfully',
  };
});
