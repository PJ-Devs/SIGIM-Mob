import { Image, Pressable, Text, View } from "react-native";
import Layout from "../../orgnisms/Layout/Layout";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import { useState } from "react";
import { router } from "expo-router";

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
      <CustomButton
        type="icon"
        icon="arrow-left"
        onPress={() => {
          router.push("/");
        }}
        style={{
          position: "absolute",
          padding: 10,
          borderWidth: 1,
          borderRadius: 100,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.4,
          top: 30,
          zIndex: 1,
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 35,
          }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              backgroundColor: "gray",
              borderRadius: 100,
            }}
          />
        </View>
        <Text
          style={{
            width: "100%",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Iniciar sesión
        </Text>
        <View
          style={{
            width: "100%",
            paddingVertical: 20,
            gap: 15,
          }}
        >
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
          <Text
            style={{
              color: "black",
              textAlign: "center",
              marginTop: 5,
              opacity: 0.75,
            }}
          >
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

        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            marginTop: 50,
            marginBottom: 20,
            opacity: 0.65,
          }}
        />

        <CustomButton
          type="secondary"
          title="Acceder como empleado"
          loading={loading}
          onPress={handleLogin}
        />
        <Pressable>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              marginTop: 5,
              opacity: 0.75,
            }}
          >
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
