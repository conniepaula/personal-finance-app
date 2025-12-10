import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { FC } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

interface DeleteModalProps {
  isVisible: boolean;
  hideModal: () => void;
  handleDeleteTransaction: () => void;
  loading: boolean;
}

export const DeleteModal: FC<DeleteModalProps> = ({
  isVisible,
  hideModal,
  handleDeleteTransaction,
  loading,
}) => {
  return (
    <View className="flex-1 absolute">
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="m-5 bg-background-secondary rounded-[16] p-8 items-center shadow-lg w-[90%] h-[322] z-2">
                {/* Modal header */}
                <View className="w-full flex-row items-center justify-between border-b border-gray-300 pb-6">
                  <View className="flex-row gap-6 items-center">
                    <MaterialIcons
                      name="error"
                      size={25}
                      color={colors.gray[400]}
                      className="mr-4"
                    />
                    <Text className="text-white text-xl">
                      Delete transaction?
                    </Text>
                  </View>
                  <TouchableOpacity onPress={hideModal}>
                    <MaterialIcons
                      name="close"
                      size={25}
                      color={colors.gray[800]}
                    />
                  </TouchableOpacity>
                </View>
                {/* Modal body */}
                <View className="p-3 flex-1 border-b border-gray-300 items-center justify-center">
                  <Text className="text-gray-500 text-lg leading-8">
                    Are you sure you want to delete this transaction? This
                    action cannot be undone.
                  </Text>
                </View>
                {/* Modal actions */}
                <View className="flex-row justify-end gap-4 w-full p-6 pb-0 pr-0">
                  <TouchableOpacity
                    onPress={hideModal}
                    className="w-[100] bg-none border-2 border-accent-brand items-center justify-center p-3 rounded-[6]"
                  >
                    <Text className="text-accent-brand">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDeleteTransaction}
                    className="w-[100] bg-accent-red-background-primary items-center justify-center p-3 rounded-[6]"
                  >
                    <Text className="text-white">
                      {loading ? <ActivityIndicator /> : "Delete"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
