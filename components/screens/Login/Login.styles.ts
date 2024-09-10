import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backButton: {
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
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  imgContainer: {
    alignItems: "center",
    marginBottom: 35,
  },
  img: {
    width: 150,
    height: 150,
    backgroundColor: "gray",
    borderRadius: 100,
  },
  formTitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  inputsContainer: {
    width: "100%",
    paddingVertical: 20,
    gap: 15,
  },
  anchorContainer: {
    color: "black",
    textAlign: "center",
    marginTop: 5,
    opacity: 0.75,
  },
  divider: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginTop: 50,
    marginBottom: 20,
    opacity: 0.65,
  }
});

export default styles;
