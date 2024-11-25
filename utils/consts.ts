import { Dimensions } from "react-native"

const SIZES = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  inputHeight: 40,
}

const STATES = {
  categoriesStatus: [
    { label : "Habilitadas", value: "available" },
    { label : "Deshabilitadas", value: "unavailable" },
  ],
  productsStatus: [
    { label : "Disponibles", value: "available" },
    { label : "No disponibles", value: "unavailable" },
  ],
}


export { SIZES, STATES }
