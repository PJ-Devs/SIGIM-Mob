import { useRef, useState } from "react";
import { Image, View, Animated } from "react-native";
import * as ImagePicker from "expo-image-picker";

import CustomButton from "../atoms/CustomButton";
import LottieView from "lottie-react-native";
import { SIZES } from "../../utils/consts";

interface InputFileProps {
  onImageSelected: (image: string) => void;
}

export default function InputFile({
  onImageSelected,
}: InputFileProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  const uploadImage = async (mode: "galery" | "camera") => {
    try {
      let result;
      const baseConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
      } as ImagePicker.ImagePickerOptions;

      if (mode === "galery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          ... baseConfig,
        });
      } else if (mode === "camera") {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          ... baseConfig,
        });
      }

      if (result && !result.canceled) {
        console.log(result.assets[0])
        setImage(result.assets[0].uri);
        onImageSelected(result.assets[0].uri); // Enits the image to the parent component
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  /**
   * Asynchronously removes the currently set image by animating its opacity to 0
   * over a duration of 300 milliseconds. Once the animation completes, the image
   * is set to null.
   */
  const removeImage = async () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setImage(null);
    });
  };

  return (
    <View style={{ gap: 10 }}>
      <CustomButton
        type="secondary"
        shape="rounded"
        icon="image"
        iconSize={24}
        title="Seleccionar imagen"
        onPress={() => uploadImage("galery")}
      />
      <CustomButton
        title="Tomar foto"
        type="secondary"
        icon="camera"
        iconSize={20}
        onPress={() => uploadImage("camera")}
      />
      {image && (
        <Animated.View style={{ opacity }}>
          {loading && (
            <LottieView
              source={require("../../assets/animations/image-loader.json")}
              autoPlay
              loop
              speed={1.5}
              resizeMode="cover"
              style={{ width: SIZES.width * 0.25, height: SIZES.width * 0.25 }}
            />
          )}
          <Image
            source={{ uri: image }}
            className="w-56 h-48 rounded-md shadow-md shadow-gray-400 mx-auto"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
          <CustomButton
            type="icon"
            icon="trash"
            iconColor="red"
            iconSize={24}
            onPress={() => removeImage()}
            style="absolute top-0 right-0 bg-gray-50 p-2 border-[1px] border-solid border-black rounded-lg shadow-sm"
          />
        </Animated.View>
      )}
    </View>
  );
}
