
export function useCellFocus() {
  // Function to focus on a specific cell in the table
  const focusCell = (
    cellRefs: Map<string, HTMLElement>,
    rowIndex: number, 
    cellName: string,
    setActiveSearchCell: (cell: { rowIndex: number, cellName: string } | null) => void,
    setLastSelectedRowIndex: (index: number | null) => void
  ) => {
    const cellKey = `${rowIndex}-${cellName}`;
    const cellElement = cellRefs.get(cellKey);
    
    if (cellElement) {
      // Focus on the cell element
      cellElement.focus();
      
      // Update the active search cell state
      setActiveSearchCell({ rowIndex, cellName });
      setLastSelectedRowIndex(rowIndex);
      
      // Scroll cell into view if needed
      if (cellElement.scrollIntoView) {
        cellElement.scrollIntoView({ block: 'nearest' });
      }
    }
  };

  return { focusCell };
}
