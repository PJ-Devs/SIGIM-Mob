import BackButton from "../../../components/atoms/BackButton";
import UpdateProfileForm from "../../../components/molecules/UpdateProfileForm";
import Layout from "../../../components/orgnisms/Layout";

export default function () {
  return (
    <Layout leftButton={
      <BackButton />
    }>
      <UpdateProfileForm />
    </Layout>
  );
}
