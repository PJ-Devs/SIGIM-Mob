import { Image, Pressable, Text, View } from "react-native";
import Layout from "../orgnisms/Layout";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { useState } from "react";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { login } from "../../lib/auth";

export default function Login(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data: any) => {
    try {
      setLoading(true);
      let formattedData = {
        ...data,
        device_name: "valen",
      }
      await login(formattedData).then(() => {
        setLoading(false);
        router.push("/");
      });
    } catch (error) {
      
    }
  }

  return (
    <Layout includeHeader={false}>
      <View>
        {router.canGoBack() && (
          <CustomButton
            type="icon"
            icon="arrow-left"
            iconSize={20}
            onPress={() => {
              router.back();
            }}
            style={`absolute p-2.5 rounded-full border-[1px] border-solid border-dark z-1 shadow-md`}
          />
        )}

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
              }}
              trigger={trigger}
            />
            <View>
              <CustomInput
                propertyName="password"
                placeholder="Password"
                control={control}
                rules={{
                  required: "Este campo es requerido",
                }}
                trigger={trigger}
              />
              <Pressable onPress={ handleSubmit(handleLogin)}>
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
            onPress={ handleSubmit(handleLogin)}
          />
          <Pressable onPress={ () =>{router.push("/signUp")}} >
            <Text className={`${anchorContainer} text-center`}>
              No tienes una cuenta?{" "}
              <Text className="text-blue-500">Crea una</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </Layout>
  );
}

const anchorContainer = "text-black text-right mt-2 opacity-75";
