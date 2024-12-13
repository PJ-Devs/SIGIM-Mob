import { AxiosResponse } from "axios";
import APIInstance from "../axios/axios.config";
import { getSecuredItem } from "../../utils/secureStore";

export const getProfile = async () => {
  try {
    const response = await APIInstance.get("/profile");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};

export const updateProfile = async (body: any) => {
  return APIInstance.put("/profile", body).then(
    (response: AxiosResponse) => {
      return response.data;
    }
  );
};

export const getEnterprise = async () => {
  try {
    const response = await APIInstance.get("/enterprise", {
      headers: {
        "Authorization": `Bearer ${await getSecuredItem("ACCESS_TOKEN")}`, 
      },
    });
    const enterprise = response.data.data;
    return enterprise;
  } catch(error){
    console.error("Failed to fetch enterprise id:", error); 
    return null;
  }
}

export const deleteEnterprise = async () =>{
  try{
    const enterprise = await getEnterprise()
    const id = enterprise.id
    const response = await APIInstance.delete(`/enterprises/${id}`);
    return response.data.data;
  } catch(error){
   // console.error("Failed to delete enterprise:", error);
    return null;
  }
}

export const getCollaborators = async () => {
  try {
    const response = await APIInstance.get("/enterprise_users");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch collaborators:", error);
    return null;
  }
}

export const addCollaborators = async (body: any) => {
  try{
    const response = await APIInstance.post("/auth/add-collaborators", body);
    return response 
  } catch(error){
    console.error("Failed to add collaborators:", error);
    return null;
  }
  
}
