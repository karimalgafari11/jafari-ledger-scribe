
import React, { createContext, useContext, useState } from "react";
import { Account } from "@/types/accounts";

interface AccountDialogsContextType {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedAccount: Account | null;
  setSelectedAccount: (account: Account | null) => void;
}

const AccountDialogsContext = createContext<AccountDialogsContextType | undefined>(undefined);

export function AccountDialogsProvider({ 
  children,
  initialSelectedAccount = null
}: { 
  children: React.ReactNode;
  initialSelectedAccount?: Account | null;
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(initialSelectedAccount);

  return (
    <AccountDialogsContext.Provider
      value={{
        isAddDialogOpen,
        setIsAddDialogOpen,
        isEditDialogOpen,
        setIsEditDialogOpen,
        selectedAccount,
        setSelectedAccount,
      }}
    >
      {children}
    </AccountDialogsContext.Provider>
  );
}

export function useAccountDialogs() {
  const context = useContext(AccountDialogsContext);
  if (context === undefined) {
    throw new Error("useAccountDialogs must be used within an AccountDialogsProvider");
  }
  return context;
}
