import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import CustomButton from '../atoms/CustomButton';

export default function InputFile(): JSX.Element {
    const [image, setImage] = useState<string | null>(null);
    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

  return (
    <View className="bg-white items-center justify-center">
      <CustomButton type='secondary' shape='rounded' icon='file' title="Select an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} className='w-52 h-52' />}
    </View>
  );
}
