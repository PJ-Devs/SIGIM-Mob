import { Animated, Pressable, Text, TouchableOpacity, View } from "react-native";
import ProductModal from "./ProductModal";
import { useRef, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Icon from "@expo/vector-icons/AntDesign";
import CustomButton from "../atoms/CustomButton";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


interface InvoiceCardProps {
    payment_method?: string;
    total: number;
    date: string;
}

export default function InvoiceCard({ payment_method, total, date }: InvoiceCardProps): JSX.Element {

    const [showDeleteInvoice, setShowDeleteInvoice] = useState<boolean>(false);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [showModal, setShowModal] = useState<boolean>(false);


    return (
        <TouchableOpacity
            onPress={()=>{}}
            className="flex-row bg-white w-full px-4 shadow-sm items-center"
            style={{ gap: 20, height: 100 }}
        >
            <FontAwesome5 name="file-invoice" size={24} color="black" />
            <View className="flex w-full px-4">
                <Text>{`MÉTODO DE PAGO: ${ payment_method ?? "cash"}`}</Text>
                <Text>{`TOTAL: $${total}`}</Text>
                <Text>{`FECHA: ${date}`}</Text>
            </View>
        </TouchableOpacity>
    )
}