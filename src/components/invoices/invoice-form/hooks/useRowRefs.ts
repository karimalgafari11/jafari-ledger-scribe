
import { useRef } from "react";

export function useRowRefs() {
  const inputRefs = {
    code: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    quantity: useRef<HTMLInputElement>(null),
    price: useRef<HTMLInputElement>(null),
    notes: useRef<HTMLInputElement>(null)
  };

  return { inputRefs };
}
