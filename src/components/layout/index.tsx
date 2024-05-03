import { Outlet } from "react-router-dom";
import Header from "./Header";
import Dashboard from "./Dashboard";

export default function Layout() {
  return (
    <div className="w-full flex">
      <div className="w-[15%]">
        <Dashboard />
      </div>
      <div className="w-[85%]">
        <Header />
        <div className="min-h-[100vh] max-h-[100vh]">
          <Outlet />
        </div>
        
      </div>
    </div>
  );
}
