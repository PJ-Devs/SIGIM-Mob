import { Text, View } from "react-native";
import { Link } from "expo-router";
import CustomButton from "./atoms/CustomButton/CustomButton";
import ProductCard from "./molecules/ProductCard/ProductCard";
import Header from "./molecules/Header/Header";
import { useState, useEffect } from "react";
import {fetchProducts} from "../utils/fetch"

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      console.log(fetchedProducts);
      setProducts(fetchedProducts);
      console.log(products);
    };

    loadProducts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        gap: 10,
      }}
    >
      <Header enterpriseName="Mi empresita" />
      
      {products?.map((product) => (
        <ProductCard
          name={product.title}
          price={product.price}
        />
      ))}


      <Text style={{ color: "black" }}>Main</Text>
      <Link href="/login">Login</Link>
      <CustomButton
        title="Primary"
        onPress={() => handlePress()}
        loading={loading}
        type="primary"
      />
      <CustomButton title="Secondary" onPress={() => {}} type="secondary" />
      <CustomButton title="Success" onPress={() => {}} type="success" shape="rounded" />
      <CustomButton title="Warning" onPress={() => {}} type="warning" shape="rounded" />
      <CustomButton title="Error" onPress={() => {}} type="error" shape="rounded" />
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
