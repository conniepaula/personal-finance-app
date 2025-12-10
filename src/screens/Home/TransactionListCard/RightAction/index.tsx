import { FC, useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/shared/colors";
import { DeleteModal } from "./DeleteModal";
import * as transactionService from "@/shared/services/personal-finance/transaction.service";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";

interface RightActionProps {
  transactionId: number;
}

export const RightAction: FC<RightActionProps> = ({ transactionId }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const handleDeleteTransaction = async () => {
    try {
      setLoading(true);
      await transactionService.deleteTransaction(transactionId);
      notify({
        message: "Transaction deleted successfully.",
        messageType: "SUCCESS",
      });
      hideModal();
    } catch (error) {
      handleError(error, "Failed to delete transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-[6] justify-center items-center"
        onPress={showModal}
      >
        <MaterialIcons name="delete" size={24} color={colors.white} />
      </TouchableOpacity>
      <DeleteModal
        isVisible={isModalVisible}
        hideModal={hideModal}
        handleDeleteTransaction={handleDeleteTransaction}
        loading={loading}
      />
    </>
  );
};
