import {
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useState, useRef } from "react";
import { Product } from "../../types/products";
import LottieView from "lottie-react-native";
import ProductModal from "./ProductModal";
import { set } from "react-hook-form";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { attachToCart } from "../../lib/api/cart/api.fetch";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onPress?: () => void;
  onAddedProduct?: () => void;
}

export default function ProductSellCard({
  product,
  onPress,
  onAddedProduct,
}: ProductCardProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddToCart, setShowAddToCart] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleAddToCart = () => {
    Animated.timing(slideAnim, {
      toValue: showAddToCart ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setShowAddToCart(!showAddToCart);
    });
  };

  const addQuantity = async (data: any) => {
    try {
      if (data.quantity > product.stock) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `No hay suficiente stock para agregar ${data.quantity} unidades de ${product.name}`,
        });
        setShowModal(false);
        return;
      }
      else if (data.quantity <= 0) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `La cantidad a agregar debe ser mayor a 0`,
        });
        setShowModal(false);
        return;
      }



      if (product.id) {
        setShowModal(false);
        await attachToCart(product.id, data.quantity).then((response) => {
          console.log(response);
        });
        onAddedProduct && onAddedProduct();
      }

      toggleAddToCart();
      Toast.show({
        type: "success",
        text1: "Producto agregado",
        text2: `Se han agregado ${data.quantity} unidades de ${product.name}`,
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Ocurrió un error al agregar el producto al carrito",
      });
    }
    setShowModal(false);
  };

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        onPress={toggleAddToCart}
        className="flex-row bg-white max-w-full gap-x-2 py-2 px-4 rounded-lg shadow-sm"
      >
        {loading && (
          <LottieView
            source={require("../../assets/animations/image-loader.json")}
            autoPlay
            loop
            speed={1.5}
            resizeMode="cover"
            style={{ width: "33%", zIndex: 1 }}
          />
        )}
        <Image
          alt="Product Image"
          resizeMode="contain"
          className="w-1/3 h-30"
          source={{
            uri: `${'https://sigim.icu'}/${product.thumbnail}`,
          }}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
        />

        <View className="w-2/3 pl-2 pr-3">
          <View className="flex-row justify-between items-center gap-x-2 mb-1">
            <Text className="font-semibold shrink grow">{product.name}</Text>
          </View>
          <Text>{`Categoria:`}</Text>
          <Text>{`Marca:`}</Text>
          <Text>{`Cantidad: ${product.stock}`}</Text>
          <Text className="font-semibold text-green-600 text-right mt-2">{`$${product.sale_price}`}</Text>
        </View>
      </TouchableOpacity>

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
            setShowModal(true);
          }}
          className="flex-row justify-center items-center bg-green-600 text-white rounded-full p-3"
        >
          <Icon name="shoppingcart" size={22} color="white" />
        </Pressable>
        <Pressable
          onPress={toggleAddToCart}
          className="flex-row justify-center items-center bg-red-600 text-white rounded-full p-3"
        >
          <Icon name="close" size={22} color="white" />
        </Pressable>
      </Animated.View>

      <ProductModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        children={
          <View>
            <Text className="font-semibold text-lg mb-8 uppercase">
              {product.name}
            </Text>
            <View className="flex" style={{gap:10}}>
              <CustomInput
                type="numeric"
                placeholder="Cantidad"
                control={control}
                errors={errors}
                propertyName="quantity"
              />
              <CustomButton
                type="success"
                title="Agregar al carrito"
                onPress={handleSubmit(addQuantity)}
              />
            </View>
          </View>
        }
      />
    </View>
  );
}
