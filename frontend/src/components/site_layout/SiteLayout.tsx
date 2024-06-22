import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./index.css";

interface SiteLayoutProps {}

const SiteLayout: FunctionComponent<SiteLayoutProps> = () => {
  return (
    <div className="layout">
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default SiteLayout;
