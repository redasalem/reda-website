import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const [projectId, uid, action = 'grant'] = process.argv.slice(2);
if (!projectId || !uid || !['grant', 'revoke'].includes(action)) {
  throw new Error('Usage: node scripts/set-admin.mjs PROJECT_ID USER_UID [grant|revoke]');
}
initializeApp({ credential: applicationDefault(), projectId });
const auth = getAuth();
const user = await auth.getUser(uid);
await auth.setCustomUserClaims(uid, { ...user.customClaims, admin: action === 'grant' });
if (action === 'revoke') await auth.revokeRefreshTokens(uid);
console.log(`Admin access ${action === 'grant' ? 'granted' : 'revoked'} for ${uid}. Sign in again to refresh claims. Existing ID tokens can remain valid for up to one hour.`);
