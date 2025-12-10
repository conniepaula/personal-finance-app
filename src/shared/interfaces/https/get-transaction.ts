import { TotalTransactions } from "../total-transactions";
import { Transaction } from "../transaction";

export interface IGetTransactionsParams {
  page: number;
  perPage: number;
  categoryIds?: Array<number>;
  typeId?: number;
  searchText?: string;
  from?: Date;
  to?: Date;
  orderId?: string;
}

export interface IGetTransactionResponse {
  data: Array<Transaction>;
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: TotalTransactions;
}
