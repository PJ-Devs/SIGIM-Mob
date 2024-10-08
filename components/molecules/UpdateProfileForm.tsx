import { View , Text} from "react-native";
import CustomInput from "../atoms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../atoms/CustomButton";
import Toast from 'react-native-toast-message';
import {  updateProfile } from "../../lib/api/api.fetch";
import { useState, useEffect } from "react";
import { User } from "../../types/products";
import {  getProfile } from "../../lib/api/api.fetch";

function UpdateProfileForm() {

  const [userProfile, setUserProfile] = useState<User>({
    id: 0,
    email: "",
    name: "",
    role: {
      id: 0,
      name: "",
    },
  });

  useEffect(() => {
   
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        console.log("Profile data", profileData);
        setUserProfile(profileData);
      } catch (error) {
        console.log("Error fetching user profile", error);
      }
    };
   
    fetchProfile();
  }, []);

    const {
        handleSubmit,
        control,
        trigger,
        formState: { errors },
      } = useForm();
      const handleProfileUpdate = async (data:any) => {
        try {
          data =await updateProfile(data);
          console.log('uddated data' ,data);
          Toast.show({
            type: 'success',
            text1: 'Perfil actualizado',
            position: 'top',
            visibilityTime: 1000,
            topOffset:10
          });
        } catch (error:any) {
          Toast.show({
            type: 'error',
            text1: 'Error al actualizar el perfil',
            text2: error.message || 'Por favor intenta de nuevo',
        });
        }
      }; 

    return (  
        <View className="flex-col mt-8" style={{ gap: 15 }}>
       <Text className="font-bold text-xl text-blue-400" >
            {"Cambia tu información"}
          </Text>
        <CustomInput
              propertyName="name"
              placeholder={userProfile.name || 'Nombre'}
              control={control}
            />
             <CustomInput
              propertyName="email"
              placeholder={userProfile.email || 'Correo electronico'}
              control={control}
              trigger={trigger}
              rules={{
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ingresa un correo electrónico válido",
                },
              }}
            />
            <CustomButton onPress={handleSubmit(handleProfileUpdate)} title="Guardar cambios" type="primary" 
            ></CustomButton>
              <Toast ></Toast>
        </View>
    );
}

export default UpdateProfileForm;