
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { JournalEntry, JournalStatus } from '@/types/journal';
import { mockJournalEntries } from '@/data/mockJournalEntries';

export const useJournalEntries = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, fetch from API
    setEntries(mockJournalEntries);
    setFilteredEntries(mockJournalEntries);
  }, []);

  const searchEntries = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredEntries(entries);
      return;
    }

    const filtered = entries.filter(entry => {
      const searchTermLower = term.toLowerCase();
      return (
        entry.entryNumber.toLowerCase().includes(searchTermLower) ||
        entry.description.toLowerCase().includes(searchTermLower) ||
        entry.totalDebit.toString().includes(searchTermLower) ||
        entry.totalCredit.toString().includes(searchTermLower) ||
        entry.lines.some(line => 
          line.accountName.toLowerCase().includes(searchTermLower) ||
          line.description.toLowerCase().includes(searchTermLower)
        )
      );
    });

    setFilteredEntries(filtered);
  };

  const generateEntryNumber = (): string => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `JE-${year}${month}${day}-${random}`;
  };

  const addEntry = (entryData: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">) => {
    const newEntry: JournalEntry = {
      id: uuidv4(),
      ...entryData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setEntries(prev => {
      const updated = [...prev, newEntry];
      setFilteredEntries(updated);
      return updated;
    });

    return newEntry;
  };

  const updateEntry = (id: string, entryData: Partial<JournalEntry>) => {
    setEntries(prev => {
      const updated = prev.map(entry => 
        entry.id === id
          ? { ...entry, ...entryData, updatedAt: new Date() }
          : entry
      );
      setFilteredEntries(updated);
      return updated;
    });
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => {
      const updated = prev.filter(entry => entry.id !== id);
      setFilteredEntries(updated);
      return updated;
    });

    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
  };

  const updateEntryStatus = (id: string, status: JournalStatus) => {
    updateEntry(id, { status });
  };

  return {
    entries: filteredEntries,
    selectedEntry,
    setSelectedEntry,
    searchTerm,
    addEntry,
    updateEntry,
    deleteEntry,
    searchEntries,
    updateEntryStatus,
    generateEntryNumber,
  };
};
