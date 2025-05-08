
import { useState } from 'react';
import { usePDFInvoiceParser } from './usePDFInvoiceParser';

export const usePDFAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isShowingAnalyzer, setIsShowingAnalyzer] = useState(false);
  
  const {
    isProcessing,
    parseInvoiceFromPDF,
    parsedData
  } = usePDFInvoiceParser();
  
  const showAnalyzer = () => {
    setIsShowingAnalyzer(true);
  };
  
  const hideAnalyzer = () => {
    setIsShowingAnalyzer(false);
  };
  
  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
  };
  
  const applyAnalysisResults = (callback: (data: any) => void) => {
    if (analysisResults) {
      callback(analysisResults);
      hideAnalyzer();
    }
  };
  
  return {
    isProcessing,
    analysisResults,
    isShowingAnalyzer,
    showAnalyzer,
    hideAnalyzer,
    handleAnalysisComplete,
    applyAnalysisResults,
    parsedData
  };
};
