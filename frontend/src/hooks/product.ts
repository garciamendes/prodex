import { ProductContext } from "@/contexts/product";
import { useContext } from "react";

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) throw new Error();

  return context;
};
