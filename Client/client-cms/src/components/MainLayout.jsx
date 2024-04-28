import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
}
