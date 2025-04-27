
import React from "react";
import { toast } from "sonner";
import { JournalEntry } from "@/types/journal";

interface JournalActionsProps {
  selectedEntries: string[];
  entries: JournalEntry[];
  onExport: (format: "pdf" | "excel") => Promise<void>;
  onPrintPreview: () => Promise<void>;
}

export const JournalActions: React.FC<JournalActionsProps> = ({
  selectedEntries,
  entries,
  onExport,
  onPrintPreview,
}) => {
  const handleShareWhatsApp = () => {
    let message = "قيود محاسبية - النظام المحاسبي";
    
    if (selectedEntries.length > 0) {
      const selectedItems = entries
        .filter(entry => selectedEntries.includes(entry.id))
        .map(entry => `${entry.entryNumber}: ${entry.description} (${entry.totalDebit})`)
        .join("\n");
      
      message += "\n\nالقيود المختارة:\n" + selectedItems;
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    toast.success("تم فتح واتساب للمشاركة");
  };

  return (
    <JournalHeader 
      onCreateEntry={() => {}}
      onExport={onExport}
      onShareWhatsApp={handleShareWhatsApp}
      onPrintPreview={onPrintPreview}
    />
  );
};
