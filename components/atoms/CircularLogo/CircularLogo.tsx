import {View, Image, ImageSourcePropType } from 'react-native';
import {styles} from './CircularLogo.styles';

type CircularLogoProps = {
  img: ImageSourcePropType; 
  alt: string;
};

export default function CircularLogo({ img, alt }: CircularLogoProps) {

  return (
    <View>
      <Image 
        source={img}
        style={styles.logo} 
      />
    </View>
  );
}