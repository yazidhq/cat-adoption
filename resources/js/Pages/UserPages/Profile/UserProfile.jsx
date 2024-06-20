import Heading from "@/Components/Heading";
import CircleImg from "@/Components/UserComponents/CircleImg";
import Profile from "@/Layouts/UserLayouts/Profile";

export default function UserProfile({ auth }) {
  return (
    <Profile auth={auth} title={"Profile"}>
      <div className="px-4">
        <Heading size={"fs-6"}>Profile Saya</Heading>
        <div className="d-flex gap-4 p-4 mt-4 border rounded-4">
          <CircleImg img={`/core-img/default-profile.jpg`} width={"80px"} />
          <div className="d-flex flex-column justify-content-center">
            <Heading size={"fs-4"}>
              {auth.user.nama_depan.toUpperCase()}
            </Heading>
            <p>{auth.user.bio}</p>
          </div>
        </div>
      </div>
    </Profile>
  );
}
