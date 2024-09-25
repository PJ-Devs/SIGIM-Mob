import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";

type CategoryCardProps = {
  label: string;
  onRemove: () => void;
  onSelect: () => void;
  isSelected: boolean;
};

export default function CategoryCard({ label, onRemove, onSelect, isSelected }: CategoryCardProps) {
  return (
    <TouchableOpacity style={[styles.card, isSelected && styles.selectedCard]} onPress={onSelect}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 5,
    margin: 5,
    maxWidth: 100,
    minHeight: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#c0c0c0",
  },
  label: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});
