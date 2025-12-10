import { FC } from "react";
import { Text, View, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";

import { TransactionTypes } from "@/shared/enums/transaction-types";
import { useTransactionContext } from "@/context/transaction.context";
import { ICONS } from "./strategies/icon-strategy";
import { CARD_DATA } from "./strategies/card-strategy";
import { MoneyMapper } from "@/shared/utils/money-mapper";
import clsx from "clsx";

export type TransactionCardTypes = TransactionTypes | "total";

interface TransactionCardProps {
  type: TransactionCardTypes;
  amount: number;
}

export const TransactionCard: FC<TransactionCardProps> = ({ type, amount }) => {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  const { transactions } = useTransactionContext();

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  );

  const isAndroid = Platform.OS === "android";

  return (
    <View
      className={clsx(
        `bg-${cardData.bgColor} rounded-[6] min-w-[280] px-8 py-6 mr-6 justify-between`,
        type === "total" && isAndroid && "mr-12"
      )}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-white">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
      </View>
      <View>
        <Text className="text-gray-400 font-bold text-2xl">
          {/* TODO: Change currency symbol based on user locale */}
          {MoneyMapper(amount, "en-GB", "GBP")}
        </Text>
        {type !== "total" && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction?.createdAt || "",
                  "'Last transaction on 'MMM d"
                )
              : "No transactions found"}
          </Text>
        )}
      </View>
    </View>
  );
};
