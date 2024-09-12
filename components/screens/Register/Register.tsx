import { Image, Pressable, Text, View } from "react-native";
import Layout from "../../orgnisms/Layout";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import CustomButton from "../../atoms/CustomButton";
import { useState } from "react";
import { router } from "expo-router";
import styles from "./Register.styles";

export default function Regsiter(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Layout includeHeader={false}>
      {router.canGoBack() && (
        <CustomButton
          type="icon"
          icon="arrow-left"
          onPress={() => {
            router.back();
          }}
          style={styles.backButton}
        />
      )}

      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} />
        </View>
        <Text style={styles.formTitle}>Regitrar tu empresa</Text>
        <View
          style={styles.inputsContainer}
        >
          <CustomInput placeholder="Nombre de empresa" type="email-address" width={300} />
          <CustomInput placeholder="NIT" type="email-address" width={300} />
          <CustomInput placeholder="Numero de contacto" type="email-address" width={300} />
          <CustomInput placeholder="E-mail" type="email-address" width={300} />
          <CustomInput placeholder="Password" width={300} />
        </View>
        <CustomButton
          type="primary"
          title="Registrar Empresa"
          loading={loading}
          onPress={handleLogin}
        />
        <Pressable onPress={() => router.navigate('/login')}>
          <Text
            style={styles.anchorContainer}
          >
            Ya tienes una cuenta?{" "}
            <Text
              style={{
                color: "blue",
              }}
            >
              Inicia sesion
            </Text>
          </Text>
        </Pressable>
      </View>
    </Layout>
  );
}
