
import { useState } from 'react';
import { JournalEntry } from '@/types/journal';

export const useJournalDialogs = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);

  const handleCreate = () => {
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (entry: JournalEntry) => {
    setCurrentEntry(entry);
    setIsEditDialogOpen(true);
  };

  const handleView = (entry: JournalEntry) => {
    setCurrentEntry(entry);
    setIsViewDialogOpen(true);
  };

  return {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isViewDialogOpen,
    setIsViewDialogOpen,
    currentEntry,
    handleCreate,
    handleEdit,
    handleView,
  };
};
