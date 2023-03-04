import dynamic from "next/dynamic";

const ProfilePage = dynamic(() => import("@/components/pages/Profile"), {
  ssr: false,
});

const Profile = () => {
  return <ProfilePage />;
};

export default Profile;
