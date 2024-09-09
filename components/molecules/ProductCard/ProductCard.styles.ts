import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  thumbnail: {
    width: "30%",
    borderRadius: 10,
  },
  info: {
    width: "70%",
    paddingLeft: 5,
    paddingRight: 12
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", 
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    flexShrink: 1,
    flexGrow: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    textAlign: "right",
    marginTop: 5,
  }
});

export default styles;