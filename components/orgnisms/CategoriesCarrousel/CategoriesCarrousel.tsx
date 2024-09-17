import { View, Text } from "react-native";
import CategoryCard from "../../molecules/CategoryModal/CategoryModal";
import Icon from "@expo/vector-icons/AntDesign";

function CategoriesCarrousel() {
    return (  
      <View>
        <View className="flex-row gap-2 justify-items-center" >
        <Text>Tags</Text>
        <Icon name="tags"></Icon>
        </View>
        
        <View className="flex-row">
            <CategoryCard
        label="seleccionado"
        onRemove={() => {}}
        onSelect={() => {}}
        isSelected={true}
      ></CategoryCard>
       <CategoryCard
        label="sin seleccionar"
        onRemove={() => {}}
        onSelect={() => {}}
        isSelected={false}
      ></CategoryCard>
       <CategoryCard
        label="con mucha infoo"
        onRemove={() => {}}
        onSelect={() => {}}
        isSelected={false}
      ></CategoryCard>
        </View>
      </View>
     
        
    );
}

export default CategoriesCarrousel;