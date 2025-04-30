
import { useState } from "react";
import { v4 as uuid } from "uuid";

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

export function useLocations() {
  // Mock data for warehouses
  const [warehouses] = useState<Warehouse[]>([
    {
      id: "w1",
      name: "المستودع الرئيسي",
      code: "MAIN",
      address: "الرياض - طريق الملك فهد"
    },
    {
      id: "w2",
      name: "مستودع جدة",
      code: "JED",
      address: "جدة - طريق الملك عبدالعزيز"
    },
    {
      id: "w3",
      name: "مستودع الدمام",
      code: "DMM",
      address: "الدمام - طريق الملك فهد"
    }
  ]);

  // Mock data for locations
  const [locations, setLocations] = useState<StorageLocation[]>([
    {
      id: uuid(),
      name: "رف A1",
      code: "MAIN-A1",
      warehouseId: "w1",
      warehouseName: "المستودع الرئيسي",
      description: "قسم قطع غيار المحركات",
      capacity: 100,
      itemCount: 75,
      isActive: true
    },
    {
      id: uuid(),
      name: "رف B2",
      code: "MAIN-B2",
      warehouseId: "w1",
      warehouseName: "المستودع الرئيسي",
      description: "قسم قطع غيار العجلات",
      capacity: 150,
      itemCount: 120,
      isActive: true
    },
    {
      id: uuid(),
      name: "رف C3",
      code: "MAIN-C3",
      warehouseId: "w1",
      warehouseName: "المستودع الرئيسي",
      description: "قسم الزيوت والسوائل",
      capacity: 80,
      itemCount: 35,
      isActive: true
    },
    {
      id: uuid(),
      name: "رف A1",
      code: "JED-A1",
      warehouseId: "w2",
      warehouseName: "مستودع جدة",
      description: "قسم قطع غيار البطاريات",
      capacity: 60,
      itemCount: 45,
      isActive: true
    },
    {
      id: uuid(),
      name: "رف B1",
      code: "JED-B1",
      warehouseId: "w2",
      warehouseName: "مستودع جدة",
      description: "قسم قطع غيار التكييف",
      capacity: 70,
      itemCount: 50,
      isActive: true
    },
    {
      id: uuid(),
      name: "رف A1",
      code: "DMM-A1",
      warehouseId: "w3",
      warehouseName: "مستودع الدمام",
      description: "قسم قطع غيار متنوعة",
      capacity: 120,
      itemCount: 90,
      isActive: false
    }
  ]);

  // Add a new location
  const addLocation = (location: Omit<StorageLocation, "id" | "itemCount">) => {
    const newLocation: StorageLocation = {
      ...location,
      id: uuid(),
      itemCount: 0
    };
    setLocations([...locations, newLocation]);
    return newLocation;
  };

  // Update an existing location
  const updateLocation = (id: string, updates: Partial<StorageLocation>) => {
    setLocations(locations.map(location => 
      location.id === id ? { ...location, ...updates } : location
    ));
  };

  // Delete a location
  const deleteLocation = (id: string) => {
    setLocations(locations.filter(location => location.id !== id));
  };

  return {
    locations,
    warehouses,
    addLocation,
    updateLocation,
    deleteLocation
  };
}
