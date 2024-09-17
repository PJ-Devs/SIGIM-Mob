import React from 'react';
import { View, Dimensions } from 'react-native';
import SectionCard from '../molecules/SectionCard';


export default function Sections() {
    return (
        <View className="h-screen flex flex-col mb-3">
          <View className="flex-1">
            <SectionCard
              color="blue"
              link="/productList"
              linkText="Inventario"
            />
          </View>
          <View className="flex-1">
            <SectionCard
              color="blue"
              link="/profile"
              linkText="Perfil"
            />
          </View>
          <View className="flex-1">
            <SectionCard
              color="blue"
              link="/login"
              linkText="Acceder"
            />
          </View>
          <View className="flex-1">
            <SectionCard
              color="blue"
              link="/signUp"
              linkText="Registrarse"
            />
          </View>
        </View>
      );
};
