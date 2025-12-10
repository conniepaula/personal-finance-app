import { AppHeader } from "@/components/AppHeader";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionListCard } from "./TransactionListCard";

export const Home = () => {
  const { transactions, fetchCategories, fetchTransactions } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Failed to fetch transaction categories.");
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([handleFetchCategories(), fetchTransactions()]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        data={transactions}
        keyExtractor={(item) => `transaction-${item.id}`}
        renderItem={({ item }) => <TransactionListCard transaction={item} />}
        ListHeaderComponent={ListHeader}
        className="bg-background-secondary"
      />
    </SafeAreaView>
  );
};
