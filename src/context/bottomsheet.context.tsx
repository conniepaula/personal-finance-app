import {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import BottomSheet, {
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { TouchableWithoutFeedback, View } from "react-native";
import { colors } from "@/shared/colors";

type BottomSheetContextType = {
  openBottomSheet: (content: ReactNode, index: number) => void;
  closeBottomSheet: () => void;
};

export const BottomSheetContext = createContext({} as BottomSheetContextType);

export const BottomSheetContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [index, setIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["70%", "90%"];

  const openBottomSheet = useCallback(
    (newContent: ReactNode, index: number) => {
      setIndex(index);
      setContent(newContent);
      setIsOpen(true);
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(index);
      });
    },
    []
  );

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);
    setIndex(-1);
    setContent(null);
    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {

    if (index === -1){
        setIsOpen(false);
    }
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
      {isOpen && (
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View className="absolute inset-0 bg-black/70 z-1" />
        </TouchableWithoutFeedback>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        style={{ zIndex: 2 }}
        index={index}
        backgroundStyle={{
            backgroundColor: colors["background-secondary"],
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            elevation: 9,
        }}
        enablePanDownToClose
      >
        <BottomSheetScrollView>{content}</BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetContext = () => {
  return useContext(BottomSheetContext);
};
