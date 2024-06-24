import LinkButton from "@/Components/UserComponents/LinkButton";
import EventContent from "@/Layouts/UserLayouts/EventContent";
import Hero from "@/Layouts/UserLayouts/Hero";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";

export default function BlogBerita({ auth }) {
  return (
    <SectionPage title={"Daftar Events"} auth={auth}>
      <div className="pt-5">
        <Hero is_event={true} />
        <EventContent>
          <div className="d-flex justify-content-between p-3 px-5">
            <div>
              <LinkButton className={"text-dark text-decoration-none"}>
                Terbaru
              </LinkButton>
              <LinkButton className={"text-dark text-decoration-none"}>
                Info
              </LinkButton>
              <LinkButton className={"text-dark text-decoration-none"}>
                Events
              </LinkButton>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search"
                className="form-control rounded-5 border-dark"
              />
            </div>
          </div>
        </EventContent>
      </div>
    </SectionPage>
  );
}
