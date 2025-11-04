import { Outlet } from "react-router";

import Header from "./Header";
import Footer from "./Footer";

import global from "../styles/globalStyles.module.scss";


function Layout() {
  return (
    <>
      <Header />
      <main className={global.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
