import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import Main from './components/screens/Main';
import { authInterceptor, errorInterceptor } from './lib/axios/axios.interceptors'

authInterceptor();
errorInterceptor();

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <Main />
    </View>
  );
}