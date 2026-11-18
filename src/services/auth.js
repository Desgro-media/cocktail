// ─────────────────────────────────────────────────────────────────────────────
// AUTH SERVICE (swap this file when the backend exists)
//
// IMPORTANT: A website with no server cannot do real logins. This file is a
// DEMO implementation so the screens can be designed and tested. It stores only
// the name and email in the browser, never a password, and anyone can "sign in".
//
// Replace the four functions below with calls to the real auth backend
// (for example your own API, Firebase Auth, Auth0, Clerk, Supabase Auth).
// Real auth needs: password hashing on the server, HTTPS, httpOnly session
// cookies or short lived tokens, rate limiting, email verification, password reset emails.
// ─────────────────────────────────────────────────────────────────────────────

export const AUTH_IS_DEMO = true;

const KEY = 'cocktail_custom_demo_user_v1';

const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null;
  } catch {
    return null;
  }
}

export async function signIn({ email }) {
  await wait();
  const existing = getStoredUser();
  const user = existing && existing.email === email ? existing : { email, name: email.split('@')[0] };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export async function signUp({ name, email }) {
  await wait();
  const user = { name, email };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export async function signOut() {
  localStorage.removeItem(KEY);
}

export async function requestPasswordReset() {
  await wait();
  // Real version: backend emails a single use reset link. Always show the same message
  // whether or not the email exists, so attackers cannot discover registered emails.
  return { ok: true };
}
