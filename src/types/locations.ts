
export interface StorageLocation {
  id: string;
  name: string;
  code: string;
  warehouseId: string;
  warehouseName: string;
  description: string;
  capacity: number;
  itemCount: number;
  isActive: boolean;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: string;
}

export interface LocationSettings {
  showInactiveLocations: boolean;
  defaultWarehouse: string;
  sortOrder: 'name' | 'code' | 'warehouse' | 'capacity';
  autoAssignCodes: boolean;
  showCapacityWarnings: boolean;
  capacityWarningThreshold: number;
}
