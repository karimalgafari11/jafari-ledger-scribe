
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

  const handleEdit = (id: string) => {
    setIsEditDialogOpen(true);
  };

  const handleView = (id: string) => {
    setIsViewDialogOpen(true);
  };

  return {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isViewDialogOpen,
    setIsViewDialogOpen,
    handleCreate,
    handleEdit,
    handleView,
  };
};
