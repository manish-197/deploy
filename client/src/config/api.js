/**
 * API Configuration
 * Supports environment variables (set in Netlify Dashboard or .env):
 * - VITE_API_URL
 * - VITE_API_BASE_URL
 * - VITE_BACKEND_URL
 *
 * Automatically falls back to the production Render backend when deployed,
 * or localhost:5000 when developing locally.
 */
const rawUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000' : 'https://aroghyarakshak-ai.onrender.com');

// Sanitize: strip trailing slashes and redundant trailing '/api'
export const API_BASE_URL = (rawUrl || '')
  .trim()
  .replace(/\/+$/, '')
  .replace(/\/api$/, '');

export default API_BASE_URL;
