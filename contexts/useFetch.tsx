import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface FetchContextData<T> {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  resource: T | T[] | null;
  setResource: (resource: T | T[] | null) => void;
}

const FetchContext = createContext<FetchContextData<any> | null>(null);

export const useFetch = () => {
  const context = useContext(FetchContext);

  if (!context) {
    throw new Error("useFetch must be used within a FetchProvider");
  }

  return context;
};