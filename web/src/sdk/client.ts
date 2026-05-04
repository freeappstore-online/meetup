import { createAuth, type FASAuth } from "./auth";

const DEFAULT_API = "https://api.freeappstore.online";

export interface FASClient {
  auth: FASAuth;
  /** Make an authenticated GET request */
  get<T = unknown>(path: string, params?: Record<string, string>): Promise<T>;
  /** Make an authenticated POST request */
  post<T = unknown>(path: string, body?: unknown): Promise<T>;
  /** Make an authenticated PUT request */
  put<T = unknown>(path: string, body?: unknown): Promise<T>;
  /** Make an authenticated DELETE request */
  del<T = unknown>(path: string): Promise<T>;
}

export function createClient(apiBase: string = DEFAULT_API): FASClient {
  const auth = createAuth(apiBase);

  async function request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const token = auth.getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${apiBase}${path}`, {
      method,
      headers,
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(err.error || `API error ${res.status}`);
    }

    return res.json() as Promise<T>;
  }

  function get<T = unknown>(
    path: string,
    params?: Record<string, string>
  ): Promise<T> {
    const qs = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return request<T>("GET", path + qs);
  }

  function post<T = unknown>(path: string, body?: unknown): Promise<T> {
    return request<T>("POST", path, body);
  }

  function put<T = unknown>(path: string, body?: unknown): Promise<T> {
    return request<T>("PUT", path, body);
  }

  function del<T = unknown>(path: string): Promise<T> {
    return request<T>("DELETE", path);
  }

  return { auth, get, post, put, del };
}
