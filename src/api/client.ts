import axios from "axios";

// NOTE: Hardcoded for reviewer convenience. In production, use process.env.EXPO_PUBLIC_CAT_API_KEY
const API_KEY =
  "live_yIephPasnbpbdRf1sSvaGPdMYGwPWXbRAs3GMY0NFIXU4aVSgDOsZG09vpjglqmE";

export const apiClient = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
});
