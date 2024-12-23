import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../../UI/ScrollToUp";
import DeviceCheck from "../../Util/DeviceCheck";
import { useEffect } from "react";

export default function RootLayout() {
  
  return (
    <>
      <DeviceCheck>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
      </DeviceCheck>
    </>
  );
}
