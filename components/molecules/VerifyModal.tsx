import React, { useState } from "react";
import { Text, View } from "react-native";
import CustomModal from "./CustomModal";
import CustomButton from "../atoms/CustomButton";

interface VerifyModalProps {
  title: string;
  message: string;
  modalVisible: boolean;
  action: () => void;
  setVisible: (value: boolean) => void;
}

export default function VerifyModal({
  title,
  message,
  modalVisible,
  action,
  setVisible,
}: VerifyModalProps): JSX.Element {
  return (
    <CustomModal
      title={title}
      visible={modalVisible}
      onClose={() => setVisible(false)}
    >
      <View className="w-full" style={{ gap: 15 }}>
        <Text className="text-center text-lg text-gray-800">{message}</Text>
        <View
          className="w-full flex-row"
          style={{
            gap: 8,
          }}
        >
          <CustomButton
            type="success"
            title="Estoy seguro!"
            icon="check"
            iconSize={20}
            onPress={() => {
              action();
              setVisible(false);
            }}
            style="w-1/2 py-1.5"
          />
          <CustomButton
            type="error"
            title="Cancelar"
            icon="times"
            iconSize={20}
            iconColor="white"
            onPress={() => {
              setVisible(false);
            }}
            style="w-1/2 py-1.5"
          />
        </View>
      </View>
    </CustomModal>
  );
}
