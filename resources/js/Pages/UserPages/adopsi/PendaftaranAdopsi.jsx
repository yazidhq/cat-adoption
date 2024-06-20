import SectionPage from "@/Layouts/UserLayouts/SectionPage";

export default function PendaftaranAdopsi({ auth }) {
  return (
    <SectionPage title={"Pendaftaran Adopsi"} auth={auth}>
      <div className="bg-light pt-5">
        <div className="container py-5">Pendaftaran Adopsi</div>
      </div>
    </SectionPage>
  );
}
