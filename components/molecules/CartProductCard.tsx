import { Text, View, Image, Animated, TouchableOpacity, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import Icon from '@expo/vector-icons/AntDesign';
import { detachFromCart } from '../../lib/api/cart/api.fetch';
import CustomButton from '../atoms/CustomButton';
import ProductModal from './ProductModal';
import CustomInput from '../atoms/CustomInput';
import { useForm } from 'react-hook-form';

interface CartProductCardProps {
    id: number;
    name: string;
    sale_price: number;
    thumbnail: string;
    pivot: {
        quantity: number;
    }
    onProductRemoved: () => void;
}

export default function CartProductCard({ id, name, sale_price, pivot, thumbnail, onProductRemoved }: CartProductCardProps): JSX.Element {

    const slideAnim = useRef(new Animated.Value(0)).current;
    const [showDetachProduct, setShowDetachProduct] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchDetachCart = async () => {
        try {
            await detachFromCart(id);
            onProductRemoved();
        } catch (error) {
            console.error(error);
        }
    }

    const toggleDetachProduct = () => {
        Animated.timing(slideAnim, {
            toValue: showDetachProduct ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            setShowDetachProduct(!showDetachProduct);
        });
    };

    return (
        < TouchableOpacity
            className="flex-row items-center"
            style={{ flex: 2, width: '100%', height: 100, gap: 20 }}
            onPress={toggleDetachProduct}
        >
            <Image
                alt="Product Image"
                resizeMode='contain'
                style={{ width: '33%', height: '100%' }}
                source={{
                    uri: `${process.env.EXPO_PUBLIC_SERVER_URL}/${thumbnail}`
                }}
            />
            <View>
                <Text className="color-[#39cdcd] font-bold">{name}</Text>
                <Text>Precio: ${sale_price}</Text>
                <Text>Cantidad: {pivot.quantity}</Text>
            </View>

            <Animated.View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    position: "absolute",
                    top: 0,
                    right: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-200, 0],
                    }),
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(57, 205, 205, 0.9)",
                    padding: 10,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 30,
                    opacity: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    }),
                }}
            >
                <Pressable
                    onPress={() => {
                        fetchDetachCart();
                        setShowDetachProduct(true);
                    }}
                    className="flex-row justify-center items-center bg-red-600 text-white rounded-full p-3"
                >
                    <Icon name="shoppingcart" size={22} color="white" />
                </Pressable>
            </Animated.View>

        </TouchableOpacity >


    );
}   
