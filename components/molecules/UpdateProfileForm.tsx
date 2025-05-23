import { View, Text } from "react-native";
import CustomInput from "../atoms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../atoms/CustomButton";
import Toast from "react-native-toast-message";
import { useState, useEffect } from "react";
import { User } from "../../types/products";
import { getProfile, updateProfile } from "../../lib/api/api.fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Loading from "./Loading";

function UpdateProfileForm() {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const schema = z.object({
    email: z.optional(z.string()
    .email({ message: "El correo electrónico no es válido." }),
  ),
  name: z.optional(z.string())
});

  type FormFields = z.infer<typeof schema>;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await AsyncStorage.getItem("profile");
        if (profileData !== null) {
          setUserProfile(JSON.parse(profileData));
        } else {
          const profile = await getProfile();
          setUserProfile(profile);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to retrieve enterprise data:", error);
        return null;
      }
    };
   fetchProfile();
  }, []);

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
  });

  const handleProfileUpdate = async (data: any) => {
    try {
      let profileInfo = {
        name: data.name || userProfile?.name,
        email: data.email || userProfile?.email,
      }
      await updateProfile(profileInfo);
      const new_profile = await getProfile();
      await AsyncStorage.setItem("profile", JSON.stringify(new_profile));
      Toast.show({
        type: "success",
        text1: "Perfil actualizado",
        text2: "Tu perfil ha sido actualizado exitosamente",
      });
      router.push("/profile");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error al actualizar el perfil",
        text2: error.message || "Por favor intenta de nuevo",
      });
    }
  };

  return (
    <View
      className="flex-col mt-8 h-[80%] justify-center"
      style={{ gap: 15 }}
    >
      {loading && !userProfile ? (
        <Loading />
      ) : (
        <>
          <Text className="font-bold text-xl text-blue-400">
            {"Cambia tu información"}
          </Text>
          <CustomInput
            propertyName="name"
            control={control}
            trigger={trigger}
            initialValue={userProfile?.name}
          />
          <CustomInput
            propertyName="email"
            control={control}
            trigger={trigger}
            initialValue={userProfile?.email}
          />
          <CustomButton
            onPress={handleSubmit(handleProfileUpdate)}
            title="Guardar cambios"
            type="primary"
          ></CustomButton>
          <Toast></Toast>
        </>
      )}
    </View>
  );
}

export default UpdateProfileForm;
