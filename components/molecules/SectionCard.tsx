import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLinkTo } from '@react-navigation/native';

interface CardProps {
  color: string;
  link: string;
  linkText: string;
}

export default function SectionCard({ color, link, linkText }: CardProps):JSX.Element{
    const linkTo = useLinkTo();

  return (
    <View className="p-5 rounded-lg shadow flex items-center justify-center h-[80%]" style={{ backgroundColor: color }}>
      <Pressable
        onPress={() => linkTo(link)}
        className={( pressed: string ) => (pressed ? 'opacity-60' : 'opacity-100')}
      >
        <Text className="text-white text-lg"> {/* Quitamos el subrayado */}
          {linkText}
        </Text>
      </Pressable>
    </View>
  );
}

