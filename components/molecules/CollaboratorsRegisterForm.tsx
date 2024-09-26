import { View, Text } from "react-native";
import { Link } from "expo-router";
import Layout from "../orgnisms/Layout";
import CustomInput from "../atoms/CustomInput";
import DropDown from "../molecules/DropDown";
import CustomButton from "../atoms/CustomButton";
import CircularLogo from "../atoms/CircularLogo";

type Collaborator = {
  name: string;
  role: string;
};

type RegisterCollaboratorsFormProps = {
  collaborators?: Collaborator[];
};

function RegisterCollaboratorsForm({
  collaborators,
}: RegisterCollaboratorsFormProps): JSX.Element {
  return (
    <View className="flex p-10" style={{ gap: 20 }}> 
      <View className="justify-center items-center mb-4">
        <CircularLogo
          img={require("../../assets/atom.png")}
          alt="enterprise-image"
        />
      </View>
      <View style={{ gap: 5 }}>
        <Text>Add a new Member</Text>
        <CustomInput placeholder="Name" />
      </View>
      <View style={{ gap: 5 }}>
        <Text>We will send an email with the password for this user</Text>
        <CustomInput placeholder="E-mail" />
      </View>
      <View style={{ gap: 5 }}>
        <Text>Select the member role</Text>
        <DropDown
          data={[
            { label: "Admin", value: "1" },
            { label: "Seller", value: "1" },
            { label: "Viewer", value: "1" },
          ]}
        />
      </View>
      <View>
        <Text className="mt-8">
          This role can execute some actions into the app, for example....
        </Text>
        <CustomButton
          type="secondary"
          icon="user-tie"
          title="Add Member"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

export default RegisterCollaboratorsForm;
