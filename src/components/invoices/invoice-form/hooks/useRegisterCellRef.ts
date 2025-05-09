
export function useRegisterCellRef(index: number, cellRefs?: Map<string, HTMLTableCellElement>) {
  const registerCellRef = (cellName: string) => (el: HTMLTableCellElement | null) => {
    if (el && cellRefs) {
      const cellId = `${index}-${cellName}`;
      cellRefs.set(cellId, el);
    }
  };

  return registerCellRef;
}
