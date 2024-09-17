import CustomButton from "../atoms/CustomButton";
import Layout from "../orgnisms/Layout";
import { router } from "expo-router";

export default function RegisterOwnerForm(): JSX.Element {
  return (
    <Layout includeHeader={false}>
      {router.canGoBack() && (
        <CustomButton
          type="icon"
          icon="arrow-left"
          onPress={() => {
            router.back();
          }}
          style="absolute p-2.5 rounded-full top-8 left-0 border-[1px] border-solid border-dark z-1 shadow-md"
        />
      )}
    </Layout>
  );
}
