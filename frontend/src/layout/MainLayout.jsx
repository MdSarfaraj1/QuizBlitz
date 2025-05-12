import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
const Layout = () => (
  <div className="rounded-3xl m-9 mb-0.5"> 
    <Navbar />
    <Outlet />
    <Footer/> 
  </div>
);

export default Layout;
