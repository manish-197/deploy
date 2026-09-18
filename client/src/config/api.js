/**
 * API Configuration
 * Automatically points to the production Render backend when deployed,
 * or localhost when developing locally.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000' : 'https://aroghyarakshak-ai.onrender.com');

export default API_BASE_URL;
