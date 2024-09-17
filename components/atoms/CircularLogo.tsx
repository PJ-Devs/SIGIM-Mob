import {View, Image, ImageSourcePropType } from 'react-native';
import { circularLogoStyle, circularLogoContainerStyle } from '../../tokens';

type CircularLogoProps = {
  img: ImageSourcePropType; 
  alt: string;
};

export default function CircularLogo({ img, alt }: CircularLogoProps) {

  return (
    <View className={circularLogoContainerStyle} style = {{padding:10, maxWidth:60}} >
      <Image 
        source={img}
        alt={alt}
        className = {circularLogoStyle}
      />
    </View>
  );
}

