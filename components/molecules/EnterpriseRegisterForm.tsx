import { Image, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";
import { DTOEnterprise } from "../../types/products";

interface RegisterEnterpriseFormProps {
  enterprise: React.MutableRefObject<DTOEnterprise>;
}

export default function RegisterEnterpriseForm({
  enterprise,
}: RegisterEnterpriseFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(enterprise.current); 
    }, 2000);
  };

  const updateEnterpriseField = (field: keyof DTOEnterprise, value: string) => {
    enterprise.current = { ...enterprise.current, [field]: value };
  };

  return (
    <View>
      {router.canGoBack() && (
        <CustomButton
          type="icon"
          icon="arrow-left"
          iconSize={20}
          onPress={() => {
            router.back();
          }}
          style="absolute p-2.5 rounded-full border-[1px] border-solid border-dark z-1 shadow-md"
        />
      )}

      <View className="flex-1 justify-center w-full h-full">
        <View className="items-center mb-10">
          <Image
            className="w-[150px] h-[150px] bg-primary rounded-full"
            alt="logo"
          />
        </View>
        <Text className="w-full text-xl font-semibold">
          Regitrar tu empresa
        </Text>
        <View className="py-5" style={{ gap: 15 }}>
          <CustomInput
            placeholder="Nombre de empresa"
            value={enterprise.current.name}
            onChangeText={(text) => updateEnterpriseField("name", text)}
            width={300}
          />
          <CustomInput
            placeholder="NIT"
            value={enterprise.current.NIT}
            onChangeText={(text) => updateEnterpriseField("NIT", text)}
            width={300}
          />
          <CustomInput
            placeholder="Numero de contacto"
            value={enterprise.current.phoneNumber}
            onChangeText={(text) => updateEnterpriseField("phoneNumber", text)}
            width={300}
          />
          <CustomInput
            placeholder="E-mail"
            type="email-address"
            value={enterprise.current.email}
            onChangeText={(text) => updateEnterpriseField("email", text)}
            width={300}
          />
        </View>
        <CustomButton
          type="primary"
          title="Registrar Empresa"
          loading={loading}
          onPress={handleRegister}
        />
        <Pressable onPress={() => router.navigate("/login")}>
          <Text className={`${anchorContainer} text-center`}>
            Ya tienes una cuenta?{" "}
            <Text className="text-blue-500">Inicia sesion</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const anchorContainer = "text-black text-right mt-2 opacity-75";
