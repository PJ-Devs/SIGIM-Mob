import { FlatList, Text, View } from "react-native";
import Layout from "../orgnisms/Layout";
import InvoiceCard from "../molecules/InvoiceCard";
import { useEffect, useState } from "react";
import { getInvoices } from "../../lib/api/invoices/api.fetch";
import LottieView from "lottie-react-native";


export default function MySells(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(true);
    const [invoices, setinvoices] = useState<any[]>([]);

    const fetchInvoices = async () => {
        try {
            const fetchedInvoices = await getInvoices();
            setinvoices(fetchedInvoices.data);
            console.log(fetchedInvoices.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch invoices:", error);
        }
    }

    useEffect(() => {
        fetchInvoices();
    }, [])

    return (
        <Layout >
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
            <View className="flex-1">
                <View>
                    <Text className="uppercase text-[#39cdcd] text-lg font-bold text-center mb-4">
                        Mis ventas
                    </Text>
                </View>
                <FlatList
                    data={invoices}
                    contentContainerStyle={{ gap: 30 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className="w-full p-2 border-b border-b-slate-300">
                            <InvoiceCard payment_method={item.payment_method} total={item.total_price} date={item.created_at} />
                        </View>
                    )} />
            </View>
        </Layout>
    );
}
