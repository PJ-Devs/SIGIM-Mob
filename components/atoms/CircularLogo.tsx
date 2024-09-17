import {View, Image, ImageSourcePropType } from 'react-native';
import { circularLogoStyle, circularLogoContainerStyle } from '../../tokens';

type CircularLogoProps = {
  img: ImageSourcePropType; 
  alt: string;
};

export default function CircularLogo({ img, alt }: CircularLogoProps) {

  return (
    <View className={circularLogoContainerStyle} style = {{padding:10}} >
      <Image 
        source={img}
        alt={alt}
        style = {{width:80, height:80}}
        className = {circularLogoStyle}
      />
    </View>
  );
}

