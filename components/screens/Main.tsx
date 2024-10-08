import { View } from "react-native";
import Layout from "../orgnisms/Layout";
import Sections from "../orgnisms/Sections";
import { useAuth } from "../../contexts/AuthContext";
import Login from "./Login";


export default function Main() {
  const { authState } = useAuth(); 
  return (
    <>
      {authState ? (
          <Sections /> 
        ) : (
          <Login/> 
        )}
    </>
  );
}