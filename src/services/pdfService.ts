
import { InvoiceAnalysisResult } from "@/hooks/ai/usePDFInvoiceAnalysis";
import { supabase } from "@/integrations/supabase/client";

export class PDFService {
  /**
   * Extract text from a PDF file
   */
  static async extractTextFromPDF(file: File): Promise<string> {
    try {
      // Convert PDF to text using a PDF parsing library
      // This is a mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Mock PDF Content from ${file.name}`);
        }, 500);
      });
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      throw new Error("Failed to extract text from PDF");
    }
  }

  /**
   * Analyze invoice data from a PDF file
   */
  static async analyzeInvoice(file: File): Promise<InvoiceAnalysisResult> {
    try {
      // 1. Extract text from PDF
      const pdfText = await this.extractTextFromPDF(file);
      
      // 2. Call the DeepSeek AI endpoint to analyze the invoice
      const { data, error } = await supabase.functions.invoke('analyze-invoice', {
        body: { pdfText }
      });
      
      if (error) {
        console.error("Error analyzing invoice:", error);
        throw new Error("Failed to analyze invoice");
      }
      
      // 3. Return the extracted data
      return data as InvoiceAnalysisResult;
    } catch (error) {
      console.error("Error analyzing invoice:", error);
      throw new Error("Failed to analyze invoice data");
    }
  }
}
