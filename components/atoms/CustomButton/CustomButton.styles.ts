import { StyleSheet } from "react-native";
import { colorPalette } from '../../../styles/common.styles';

const defaultStyles = StyleSheet.create({
  baseStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 5,
    shadowColor: colorPalette.dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  loadingAnimation: {
    width: 50,
    height: 50,
    marginHorizontal: -16,
    marginVertical: -16,
  },
  title: {
    textAlign: "center",
    fontFamily: "Arial",
    fontSize: 16,
    fontWeight: "300",
  },
});

const shapeStyles = StyleSheet.create({
  default: {
    borderRadius: 5,
  },
  rounded: {
    borderRadius: 12,
  },
});

const typeStyles = StyleSheet.create({
  default: {
    backgroundColor: colorPalette.primary,
  },
  primary: {
    backgroundColor: colorPalette.primary,
  },
  secondary: {
    backgroundColor: colorPalette.secondary,
    borderWidth: 1,
    borderColor: colorPalette.dark,
  },
  error: {
    backgroundColor: colorPalette.danger,
  },
  warning: {
    backgroundColor: colorPalette.warning,
  },
  success: {
    backgroundColor: colorPalette.success,
  },
  icon: {
    backgroundColor: "transparent",
    borderRadius: 50,
  },
});

export { defaultStyles, shapeStyles, typeStyles };
