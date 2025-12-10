import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import { ITransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response";
import * as transactionService from "@/shared/services/personal-finance/transaction.service";
import { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import { Transaction } from "@/shared/interfaces/transaction";
import { TotalTransactions } from "@/shared/interfaces/total-transactions";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: Array<ITransactionCategoryResponse>;
  createTransaction: (transaction: ICreateTransactionRequest) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  totalTransactions: TotalTransactions;
  transactions: Array<Transaction>;
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
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({
    revenue: 0,
    expense: 0,
    total: 0,
  });

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: ICreateTransactionRequest) => {
    await transactionService.createTransaction(transaction);
  };

  const fetchTransactions = useCallback(async () => {
    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    });

    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        categories,
        transactions,
        createTransaction,
        fetchTransactions,
        totalTransactions,
      }}
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
