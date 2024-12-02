import {
  View,
  Text,
  FlatList,
} from "react-native";
import CategoryTag from "../molecules/CategoryTag";
import { useEffect, useState } from "react";
import { Category } from "../../types/products";
import { getCategories } from "../../lib/api/api.categories";
import CustomButton from "../atoms/CustomButton";
import { router } from "expo-router";

function CategoriesCarrousel() {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const handleSelectCategory = (id: number) => {
    setSelectedCategory(id);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryTag
      label={item.name}
      key={item.id}
      onSelect={() => handleSelectCategory(item.id)}
      onRemove={() => handleSelectCategory(0)}
      isSelected={selectedCategory === item.id}
    />
  );

  return (
    <View className="w-full">
      {loading ? (
        <Text className="text-lg font-medium">Loading...</Text>
      ) : (
        <View className="w-full">
          {categories.length > 0 ? (
            <FlatList
              data={categories}
              renderItem={renderCategory}
              ListFooterComponent={() => (
                <CustomButton
                  onPress={() => router.push("/categories")}
                  title="Agregar categoria"
                  type="secondary"
                  icon="plus"
                  iconSize={16}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{ gap: 8, paddingVertical: 12 }}
            />
          ) : (
            <View
              className="flex justify-center items-center py-2"
              style={{ gap: 5 }}
            >
              <Text className="font-semibold text-base text-center">
                Uhm, parece que no tienes categorías 🥲
              </Text>
              <CustomButton
                type="secondary"
                title="Agregar una categoría"
                icon="plus"
                iconSize={20}
                onPress={() => router.push("/categories")}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default CategoriesCarrousel;
