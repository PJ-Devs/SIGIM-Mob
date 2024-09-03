import { Text, TouchableOpacity, StyleSheet } from "react-native";

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
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 5,
    margin: 5,
    minWidth: 20,
    minHeight: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  selectedCard: {
    backgroundColor: "#c0c0c0",
  },
  label: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#ff6961",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: {
    color: "#fff",
    fontSize: 16,
  },
});
