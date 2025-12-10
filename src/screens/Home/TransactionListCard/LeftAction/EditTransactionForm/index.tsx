import React, { FC, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CurrencyInput from "react-native-currency-input";
import { MaterialIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomsheet.context";

import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SelectCategoryModal } from "@/components/SelectCategoryModal";
import { SelectType } from "@/components/SelectType";
import { AppButton } from "@/components/AppButton";
import { editTransactionFormSchema } from "./schema";
import { Transaction } from "@/shared/interfaces/transaction";
import { IUpdateTransactionRequest } from "@/shared/interfaces/https/update-transaction-request";

interface EditTransactionFormProps {
  transaction: Transaction;
}

type ValidationErrors = Record<keyof IUpdateTransactionRequest, string>;

export const EditTransactionForm: FC<EditTransactionFormProps> = ({
  transaction: transactionToUpdate,
}) => {
  const { closeBottomSheet } = useBottomSheetContext();
  const { updateTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<IUpdateTransactionRequest>({
    id: transactionToUpdate.id,
    categoryId: transactionToUpdate.categoryId,
    description: transactionToUpdate.description,
    typeId: transactionToUpdate.typeId,
    value: transactionToUpdate.value,
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {} as ValidationErrors
  );

  const handleUpdateTransaction = async () => {
    try {
      setIsLoading(true);
      await editTransactionFormSchema.validate(transaction, {
        abortEarly: false,
      });
      await updateTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationErrors;
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof IUpdateTransactionRequest] = err.message;
          }
        });

        setValidationErrors(errors);
      } else {
        handleError(error, "An error occurred while updating the transaction.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setTransactionData = (
    key: keyof IUpdateTransactionRequest,
    value: string | number
  ) => {
    setTransaction((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <View className="px-8 py-5">
      <View className="w-full flex-row items-center justify-between">
        <Text className="text-white font-bold text-xl">New transaction</Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" size={20} color={colors.gray[700]} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 mt-8 mb-8">
        <TextInput
          onChangeText={(text) => setTransactionData("description", text)}
          placeholder="Description"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}
        <CurrencyInput
          value={transaction.value}
          // TODO: Adjust prefix, delimiter and separator based on user locale
          prefix="£"
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}
        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />
        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
        )}

        <SelectType
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
          typeId={transaction.typeId}
        />
        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
        )}
        <View className="my-4">
          <AppButton onPress={handleUpdateTransaction}>
            {isLoading ? <ActivityIndicator color={colors.white} /> : "Update"}
          </AppButton>
        </View>
      </View>
    </View>
  );
};
