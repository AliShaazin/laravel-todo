"use server";
import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//helper function to make authenticated API requests
export async function authFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const defaultHeaders: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(`${API_URL}${endpoint}`, {
    cache: "no-store",
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });
}
