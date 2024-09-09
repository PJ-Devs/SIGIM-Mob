import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        gap: 10,
        alignItems: 'center', 
     //   borderWidth: 1, 
     //   borderColor: '#ccc', 
        borderRadius: 8, 
        padding: 8, 
      },
    input: {
        flex: 1, 
        paddingLeft: 10, 
        height: 40,
        width:10,
        backgroundColor: 'transparent',
        borderBottomWidth:0,
        borderRadius: 8
        
    },
  });
  

export {styles};