import { FC } from "react";
import { Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { MaterialIcons } from "@expo/vector-icons";

import { Transaction } from "@/shared/interfaces/transaction";
import { format } from "date-fns/format";
import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import clsx from "clsx";
import { RightAction } from "./RightAction";
import { LeftAction } from "./LeftAction";
import { MoneyMapper } from "@/shared/utils/money-mapper";

interface TransactionListCardProps {
  transaction: Transaction;
}

export const TransactionListCard: FC<TransactionListCardProps> = ({
  transaction,
}) => {
  const isExpense = transaction.typeId === TransactionTypes.EXPENSE;

  return (
    <Swipeable
      containerStyle={{
        alignItems: "center",
        alignSelf: "center",
        overflow: "visible",
        width: "90%",
        marginBottom: 16,
      }}
      renderRightActions={() => <RightAction transactionId={transaction.id} />}
      overshootRight={false}
      renderLeftActions={() => <LeftAction transaction={transaction} />}
      overshootLeft={false}
    >
      <View className="h-[140] bg-background-tertiary rounded-[6] p-6">
        <Text className="text-white text-base">{transaction.description}</Text>
        <Text
          className={clsx(
            "text-2xl font-bold mt-2",
            isExpense ? "text-accent-red" : "text-accent-brand-light"
          )}
        >
          {isExpense && "-"}
          {MoneyMapper(transaction.value, "en-GB", "GBP")}
        </Text>
        <View className="flex-row w-full justify-between items-center">
          <View className="items-center flex-row mt-3">
            <MaterialIcons
              name="label-outline"
              size={23}
              color={colors.gray[700]}
            />
            <Text className="text-gray-700 text-base ml-2">
              {transaction.category.name}
            </Text>
          </View>
          <View className="items-center flex-row mt-3">
            <MaterialIcons
              name="calendar-month"
              size={20}
              color={colors.gray[700]}
            />
            <Text className="text-gray-700 text-base ml-2">
              {format(transaction.createdAt, "dd/MM/yyyy")}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
