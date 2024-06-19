import TextInput from "@/Components/TextInput";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";

export default function Home({ auth }) {
  return (
    <SectionPage title={"Adopsi"} auth={auth}>
      <div className="pt-5">
        <div className="bg-orange pb-4">
          <div className="container">
            <div className="d-flex gap-5 pt-5">
              <p>Semua</p>
              <p>Anjing</p>
              <p>Kucing</p>
            </div>
            <form action="">
              <div className="row">
                <div className="col-md-6">
                  <TextInput
                    name="lokasi"
                    className="form-control"
                    placeholder="Cari lokasi"
                  ></TextInput>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4">
                      <select name="kelamin" className="form-control">
                        <option hidden value="">
                          Jenis Kelamin
                        </option>
                        <option value="jantan">Jantan</option>
                        <option value="betina">Betina</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <select name="kelamin" className="form-control">
                        <option hidden value="">
                          Usia
                        </option>
                        <option value="jantan">0 - 11 Bulan</option>
                        <option value="betina">1 - 5 Tahun</option>
                        <option value="betina">6 - 10 Tahun</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <div className="d-grid">
                        <button className="btn btn-blue">Cari Hewan</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SectionPage>
  );
}
