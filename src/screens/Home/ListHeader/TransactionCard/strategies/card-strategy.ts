import { TransactionTypes } from "@/shared/enums/transaction-types";
import { TransactionCardTypes } from "..";

interface CardData {
  label: string;
  bgColor: string;
}

export const CARD_DATA: Record<TransactionCardTypes, CardData> = {
  [TransactionTypes.REVENUE]: {
    label: "Revenue",
    bgColor: "background-tertiary",
  },
  [TransactionTypes.EXPENSE]: {
    label: "Expenses",
    bgColor: "background-tertiary",
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary",
  },
};
