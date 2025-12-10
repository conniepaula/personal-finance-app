import qs from "qs";

import { personalFinanceApi } from "@/shared/api/personal-finance";
import { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import {
  IGetTransactionResponse,
  IGetTransactionsParams,
} from "@/shared/interfaces/https/get-transaction";
import { ITransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response";
import { IUpdateTransactionRequest } from "@/shared/interfaces/https/update-transaction-request";

export const getTransactionCategories = async (): Promise<
  Array<ITransactionCategoryResponse>
> => {
  const { data } = await personalFinanceApi.get<
    Array<ITransactionCategoryResponse>
  >("/transaction/categories");
  return data;
};

export const createTransaction = async (
  transaction: ICreateTransactionRequest
) => {
  await personalFinanceApi.post("/transaction", transaction);
};

export const getTransactions = async (
  params: IGetTransactionsParams
): Promise<IGetTransactionResponse> => {
  const { data } = await personalFinanceApi.get<IGetTransactionResponse>(
    "/transaction",
    {
      params,
      paramsSerializer: (parameters) =>
        qs.stringify(parameters, { arrayFormat: "repeat" }),
    }
  );

  return data;
};

export const deleteTransaction = async (transactionId: number) => {
  await personalFinanceApi.delete(`/transaction/${transactionId}`);
}

export const updateTransaction = async (transaction: IUpdateTransactionRequest) => {
  await personalFinanceApi.put("/transaction", transaction);
};