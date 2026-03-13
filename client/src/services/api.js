import axios from "axios";
import { demoArtisans } from "../data/demoData";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});

const safe = async (request, fallback) => {
  try {
    const { data } = await request();
    return data;
  } catch {
    return fallback;
  }
};

export const getArtisans = async () => {
  const data = await safe(() => api.get("/artisans"), demoArtisans);
  return Array.isArray(data) && data.length ? data : demoArtisans;
};
export const createBooking = (payload) => safe(() => api.post("/booking", payload), { success: true, ...payload });
export const getBookings = () => safe(() => api.get("/bookings"), []);
export const createVolunteer = (formData) =>
  safe(() => api.post("/student-registration", formData, { headers: { "Content-Type": "multipart/form-data" } }), {
    success: true
  });
export const getVolunteers = () => safe(() => api.get("/volunteers"), []);
export const getAnalytics = () =>
  safe(() => api.get("/dashboard/analytics"), {
    totalArtisans: demoArtisans.length,
    totalVolunteers: 14,
    totalBookings: 28,
    totalVisitors: 164
  });
export const trackVisitor = (payload) => safe(() => api.post("/visitors/track", payload), { success: true });
export const synthesizeSpeech = (payload) => safe(() => api.post("/tts/speak", payload), null);

const extractCodeFromInput = (value = "") => {
  const input = value.trim();
  if (!input) {
    return "";
  }

  if (/^https?:\/\//i.test(input)) {
    try {
      const parsed = new URL(input);
      const fromQuery = parsed.searchParams.get("verify");
      if (fromQuery) {
        return fromQuery;
      }
      const pathSegments = parsed.pathname.split("/").filter(Boolean);
      const fromPath = pathSegments[pathSegments.length - 1];
      if (fromPath) {
        return fromPath;
      }
    } catch {
      return input;
    }
  }

  return input;
};

const normalizeCode = (code = "") => extractCodeFromInput(code).trim().toUpperCase();

export const verifyAuthenticityCode = async (code) => {
  const normalized = normalizeCode(code);
  const fallbackMatch = demoArtisans.find((artisan) => normalizeCode(artisan.authenticity?.code) === normalized);
  const fallback = fallbackMatch
    ? {
        valid: true,
        artisanId: fallbackMatch.id,
        artisanName: fallbackMatch.name,
        craftType: fallbackMatch.craftType,
        origin: fallbackMatch.authenticity?.origin
      }
    : { valid: false };

  return safe(() => api.get(`/artisans/verify/${encodeURIComponent(normalized)}`), fallback);
};
