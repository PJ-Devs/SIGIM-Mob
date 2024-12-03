import { Animated, Pressable, Text, TouchableOpacity, View } from "react-native";
import ProductModal from "./ProductModal";
import { useRef, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Icon from "@expo/vector-icons/AntDesign";
import CustomButton from "../atoms/CustomButton";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


interface InvoiceCardProps {
    payment_method: string;
    total: number;
    date: string;
}


export default function InvoiceCard({ payment_method, total, date }: InvoiceCardProps): JSX.Element {

    const [showDeleteInvoice, setShowDeleteInvoice] = useState<boolean>(false);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleDeleteInvoice = () => {
        Animated.timing(slideAnim, {
            toValue: showDeleteInvoice ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            setShowDeleteInvoice(!showDeleteInvoice
            );
        });
    }

    return (
        <TouchableOpacity
            onPress={toggleDeleteInvoice}
            className="flex-row bg-white w-full px-4 shadow-sm items-center"
            style={{ gap: 20, height: 100 }}
        >
            <FontAwesome5 name="file-invoice" size={24} color="black" />
            <View className="flex w-full px-4">
                <Text>{`MÉTODO DE PAGO: ${payment_method.toUpperCase()}`}</Text>
                <Text>{`TOTAL: $${total}`}</Text>
                <Text>{`FECHA: ${date}`}</Text>
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
                    width: "110%",
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
                    className="flex-row justify-center items-center bg-red-600 text-white rounded-full p-3"
                >
                    <MaterialIcons name="delete" size={24} color="white" />
                </Pressable>
            </Animated.View>

            <ProductModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                children={
                    <View>
                        <Text
                            className="text-[#39cdcd] font-bold mb-8 mt-8 text-xl self-center justify-center">
                            ¿Está seguro de eliminar la factura?
                        </Text>
                        <View className="flex flex-row items-center justify-center" style={{ gap: 20 }}>
                            <CustomButton
                                type="error"
                                title="Si, eliminar"
                                onPress={() => { }}
                            />
                            <CustomButton
                                type="success"
                                title="No eliminar"
                                onPress={() => { }}
                            />
                        </View>
                    </View>
                }
            />
        </TouchableOpacity>
    )
}