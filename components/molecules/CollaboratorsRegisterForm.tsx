import { Text, View, Pressable } from "react-native";

interface RegisterCollaboratorsFormProps {
    onRegister: () => void;
    onBack: () => void; 
  }
  
  export default function RegisterCollaboratorsForm({ onRegister, onBack }: RegisterCollaboratorsFormProps) {
 
    return (
        <View className="flex-1 justify-center w-full h-full">
        <Text>Ralskjdflaksjdflkasjfdjskdf</Text>
        <Pressable onPress={onBack}>
          <Text>Volver</Text>
        </Pressable>
        <Pressable onPress={onRegister}>
          <Text>Finalizar registro</Text>
        </Pressable>
      </View>
    );
  }
  