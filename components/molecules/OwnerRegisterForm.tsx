import { Image, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";
import { RegisterOwnerFormat } from "../../types/products";

interface RegisterOwnerFormProps {
  setAdmin: React.Dispatch<React.SetStateAction<RegisterOwnerFormat>>;
  onRegister: () => void; 
  onBack: () => void; 
}

export default function RegisterOwnerForm({
   setAdmin, onRegister, onBack 
}: RegisterOwnerFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegister();
      onRegister();
    }, 2000);
  };



  return (
    <View>
      {router.canGoBack() && (
        <CustomButton
          type="icon"
          icon="arrow-left"
          iconSize={20}
          onPress={ onBack }
          style="absolute p-2.5 rounded-full border-[1px] border-solid border-dark z-1 shadow-md"
        />
      )}

      <View className="flex-1 justify-center w-full h-full">
        <Text className="text-center text-xl font-semibold">
        Añade tus datos como dueño de la empresa
        </Text>
        <View className="py-5" style={{ gap: 15 }}>
          <CustomInput
            placeholder="Nombre"
            onChangeText={(text) => setAdmin((prev) => ({ ...prev, owner_name: text }))}
            width={300}
          />
          <CustomInput
            placeholder="email"
            onChangeText={(text) => setAdmin((prev) => ({ ...prev, owner_email: text }))}
            width={300}
          />
          <CustomInput
            placeholder="Contraseña"
            onChangeText={(text) => setAdmin((prev) => ({ ...prev, owner_password: text }))}
            width={300}
          />
        </View>
        <CustomButton
          type="primary"
          title="Registrarme"
          loading={loading}
          onPress={handleRegister}
        />
      </View>
    </View>
  );
}

const anchorContainer = "text-black text-right mt-2 opacity-75";
