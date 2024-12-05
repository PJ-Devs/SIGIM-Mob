import { View } from "react-native";
import SectionCard from "../molecules/SectionCard";
import { ScrollView } from "react-native";
import Layout from "../orgnisms/Layout";
import ProfileButton from "../atoms/ProfileButton";
import { useEffect, useState } from "react";
import { User } from "../../types/products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../molecules/Loading";
import FloatingMenu from "../molecules/FloatingMenu";
import { SIZES } from "../../utils/consts";

export default function Main() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);

  AsyncStorage.setItem("isSigningIn", "false");

  const fetchProfile = async () => {
    try {
      const profileData = await AsyncStorage.getItem("profile");
      if (profileData) setUserData(JSON.parse(profileData));
    } catch (error) {
      console.error("Failed to retrieve enterprise data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Layout rightButton={<ProfileButton />}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View
            className="items-center py-4"
            style={{
              gap: 15,
              height: SIZES.height * 0.9,
            }}
          >
            {userData!.role.id >= 3 && (
              <SectionCard link="/productList" linkText="Inventario" />
            )}
            <SectionCard link="/suppliers" linkText="Proveedores" />
            <SectionCard link="/employees" linkText="Empleados" />
            <FloatingMenu />
          </View>
        </ScrollView>
      )}
    </Layout>
  );
}
