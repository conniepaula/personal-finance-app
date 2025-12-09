import { personalFinanceApi } from "@/shared/api/personal-finance";
import { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import { ITransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response";

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
