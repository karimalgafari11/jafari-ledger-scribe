
// Create a simplified translation hook that just returns Arabic text

export function useTranslation() {
  // Since we're only using Arabic now, we can simplify this hook
  const t = (key: string): string => {
    // This would normally look up translations, but we'll just return the key for now
    // as our system is Arabic only
    return key;
  };

  return { t, language: 'ar' };
}
