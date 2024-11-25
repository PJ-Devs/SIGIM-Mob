import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Category } from "../../types/products";
import CustomButton from "../atoms/CustomButton";
import CustomModal from "../molecules/CustomModal";
import { deleteCategory, updateCategory } from "../../lib/api/api.categories";
import CategoryForm from "../molecules/CategoryForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../lib/schemas/products";
import * as z from "zod";
import { useForm } from "react-hook-form";
import VerifyModal from "../molecules/VerifyModal";

interface CategoryCardProps {
  category: Category;
  onPress: (id: number) => void;
  onAction: () => void;
  isActive: boolean;
}

export default function CategoryCard({
  category,
  onPress,
  onAction,
  isActive,
}: CategoryCardProps): JSX.Element {
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(-10)).current;
  const [modalState, setModalState] = useState<{
    isUpdate: boolean;
    isDelete: boolean;
    isEnable: boolean;
  }>({
    isUpdate: false,
    isDelete: false,
    isEnable: false,
  });

  type FormFields = z.infer<typeof categorySchema>;
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(categorySchema),
  });

  const handleUpdateCategory = async (data: any) => {
    try {
      await updateCategory(category.id.toString(), data).then(() => {
        onAction();
      });
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(category.id.toString()).then(() => {
        onAction();
        setModalState({ ...modalState, isDelete: false });
      });
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: isActive ? 1 : 0,
      duration: 120,
      useNativeDriver: false,
    }).start();

    if (isActive) {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: -10,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive]);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#EBF8FF"],
  });

  const interpolatedBorderColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#3182CE"],
  });

  return (
    <Animated.View
      style={{
        backgroundColor: interpolatedBackgroundColor,
        borderColor: interpolatedBorderColor,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 6,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }}
    >
      <Pressable onPress={() => onPress(category.id)}>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center" style={{ gap: 6 }}>
            <View
              className={`h-3.5 w-3.5 rounded-full ${
                category.status === "available"
                  ? "bg-green-700"
                  : "bg-orange-500"
              }`}
            />
            <Text className="text-lg font-semibold">{category.name}</Text>
          </View>
          <Animated.View
            style={{
              opacity: buttonOpacity,
              transform: [{ translateY: buttonTranslateY }],
            }}
          >
            {category.status === "available" && (
              <View className="flex-row" style={{ gap: 8 }}>
                <CustomButton
                  style="flex justify-center items-center bg-orange-300 p-2 rounded-full shadow-sm"
                  type="icon"
                  icon="pen"
                  iconColor="white"
                  iconSize={16}
                  onPress={() =>
                    setModalState({ ...modalState, isUpdate: true })
                  }
                />
                <CustomButton
                  style="flex justify-center items-center bg-red-400 p-2 rounded-full shadow-sm"
                  type="icon"
                  iconColor="white"
                  iconSize={16}
                  icon="trash"
                  onPress={() =>
                    setModalState({ ...modalState, isDelete: true })
                  }
                />
              </View>
            )}
            {category.status === "unavailable" && (
              (
                <View className="flex-row" style={{ gap: 8 }}>
                  <CustomButton
                    style="flex justify-center items-center bg-[#4C9DFF] p-2 rounded-full shadow-sm"
                    type="icon"
                    icon="redo"
                    iconColor="white"
                    iconSize={16}
                    onPress={() =>
                      setModalState({ ...modalState, isEnable: true })
                    }
                  />
                  <CustomButton
                    style="flex justify-center items-center bg-red-400 p-2 rounded-full shadow-sm"
                    type="icon"
                    iconColor="white"
                    iconSize={16}
                    icon="trash"
                    onPress={() =>
                      setModalState({ ...modalState, isDelete: true })
                    }
                  />
                </View>
              )
            )}
          </Animated.View>
        </View>
        <Text className="text-gray-700">{category.description}</Text>
      </Pressable>
      <CustomModal
        title={"Actualizar categoria"}
        visible={modalState.isUpdate}
        onClose={() => {
          setModalState({ ...modalState, isUpdate: false });
          reset();
        }}
      >
        <CategoryForm
          actionTitle={"Actualizar categoria"}
          control={control}
          errors={errors}
          trigger={trigger}
          onSubmit={() => {
            handleSubmit(handleUpdateCategory)
            setModalState({ ...modalState, isUpdate: false });
          }}
          initialValues={category}
        />
      </CustomModal>
      <VerifyModal 
        title="Eliminar categoria"
        message="¿Estás seguro de eliminar la categoria?"
        action={() => handleDeleteCategory()}
        modalVisible={modalState.isDelete}
        setVisible={() => setModalState({ ...modalState, isDelete: false })}
      />
      <VerifyModal
        title="Habilitar categoria" 
        message="¿Estás seguro de habilitar la categoria?"
        modalVisible={modalState.isEnable}
        action={() => handleUpdateCategory({ status: "available" })}
        setVisible={() => setModalState({ ...modalState, isEnable: false })}
      />
    </Animated.View>
  );
}
