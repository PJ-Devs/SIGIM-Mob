import {View, Text, StyleSheet} from "react-native"
import { Link } from 'expo-router';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login(){

    const insets = useSafeAreaInsets();

    return(
        <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor:'red' }}>
            <Text>This is my app login</Text>
            <Link style={styles.button} href='/'>Go to home</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40
    },
    button:{
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center',
    }
})