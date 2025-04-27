
import { useState } from 'react';
import { JournalEntry } from '@/types/journal';

export const useJournalDialogs = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleCreate = () => {
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (entry: JournalEntry) => {
    setIsEditDialogOpen(true);
  };

  const handleView = (entry: JournalEntry) => {
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
