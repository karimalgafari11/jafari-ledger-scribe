
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
    
    // في حالة عدم وجود الترجمة، نحاول استخدام الترجمة الإنجليزية كنسخة احتياطية
    if (language !== 'en' && translations.en && translations.en[key]) {
      console.warn(`Translation missing for key: "${key}" in language: "${language}", using English as fallback`);
      return translations.en[key];
    }
    
    // إرجاع المفتاح نفسه كقيمة افتراضية إذا كانت الترجمة غير موجودة
    console.warn(`Translation missing for key: "${key}" in all languages`);
    return key;
  };

  return { t, language };
}
