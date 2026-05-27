import type { User } from "./types";

const TOKEN_KEY = "fas_token";

export interface UserWithRoles extends User {
  roles: { role: string; app: string | null }[];
}

export interface FASAuth {
  /** Get current user + roles (null if not signed in) */
  getUser(): Promise<UserWithRoles | null>;
  /** Start OAuth sign-in (redirects the page) */
  signIn(provider?: 'github' | 'google'): Promise<void>;
  /** Sign out everywhere (clears cookie + localStorage) */
  signOut(): Promise<void>;
  /** Get session token (from cookie fallback to localStorage) */
  getToken(): string | null;
  /** Check URL for token after OAuth redirect, store it */
  handleRedirect(): boolean;
  /** Check if user has a role (platform-wide or app-scoped) */
  hasRole(user: UserWithRoles, role: string, app?: string): boolean;
  /** Store user data for an app */
  setData(app: string, key: string, value: string): Promise<void>;
  /** Get user data for an app */
  getData(app: string, key: string): Promise<string | null>;
  /** Get all user data for an app */
  getAllData(app: string): Promise<Record<string, string>>;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]!) : null;
}

export function createAuth(apiBase: string): FASAuth {
  function getToken(): string | null {
    // Cookie first (set by API on .freeappstore.online — cross-app SSO)
    const fromCookie = getCookie("fas_session");
    if (fromCookie) return fromCookie;
    // Fallback to localStorage (for localhost dev)
    return localStorage.getItem(TOKEN_KEY);
  }

  function handleRedirect(): boolean {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      // Store in localStorage as backup (cookie is set by API)
      localStorage.setItem(TOKEN_KEY, token);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.toString());
      return true;
    }
    return false;
  }

  async function getUser(): Promise<UserWithRoles | null> {
    const token = getToken();
    if (!token) return null;

    try {
      const res = await fetch(`${apiBase}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      const data = (await res.json()) as {
        user: User | null;
        roles?: { role: string; app: string | null }[];
      };
      if (!data.user) return null;
      return { ...data.user, roles: data.roles ?? [] };
    } catch {
      return null;
    }
  }

  async function signIn(provider: 'github' | 'google' = 'github'): Promise<void> {
    const redirect = window.location.href;
    const res = await fetch(
      `${apiBase}/auth/${provider}/url?redirect=${encodeURIComponent(redirect)}`
    );
    const data = (await res.json()) as { url: string };
    window.location.href = data.url;
  }

  async function signOut(): Promise<void> {
    const token = getToken();
    if (token) {
      await fetch(`${apiBase}/auth/signout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
    }
    localStorage.removeItem(TOKEN_KEY);
  }

  function hasRole(user: UserWithRoles, role: string, app?: string): boolean {
    return user.roles.some(
      (r) =>
        r.role === role && (r.app === null || r.app === (app ?? null))
    );
  }

  async function setData(app: string, key: string, value: string): Promise<void> {
    const token = getToken();
    if (!token) throw new Error("Not signed in");
    await fetch(`${apiBase}/auth/data/${app}/${key}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ value }),
    });
  }

  async function getData(app: string, key: string): Promise<string | null> {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${apiBase}/auth/data/${app}/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    const data = (await res.json()) as { value: string | null };
    return data.value;
  }

  async function getAllData(app: string): Promise<Record<string, string>> {
    const token = getToken();
    if (!token) return {};
    const res = await fetch(`${apiBase}/auth/data/${app}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    const result = (await res.json()) as {
      data: { key: string; value: string }[];
    };
    const map: Record<string, string> = {};
    for (const d of result.data) map[d.key] = d.value;
    return map;
  }

  return { getUser, signIn, signOut, getToken, handleRedirect, hasRole, setData, getData, getAllData };
}
