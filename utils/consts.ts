import { Dimensions } from "react-native";

const SIZES = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  inputHeight: 40,
};

const STATES = {
  categoriesStatus: [
    { label: "Habilitadas", value: "available" },
    { label: "Deshabilitadas", value: "unavailable" },
  ],
  productsStatus: [
    { label: "Habilitados", value: "available" },
    { label: "Disponibilidad baja", value: "low_stock" },
    { label: "Agotados", value: "out_of_stock" },
    { label: "Deshabilitados", value: "unavailable" },
  ],
  stockActions: [
    { label: "Añadir stock", value: "add" },
    { label: "Disminuir stock", value: "decrease" },
  ],
};

export { SIZES, STATES };
