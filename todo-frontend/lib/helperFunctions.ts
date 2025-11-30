export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${day} ${month}, ${hours}:${minutes}${ampm}`;
}

// client authenticated fetch
export async function clientAuthFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = getAccessTokenFromCookie();
  const defaultHeaders: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  console.log("access_token from cookie (decoded):", token);

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });
}

// helper function to get token from cookie on client
export function getAccessTokenFromCookie(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];
  return raw ? decodeURIComponent(raw) : undefined;
}
