import { Image, Pressable, Text, View } from "react-native";
import Layout from "../orgnisms/Layout";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { useState } from "react";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import Toast from "react-native-toast-message";

export default function Login(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data: any) => {
    if (!onLogin) {
      console.log("Login function is not available");
      return;
    }

    setLoading(true);
    const result = await onLogin!(data);
    setLoading(false);
    
    console.log(result);
    // if (result.err) {
    //   Toast.show({
    //     type: 'error',
    //     text1: result.message,
    //     text2: 'Por favor intenta de nuevo',
    //     position: 'top',
    //     visibilityTime: 1000,
    //     topOffset:10
    //   });
      
    //   console.log("Error en el loadsafsgin", result.message);
    // } else {
    //   router.push("/");
    // }
  };
  
  return (
    <Layout includeHeader={false}>
      <View>
       

        <View className="flex-1 justify-center w-full h-full">
          <View className="items-center mb-10">
            <Pressable onPress={() => router.push("/newRoute")}>
              <Image className="w-[150px] h-[150px] bg-primary rounded-full" />
            </Pressable>
          </View>
          <Text className="w-full text-xl font-semibold">Iniciar sesión</Text>
          <View className="py-5" style={{ gap: 15 }}>
            <CustomInput
              propertyName="email"
              placeholder="E-mail"
              type="email-address"
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
            <View>
              <CustomInput
                propertyName="password"
                placeholder="Password"
                secureTextEntry={true}
                control={control}
                rules={{
                  required: "Este campo es requerido",
                }}
                trigger={trigger}
              />
              <Pressable onPress={handleSubmit(handleLogin)}>
                <Text className={anchorContainer}>
                  Olvidaste tu contraseña?{" "}
                  <Text className="text-blue-500">Recuperar</Text>
                </Text>
              </Pressable>
            </View>
          </View>
          <CustomButton
            type="primary"
            title="Ingresa"
            loading={loading}
            onPress={handleSubmit(handleLogin)}
          />
          <Pressable
            onPress={() => {
              router.push("/signUp");
            }}
          >
            <Text className={`${anchorContainer} text-center`}>
              No tienes una cuenta?{" "}
              <Text className="text-blue-500">Crea una</Text>
            </Text>
          </Pressable>
        </View>
      </View>
      <Toast ></Toast>
    </Layout>
  );
}

const anchorContainer = "text-black text-right mt-2 opacity-75";
