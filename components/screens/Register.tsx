import RegisterEnterpriseForm from "../molecules/EnterpriseRegisterForm";
import Layout from "../orgnisms/Layout";
import { useState } from "react";
import RegisterOwnerForm from "../molecules/OwnerRegisterForm";
import { Pressable, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { router } from "expo-router";
import Toast from 'react-native-toast-message';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export default function Register(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(1);
  const { onRegister } = useAuth();
  const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

  const schema = z.object({
    enterprise_email: z.string({ message: "El correo es obligatorio." })
      .email({ message: "El correo electrónico no es válido." })
      .min(1, { message: "El correo es obligatorio." }),
    
    enterprise_name: z.string({ message: "El nombre de la empresa es obligatorio." })
      .min(1, { message: "El nombre de la empresa es obligatorio." })
      .max(100, { message: "El nombre de la empresa no debe exceder 100 caracteres." }),
    
    phone_number: z.string(),
    
    enterprise_NIT: z.string({ message: "El NIT de la empresa es obligatorio." })
      .min(1, { message: "El NIT de la empresa es obligatorio." }),

    owner_password:z.string({ message: "Este campo es obligatorio" })
    .regex(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/, { message: "La contraseña solo puede contener caracteres alfanuméricos y caracteres especiales válidos." })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .refine(val => !val.includes('ñ'), { message: "La contraseña no puede contener la letra 'ñ'." })
    .refine(val => specialCharacters.test(val), { message: "La contraseña debe contener al menos un carácter especial válido." }),
    owner_name: z.string({ message: "El nombre del propietario es obligatorio." })
      .min(1, { message: "El nombre del propietario es obligatorio." })
      .max(100, { message: "El nombre del propietario no debe exceder 100 caracteres." }),
  
    owner_email: z.string({ message: "El correo electrónico es obligatorio." })
      .email({ message: "El correo electrónico no es válido." })
      .min(1, { message: "El correo electrónico es obligatorio." }),
  });
  
  type FormFields = z.infer<typeof schema>;

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
  
  const handleRegisterAll = async (data: any) => {
    const result = await onRegister!(data);

    if (result?.err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: result.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Registro exitoso',
        text2: '¡Bienvenido!',
      });
      router.push("/");
    }
  };

  const goToNextStep = async () => {
    const isValid = await trigger(['enterprise_NIT', 'enterprise_email', 'enterprise_name', 'phone_number']); 
  
    if (isValid) {
      setCurrentStep((prev) => prev + 1); 
    } 
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); 
  };
  
  return (
    <Layout includeHeader={false} canGoBack={currentStep === 1}>
      <View className="px-5">
      {currentStep === 1 && (
        <RegisterEnterpriseForm 
          control={control}
          trigger={trigger}
          onRegister={goToNextStep}
          errors={errors}
        />
      )}

      {currentStep === 2 && (
        <RegisterOwnerForm 
          trigger={trigger}
          control={control} 
          onRegister={handleSubmit(handleRegisterAll)}  
          onBack={goToPreviousStep} 
          errors={errors}  
        />
      )}
      
      {currentStep === 3 && (
        <Pressable onPress={handleSubmit(handleRegisterAll)}>
          <Text>Finalizar registro</Text>
        </Pressable>
      )}

      <Toast />
      </View>
    </Layout>
  );
}
