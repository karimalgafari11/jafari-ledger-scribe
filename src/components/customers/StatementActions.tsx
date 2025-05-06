
import { Button } from "@/components/ui/button";
import { Download, Printer, Mail, Share2, FileText } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface StatementActionsProps {
  onPrint: () => void;
  onDownload: () => void;
  onSendEmail: () => void;
  hasEmail: boolean;
}

export const StatementActions = ({ onPrint, onDownload, onSendEmail, hasEmail }: StatementActionsProps) => {
  return (
    <div className="flex items-center gap-2 rtl">
      <Button variant="outline" onClick={onPrint} className="flex gap-2">
        <Printer size={16} />
        طباعة
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-2">
            <Download size={16} />
            تصدير
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onDownload} className="flex gap-2 cursor-pointer">
            <FileText size={14} />
            <span>PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("تصدير Excel")} className="flex gap-2 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M8 13h2m-2 4h2m4-4h2m-2 4h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Excel</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("تصدير CSV")} className="flex gap-2 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>CSV</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-2">
            <Share2 size={16} />
            مشاركة
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => console.log("مشاركة رابط")} className="flex gap-2 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>نسخ الرابط</span>
          </DropdownMenuItem>
          {hasEmail && (
            <DropdownMenuItem onClick={onSendEmail} className="flex gap-2 cursor-pointer">
              <Mail size={14} />
              <span>إرسال بالبريد</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => console.log("مشاركة عبر واتساب")} className="flex gap-2 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.15.226-.584.731-.714.879-.131.148-.262.166-.486.056-.225-.112-.947-.348-1.804-1.116-.667-.595-1.117-1.329-1.248-1.554-.131-.226-.014-.347.099-.458.101-.1.224-.262.336-.393.112-.13.149-.226.224-.38.075-.155.037-.292-.019-.407-.056-.113-.505-1.217-.692-1.666-.181-.434-.366-.374-.505-.382a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.784.766-.784 1.871s.804 2.171.916 2.321c.112.155 1.567 2.405 3.804 3.371.531.229 1.109.366 1.439.468.605.192 1.156.165 1.592.1.485-.073 1.496-.613 1.707-1.204.211-.592.211-1.1.148-1.205-.056-.113-.207-.179-.43-.291" fill="currentColor"/>
            </svg>
            <span>واتساب</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
