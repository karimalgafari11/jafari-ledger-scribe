
import { useState, useEffect } from "react";
import { SensitiveDataCategory, VerificationLevel, VerificationRequest, getRequiredVerificationLevel } from "@/utils/aiSecurityUtils";
import { toast } from "sonner";

// Local storage key for verification status
const VERIFICATION_STATUS_KEY = "ai_assistant_verification";

export const useAiSecurityContext = () => {
  const [hasFullAccess, setHasFullAccess] = useState(true);
  const [currentVerificationLevel, setCurrentVerificationLevel] = useState<VerificationLevel>(VerificationLevel.NONE);
  const [pendingVerification, setPendingVerification] = useState<VerificationRequest | null>(null);
  const [securityMode, setSecurityMode] = useState<'standard' | 'enhanced' | 'strict'>('standard');
  const [identityVerified, setIdentityVerified] = useState(false);

  // Load verification status from localStorage
  useEffect(() => {
    const savedVerification = localStorage.getItem(VERIFICATION_STATUS_KEY);
    if (savedVerification) {
      try {
        const verification = JSON.parse(savedVerification);
        setCurrentVerificationLevel(verification.level || VerificationLevel.NONE);
        setIdentityVerified(verification.verified || false);
        
        // Re-verify after 30 minutes
        const verifiedAt = new Date(verification.timestamp || 0);
        const currentTime = new Date();
        const timeDiff = (currentTime.getTime() - verifiedAt.getTime()) / (1000 * 60);
        
        if (timeDiff > 30) {
          setIdentityVerified(false);
          setCurrentVerificationLevel(VerificationLevel.NONE);
        }
      } catch (error) {
        console.error("فشل في استرجاع حالة التحقق:", error);
      }
    }
  }, []);
  
  // Save verification status to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(VERIFICATION_STATUS_KEY, JSON.stringify({
      level: currentVerificationLevel,
      verified: identityVerified,
      timestamp: new Date().toISOString()
    }));
  }, [currentVerificationLevel, identityVerified]);

  // Toggle full access status
  const toggleFullAccess = () => {
    setHasFullAccess(prev => !prev);
    toast.success(hasFullAccess ? "تم تقييد صلاحيات المساعد الذكي" : "تم منح المساعد الذكي صلاحيات كاملة");
  };
  
  // Set security level
  const setSecurityLevel = (level: 'standard' | 'enhanced' | 'strict') => {
    setSecurityMode(level);
    
    // Reset verification when changing security level
    if (level !== 'standard') {
      setIdentityVerified(false);
      setCurrentVerificationLevel(VerificationLevel.NONE);
    }
    
    toast.success(`تم تعيين مستوى الأمان إلى: ${
      level === 'standard' ? 'قياسي' : 
      level === 'enhanced' ? 'محسّن' : 'صارم'
    }`);
  };
  
  // Verify user identity before providing sensitive information
  const verifyUserIdentity = async (category: SensitiveDataCategory): Promise<boolean> => {
    const requiredLevel = getRequiredVerificationLevel(category);
    
    // If user is already verified at an equal or higher level, return true
    if (identityVerified && currentVerificationLevel >= requiredLevel) {
      return true;
    }
    
    // Create a new verification request
    const verificationRequest: VerificationRequest = {
      category,
      requiredLevel,
      timestamp: new Date(),
      verified: false,
      message: `يلزم التحقق من هويتك للوصول إلى معلومات ${
        category === SensitiveDataCategory.FINANCIAL ? 'مالية' :
        category === SensitiveDataCategory.CUSTOMER ? 'العملاء' :
        category === SensitiveDataCategory.INVENTORY ? 'المخزون' : 'النظام'
      }`
    };
    
    setPendingVerification(verificationRequest);
    
    // Wait for identity verification
    return new Promise<boolean>((resolve) => {
      // Simulate verification process - in a real app, this would be replaced with actual verification code
      setTimeout(() => {
        setCurrentVerificationLevel(requiredLevel);
        setIdentityVerified(true);
        setPendingVerification(null);
        resolve(true);
      }, 1000);
    });
  };

  // Scan for system errors
  const scanForSystemErrors = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        criticalErrors: 0,
        warnings: 3,
        notifications: 8,
        details: [
          { level: "warning", message: "بعض القيم في تقرير المخزون غير متطابقة" },
          { level: "warning", message: "يوجد 2 عميل بنفس رقم الهاتف" },
          { level: "warning", message: "تاريخ انتهاء صلاحية 3 منتجات قريب" },
          { level: "notification", message: "النسخة الاحتياطية الأخيرة منذ 3 أيام" }
        ]
      };
    } catch (error) {
      toast.error("حدث خطأ أثناء فحص النظام");
      console.error(error);
      throw error;
    }
  };

  return {
    hasFullAccess,
    toggleFullAccess,
    securityMode,
    setSecurityLevel,
    identityVerified,
    currentVerificationLevel,
    pendingVerification,
    setPendingVerification,
    verifyUserIdentity,
    scanForSystemErrors
  };
};
