
import { useAiChat } from "./ai/useAiChat";
import { useAiDataAccess } from "./ai/useAiDataAccess";
import { useAiSecurityContext } from "./ai/useAiSecurityContext";
import { useAiSystemContext } from "./ai/useAiSystemContext";

/**
 * Main hook for AI assistant functionality
 * This hook integrates all AI-related functionality from more specialized hooks
 */
export const useAiAssistant = () => {
  // Get chat functionality
  const {
    sendMessage,
    isLoading,
    chatHistory,
    clearChatHistory
  } = useAiChat();
  
  // Get security context
  const {
    hasFullAccess,
    toggleFullAccess,
    securityMode,
    setSecurityLevel,
    identityVerified,
    currentVerificationLevel,
    pendingVerification,
    verifyUserIdentity,
    scanForSystemErrors
  } = useAiSecurityContext();
  
  // Get system context and alerts
  const {
    systemAlerts,
    getSystemAlerts,
    generateSystemAlerts
  } = useAiSystemContext();
  
  // Get data access functions
  const {
    getLowStockProducts,
    getPendingExpenses,
    getPendingJournalEntries,
    analyzePerformance
  } = useAiDataAccess();

  return {
    // Chat functionality
    sendMessage,
    isLoading,
    chatHistory,
    clearChatHistory,
    
    // Security context
    hasFullAccess,
    toggleFullAccess,
    securityMode,
    setSecurityLevel,
    identityVerified,
    currentVerificationLevel,
    pendingVerification,
    verifyUserIdentity,
    scanForSystemErrors,
    
    // System context and alerts
    systemAlerts,
    getSystemAlerts,
    generateSystemAlerts,
    
    // Data access
    getLowStockProducts,
    getPendingExpenses,
    getPendingJournalEntries,
    analyzePerformance
  };
};
