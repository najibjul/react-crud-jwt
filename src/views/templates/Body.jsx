import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Body = ({ children }) => {
  return (
    <>
    <Header />
    <Sidebar />
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid pt-3">{children}</div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Body;
