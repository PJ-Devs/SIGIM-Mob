import {Text, View} from 'react-native'
import {Link, router} from 'expo-router'
import Layout from '../orgnisms/Layout'
import CircularLogo from '../atoms/CircularLogo';
import CustomInput from '../atoms/CustomInput';
import CustomButton from '../atoms/CustomButton';
import { logout } from '../../lib/auth'

export default function Profile(): JSX.Element{

    const handleLogout = async (data: any) =>{
        try {
            let formattedData = {
                ...data,
                device_name: "valen",
            }
            await logout(formattedData).then(()=>{
                router.push("/login");
            });
        
        } catch (error){
            console.log("Error al cerrar sesión");
            console.log(error);
        }
    }

    return(
        <Layout>
            <View className='flex-row p-2 gap-x-6 justify-center'>
                <CircularLogo img={require("../../assets/atom.png")} alt="profile_img" />
                <View className='flex-col justify-center gap-y-0'>
                    <Text className="font-bold text-xl text-blue-400">Jimmy Giraldo</Text>
                    <Text className=''>Encargado de caja</Text>
                </View>
            </View>
            <View className='flex-col mt-8' style={{gap:15}}>
                <CustomInput placeholder='Name' value='Jimmy' />
                <CustomInput placeholder='Lastname' value='Giraldo' />
                <CustomInput placeholder='E-mail' value='Jimmy@gmail.com' />
                <Text className='text-base ml-2'>Code: 170231</Text>
            </View>
            <View className='flex-row justify-center mt-60'>
                <CustomButton type='error' icon='door-closed' title='Cerrar Sesión' onPress={handleLogout} />
            </View>
        </Layout>
    );
}