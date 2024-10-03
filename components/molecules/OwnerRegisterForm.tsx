import { Image, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";

interface RegisterOwnerFormProps {
  control:any;
  trigger:any,
  onRegister: () => void; 
  onBack: () => void; 
}

export default function RegisterOwnerForm({
   control, onRegister,trigger, onBack 
}: RegisterOwnerFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
          propertyName="owner_name"
            placeholder="Nombre"
            control={control}
            rules={{
              required: "Este campo es requerido",
            }}
            trigger={trigger}
          />
          <CustomInput
            placeholder="email"
            propertyName="owner_email"
            control={control}
            rules={{
              required: "Este campo es requerido",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Ingresa un correo electrónico válido",
              },
            }}
            trigger={trigger}
          />
          <CustomInput
            placeholder="Contraseña"
            propertyName="owner_password"
            control={control}
            rules={{
              required: "Este campo es requerido",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            }}
            trigger={trigger}
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
