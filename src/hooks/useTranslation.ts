
import { useAppContext } from "@/contexts/AppContext";
import { translations } from "@/translations";

type TranslationKey = keyof typeof translations.en;

export function useTranslation() {
  const { language } = useAppContext();

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return { t, language };
}
