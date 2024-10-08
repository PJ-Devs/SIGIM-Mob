import { View , Text} from "react-native";
import CustomInput from "../atoms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../atoms/CustomButton";
import Toast from 'react-native-toast-message';
import {  updateProfile } from "../../lib/api/api.fetch";

function UpdateProfileForm() {

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
              placeholder="Nombre"
              control={control}
            />
             <CustomInput
              propertyName="email"
              placeholder="Correo electronico"
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