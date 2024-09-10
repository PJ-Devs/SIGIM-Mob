import { Image, Pressable, Text, View } from "react-native";
import Layout from "../../orgnisms/Layout/Layout";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import { useState } from "react";
import { router } from "expo-router";
import styles from "./Login.styles";

export default function Login(): JSX.Element {
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
        <Text style={styles.formTitle}>Iniciar sesión</Text>
        <View style={styles.inputsContainer}>
          <CustomInput placeholder="E-mail" type="email-address" width={300} />
          <CustomInput placeholder="Password" width={300} />
        </View>
        <CustomButton
          type="primary"
          title="Inciar Sesion"
          loading={loading}
          onPress={handleLogin}
        />
        <Pressable>
          <Text style={styles.anchorContainer}>
            Olvidaste tu contraseña?{" "}
            <Text
              style={{
                color: "blue",
              }}
            >
              Recuperar
            </Text>
          </Text>
        </Pressable>
        <View style={styles.divider} />
        <CustomButton
          type="secondary"
          title="Acceder como empleado"
          onPress={handleLogin}
        />
        <Pressable onPress={() => router.navigate("/signUp")}>
          <Text style={styles.anchorContainer}>
            No tienes una cuenta?{" "}
            <Text
              style={{
                color: "blue",
              }}
            >
              Crea una
            </Text>
          </Text>
        </Pressable>
      </View>
    </Layout>
  );
}
