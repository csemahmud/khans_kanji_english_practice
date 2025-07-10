/**
 * Resolves any public file path based on Vite's base URL
 * Ensures it works in localhost and GitHub Pages (subdirectory)
 */
export const resolvePublicPath = (relativePath: string): string => {
    return `${import.meta.env.BASE_URL.replace(/\/+$/, '')}/${relativePath.replace(/^\/+/, '')}`;
  };

  export const resolveProfileImage = (file: string) =>
    resolvePublicPath(`important/${file}`);
  
  export const resolveFallbackImage = (file: string) =>
    resolvePublicPath(`fallbacks/${file}`);
  
  