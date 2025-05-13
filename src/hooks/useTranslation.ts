
import { useAppContext } from "@/contexts/AppContext";
import { translations } from "@/translations";

type TranslationKey = keyof typeof translations.en;

export function useTranslation() {
  const { language } = useAppContext();

  const t = (key: TranslationKey): string => {
    // التحقق من وجود المفتاح في قاموس الترجمات للغة الحالية
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // إرجاع المفتاح نفسه كقيمة افتراضية إذا كانت الترجمة غير موجودة
    console.warn(`Translation missing for key: "${key}" in language: "${language}"`);
    return key;
  };

  return { t, language };
}
