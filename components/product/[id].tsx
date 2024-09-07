import {Text} from 'react-native'
import {useLocalSearchParams} from 'expo-router'

export default function id(): JSX.Element {
    const {id} = useLocalSearchParams();
    return(
    <>
        <Text>{id}</Text>
    </> 
    );
}