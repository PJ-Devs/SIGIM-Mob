import { Text, View } from "react-native";
import { Link } from "expo-router";
import CustomButton from "./atoms/CustomButton/CustomButton";
import ProductCard from "./molecules/ProductCard/ProductCard";
import Header from "./molecules/Header/Header";
import { useState } from "react";

export default function Main() {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      gap: 10,
    }}>
      <Header enterpriseName="Mi empresita" />
      <ProductCard
        name="Producto 1"
        price={100}
      />
      <Text style={{ color: "black" }}>Main</Text>
      <Link href="/login">Login</Link>
      <CustomButton
        title="Primary"
        onPress={() => handlePress()}
        loading={loading}
        type="primary"
      />
      <CustomButton
        title="Secondary"
        onPress={() => {}}
        type="secondary"
      />
      <CustomButton
        title="Success"
        onPress={() => {}}
        type="success"
        shape="rounded"
      />
      <CustomButton
        title="Warning"
        onPress={() => {}}
        type="warning"
        shape="rounded"
      />
      <CustomButton
        title="Error"
        onPress={() => {}}
        type="error"
        shape="rounded"
      />
      <CustomButton
        icon="home"
        iconSize={20}
        iconColor="#A0A0A0"
        onPress={() => {}}
        type="icon"
      />
    </View>
  );
}