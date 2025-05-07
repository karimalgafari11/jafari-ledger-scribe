
import { useState } from "react";
import { mockStockMovements } from "@/data/mockStockMovements";
import { StockMovement } from "@/types/inventory";
import { v4 as uuidv4 } from "uuid";

export const useInventoryTransfer = () => {
  const [transfers, setTransfers] = useState<StockMovement[]>(
    mockStockMovements.filter((m) => m.type === "transfer")
  );

  // Create a new transfer
  const createTransfer = (
    productId: string,
    productName: string,
    quantity: number,
    sourceWarehouse: string,
    destinationWarehouse: string,
    notes: string = ""
  ): StockMovement => {
    const newTransfer: StockMovement = {
      id: uuidv4(),
      date: new Date(),
      type: "transfer",
      productId,
      productName,
      itemName: productName, // Set alias for backward compatibility
      quantity,
      sourceWarehouseName: sourceWarehouse,
      sourceWarehouse, // Set alias for backward compatibility
      destinationWarehouseName: destinationWarehouse,
      destinationWarehouse, // Set alias for backward compatibility
      userId: "1",
      userName: "Admin",
      notes,
    };

    setTransfers((prev) => [newTransfer, ...prev]);
    return newTransfer;
  };

  // View transfer details
  const getTransferById = (id: string) => {
    return transfers.find((transfer) => transfer.id === id);
  };

  // Delete a transfer
  const deleteTransfer = (id: string) => {
    setTransfers((prev) => prev.filter((transfer) => transfer.id !== id));
  };

  return {
    transfers,
    createTransfer,
    getTransferById,
    deleteTransfer,
  };
};
