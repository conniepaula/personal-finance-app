import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { Checkbox } from "expo-checkbox";

import { useTransactionContext } from "@/context/transaction.context";
import { colors } from "@/shared/colors";

interface SelectCategoryModalProps {
  selectedCategory: number;
  onSelect: (categoryId: number) => void;
}

export const SelectCategoryModal: FC<SelectCategoryModalProps> = ({
  selectedCategory,
  onSelect,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { categories } = useTransactionContext();

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleSelect = (categoryId: number) => {
    onSelect(categoryId);
    setShowModal(false);
  };

  const selected = useMemo(
    () => categories.find(({ id }) => id === selectedCategory),
    [categories, selectedCategory]
  );

  return (
    <>
      <TouchableOpacity
        onPress={handleModal}
        className="h-[50] bg-background-primary my-2 rounded-[6] pl-4 justify-center"
      >
        <Text
          className={clsx("text-lg", selected ? "text-white" : "text-gray-700")}
        >
          {selected?.name ?? "Select Category"}
        </Text>
      </TouchableOpacity>
      <Modal visible={showModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[90%] bg-background-secondary p-4 rounded-xl ">
              <Text className="text-white text-lg mb-4">Select Category</Text>
              <FlatList
                data={categories}
                keyExtractor={(item) => `category-${item.id}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.id)}
                    className="flex-row items-center bg-gray-800 rounded-lg mb-2 p-4"
                  >
                    <Checkbox
                      value={selected?.id === item.id}
                      onValueChange={() => handleSelect(item.id)}
                      className="mr-2"
                      color={colors["accent-brand-background-primary"]}
                    />
                    <Text className="text-white text-lg">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
