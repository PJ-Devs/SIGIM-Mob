import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import Layout from "../orgnisms/Layout";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Category, Product } from "../../types/products";
import { getSingleProduct, updateProduct } from "../../lib/api/api.products";
import Loading from "../molecules/Loading";
import ProductInformation from "../molecules/ProductInformation";
import FixedMessage from "../atoms/FixedMessage";
import CustomButton from "../atoms/CustomButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SIZES } from "../../utils/consts";
import { showNotification } from "../../lib/toast/toastify";
import UpdateProductForm from "../orgnisms/UpdateProductForm";
import { getCategories } from "../../lib/api/api.categories";
import CustomModal from "../molecules/CustomModal";
import VerifyModal from "../molecules/VerifyModal";
import UpdateStockForm from "../molecules/UpdateStockForm";
import BackButton from "../atoms/BackButton";
import ProfileButton from "../atoms/ProfileButton";

export default function SingleProduct(): JSX.Element {
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [updateSectionPosition, setUpdateSectionPosition] = useState(0);
  const [modalState, setModalSate] = useState({
    changeStock: false,
    disableProduct: false,
    enableProduct: false,
    deleteProduct: false,
  });

  const scrollRef = useRef<ScrollView>(null);

  const handleFavorite = async () => {
    try {
      setLoading(true);
      await updateProduct(product!.id.toString(), {
        is_favorite: !isFav,
      }).then((response) => {
        if (response) {
          setIsFav(!isFav);
          showNotification(
            "success",
            `Producto ${isFav ? "eliminado de" : "agregado a"} favoritos`
          );
          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      showNotification("error", "No se pudo actualizar el estado del producto");
      setLoading(false);
    }
  };

  const updateProductStatus = async (newStatus: string) => {
    try {
      setLoading(true);
      await updateProduct(product!.id.toString(), { status: newStatus }).then(
        (response) => {
          if (response) {
            setProduct(response);
            setLoading(false);
            showNotification("success", "Producto actualizado correctamente");
            router.back();
          }
        }
      );
    } catch (error) {
      showNotification("error", "No se pudo actualizar el producto");
    }
  };

  const loadCategories = async () => {
    try {
      setLoading(true);
      await getCategories()
        .then((response) => {
          setCategories(response);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      await getSingleProduct(id as string)
        .then((response) => {
          setProduct(response);
          setIsFav(response.is_favorite);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    loadCategories();
  }, [id]);

  return (
    <Layout leftButton={<BackButton />} rightButton={<ProfileButton />}>
      {loading && !product ? (
        <Loading />
      ) : (
        <View className="w-full h-screen flex-1 items-center">
          {loading && product && <Loading />}
          {product!.stock < product!.minimal_safe_stock &&
            product!.stock > 0 && (
              <FixedMessage
                title="Stock bajo"
                message={`${product?.name} tiene pocas existencias.`}
                type="warning"
                position="bottom"
              />
            )}
          {product!.stock === 0 && (
            <FixedMessage
              title="Stock agotado"
              message={`${product?.name} esta agotado.`}
              type="error"
              position="bottom"
            />
          )}
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              flexGrow: 1,
              gap: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Pressable
              className="absolute right-0 top-2 shadow-md p-3"
              onPress={handleFavorite}
            >
              {isFav ? (
                <Icon name="heart" size={24} color="red" solid />
              ) : (
                <Icon name="heart" size={24} color="red" />
              )}
            </Pressable>
            <Pressable
              className="absolute top-2 flex-row items-center h-11 border-[1px] border-solid border-dark rounded-3xl px-4 py-3 z-10"
              style={{ gap: 4 }}
              onPress={() => setModalSate({ ...modalState, changeStock: true })}
            >
              <Icon name="plus" size={14} />
              <Icon name="box" size={18} />
            </Pressable>

            <View
              style={{
                height: SIZES.height * 0.82,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ gap: 15 }}>
                <ProductInformation product={product!} />
                {/* <CustomButton
                  type="secondary"
                  title="Ver registro de ventas"
                  icon="chart-line"
                  iconSize={22}
                  onPress={() => {}}
                  shape="rounded"
                  style="mx-auto px-4 py-2"
                /> */}
              </View>
              <Pressable
                className="flex-row items-center rounded-full border-[1px] border-solid px-3 py-1"
                style={{
                  gap: 5,
                }}
                onPress={() => {
                  scrollRef.current?.scrollTo({
                    y: updateSectionPosition,
                    animated: true,
                  });
                }}
              >
                <Icon name="angle-down" size={22} />
                <Text className="text-base font-semibold">
                  Actualizar Informacion
                </Text>
              </Pressable>
            </View>

            <View
              onLayout={(event) => {
                setUpdateSectionPosition(event.nativeEvent.layout.y);
              }}
            >
              <UpdateProductForm
                product={product!}
                categories={categories}
                emitChanges={(product) => {
                  setProduct(product);
                }}
              />
            </View>

            <View style={{ gap: 10, marginTop: 20 }}>
              <View
                className="flex-row items-center pb-1 border-b-[1px]"
                style={{ gap: 5 }}
              >
                <Icon name="exclamation-triangle" size={22} />
                <Text className="text-base font-semibold">Zona de peligro</Text>
              </View>
              <View style={{ gap: 10 }}>
                {product?.status === "available" && (
                  <CustomButton
                    type="warning"
                    title="Deshabilitar producto"
                    icon="exclamation-triangle"
                    iconSize={22}
                    onPress={() =>
                      setModalSate({ ...modalState, disableProduct: true })
                    }
                  />
                )}
                {product?.status === "unavailable" && (
                  <CustomButton
                    title="Habilitar producto"
                    icon="exclamation-triangle"
                    iconSize={22}
                    onPress={() =>
                      setModalSate({ ...modalState, enableProduct: true })
                    }
                  />
                )}
                <CustomButton
                  type="error"
                  title="Esliminar producto"
                  icon="trash"
                  iconSize={22}
                  iconColor="white"
                  onPress={() =>
                    setModalSate({ ...modalState, deleteProduct: true })
                  }
                />
              </View>
            </View>
          </ScrollView>

          <CustomModal
            title="Actualizar stock"
            visible={modalState.changeStock}
            onClose={() => setModalSate({ ...modalState, changeStock: false })}
          >
            <UpdateStockForm
              product={product as Product}
              emitChanges={(product) => {
                setProduct(product);
                setModalSate({ ...modalState, changeStock: false });
              }}
            />
          </CustomModal>
          <VerifyModal
            title="Habilitar producto"
            message="Esta seguro de que desea habilitar el producto?"
            modalVisible={modalState.enableProduct}
            setVisible={(visible) =>
              setModalSate({ ...modalState, enableProduct: visible })
            }
            action={() => updateProductStatus("available")}
          />
          <VerifyModal
            title="Deshabilitar producto"
            message="Esta seguro de que desea deshabilitar el producto?"
            modalVisible={modalState.disableProduct}
            setVisible={(visible) =>
              setModalSate({ ...modalState, disableProduct: visible })
            }
            action={() => updateProductStatus("unavailable")}
          />
          <VerifyModal
            title="Ekiminar producto"
            message="Esta seguro de que desea eliminar el producto?"
            modalVisible={modalState.deleteProduct}
            setVisible={(visible) =>
              setModalSate({ ...modalState, deleteProduct: visible })
            }
            action={() => updateProductStatus("deleted")}
          />
        </View>
      )}
    </Layout>
  );
}
