import { View, Text, FlatList, Button } from 'react-native';
import Layout from "../orgnisms/Layout";
import { getCart, concludeSale } from '../../lib/api/cart/api.fetch';
import { useEffect, useState } from 'react';
import CartProductCard from '../molecules/CartProductCard';
import LottieView from 'lottie-react-native';
import ProductModal from '../molecules/ProductModal';
import CustomInput from '../atoms/CustomInput';
import CustomButton from '../atoms/CustomButton';
import { set, useForm } from 'react-hook-form';
import DropdownCart from '../molecules/DropDownCart';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

interface CartItem {
    id: number;
    name: string;
    sale_price: number;
    thumbnail: string;
    pivot: {
        quantity: number;
    }
}

export default function Cart(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [cart, setCart] = useState<CartItem[]>([]);

    const FetchConcludeSale = async (data: any) => {
        try {
            if (data.discount > 1 || data.discount < 0) {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Descuento inválido, ejemplo: 0.1 para 10% de descuento",
                });
                setShowModal(false);
                return;
            }

            if (data.payment_method === "") {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Debe seleccionar un método de pago",
                });
                setShowModal(false);
                return;
            }

            const payment_method = data.payment_method?.toLowerCase();
            await concludeSale(payment_method, data.discount, 1);
            setShowModal(false);
            router.push('/')

            Toast.show({
                type: "success",
                text1: "Venta realizada",
                text2: `Venta registrada con éxito`,
            });

        } catch (error) {
            console.error(error);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Ocurrió un error al registrar la venta",
            });
            setShowModal(false);
        }
    }

    const fetchCart = async () => {
        try {
            const response = await getCart();
            setCart(response.data);
            if (response.data.length > 0) {
                setIsCartEmpty(false);
            }
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleProductRemoved = () => {
        fetchCart();
    }

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        < Layout >
        
            {loading && (
                <LottieView
                    source={require("../../assets/animations/image-loader.json")}
                    autoPlay
                    loop
                    speed={1.5}
                    resizeMode="cover"
                    style={{ justifyContent: 'center', position: 'absolute', width: 100, height: 100, zIndex: 1, alignSelf: 'center', marginTop: '100%' }}
                />
            )
            }
            {
                isCartEmpty && !loading ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-lg font-bold text-center">No tienes ninguna venta activa</Text>
                    </View>
                ) : (
                    <View className="flex-1 mb-10" style={{ width: '100%' }}>
                        <View>
                            <Text
                                className="uppercase text-[#39cdcd] text-lg font-bold text-center mb-4 mt-4">
                                Venta activa
                            </Text>
                        </View>

                        <View className="flex-1" style={{ gap: 30 }}>
                            <FlatList
                                data={cart}
                                contentContainerStyle={{ gap: 30 }}
                                keyExtractor={(item) => item.id.toString()}
                                style={{ marginBottom: 20 }}
                                renderItem={({ item }) => (
                                    <View className=' border-b border-b-slate-300 p-2'>
                                        <CartProductCard
                                            id={item.id}
                                            name={item.name}
                                            sale_price={item.sale_price}
                                            thumbnail={item.thumbnail}
                                            pivot={item.pivot}
                                            onProductRemoved={handleProductRemoved}
                                        />
                                    </View>
                                )}
                                onEndReached={() => setLoading(false)}
                            />
                        </View>

                        <View className="flex-row justify-center items-center gap-4">
                            <Button
                                title="Confirmar venta"
                                onPress={() => { setShowModal(true) }}
                                color="#39cdcd"
                            />
                        </View>

                        <ProductModal
                            visible={showModal}
                            onClose={() => setShowModal(false)}
                            children={
                                <View className="flex flex-col" style={{ height: 320, gap: 10 }}>
                                    <Text className="text-[#39cdcd] font-bold text-2xl self-center mt-10 mb-4">Confirmar la venta</Text>
                                    <DropdownCart data={[
                                        { label: "Cash", value: "1" },
                                        { label: "Debit", value: "2" },
                                        { label: "Credit", value: "3" },
                                        { label: "Transferency", value: "4" },
                                    ]
                                    }
                                        name="Método de pago"
                                        control={control}
                                        propertyName='payment_method'
                                    />
                                    <CustomInput
                                        type="numeric"
                                        placeholder="Descuento"
                                        control={control}
                                        errors={errors}
                                        propertyName="discount"
                                    />
                                    <CustomButton
                                        type="success"
                                        title="Agregar al carrito"
                                        onPress={handleSubmit(FetchConcludeSale)}
                                    />
                                </View>
                            }
                        />
                    </View>
                )
            }
        </Layout >
    );
}