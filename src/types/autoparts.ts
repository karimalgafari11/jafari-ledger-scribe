export interface AutoPart {
  id: string;
  code: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  reorderLevel: number;
  location: string;
  isActive: boolean;
  description?: string;
  imageUrl?: string;
}

export interface PartCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  isActive: boolean;
}

export interface AutoPartColumn {
  id: string;
  name: string;
  accessorKey: string;
  visible: boolean;
  order: number;
}

export interface AutoPartSettings {
  columns: AutoPartColumn[];
  defaultView: 'table' | 'grid';
  itemsPerPage: number;
}
