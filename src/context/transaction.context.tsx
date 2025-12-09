import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { ITransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response";
import * as transactionService from "@/shared/services/personal-finance/transaction.service";
import { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: Array<ITransactionCategoryResponse>;
  createTransaction: (transaction: ICreateTransactionRequest) => Promise<void>;
};

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<
    Array<ITransactionCategoryResponse>
  >([]);

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: ICreateTransactionRequest) => {
    await transactionService.createTransaction(transaction);
  };

  return (
    <TransactionContext.Provider
      value={{ fetchCategories, categories, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionContextProvider"
    );
  }
  return context;
};
