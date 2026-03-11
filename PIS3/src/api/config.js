/**
 * URL de base du backend Django.
 * En dev : /api (proxy Vite → http://127.0.0.1:8000)
 * En prod : définir VITE_API_BASE_URL dans .env (ex: https://api.example.com)
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api";

/** Helper : URL complète pour un chemin API */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${p}`;
}

/**
 * URL de base du serveur (pour les médias : photos, etc.).
 * En dev avec proxy : http://127.0.0.1:8000
 * En prod : même origine ou URL du backend.
 */
export const MEDIA_BASE_URL =
  import.meta.env.VITE_MEDIA_BASE_URL || "http://127.0.0.1:8000";
