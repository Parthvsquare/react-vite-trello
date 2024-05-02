import { Navigate, Route, Routes } from "react-router-dom";
import { ModeToggle } from "./component/toggle-mode";
import Board from "@/pages/Board";
import HomeLayout from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const AppRouter = () => {
  return (
    <div className="h-screen">
      {/* <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} /> */}
      <header className="dark:bg-gray-800 bg-gray-100 dark:text-white">
        <div className="flex justify-between px-10 py-3 items-center">
          <div className="flex gap-x-3">
            <div className="">
              <div className="">React DnD</div>
            </div>
          </div>
          <ModeToggle />
        </div>
      </header>
      {/* {isLoggedIn && <BreadCrumbs />} */}
      <Routes>
        <Route path="/" element={true ? <HomeLayout /> : <Navigate to="login" />}>
          <Route index element={<Board />} />
        </Route>
        <Route path="/" element={!true ? <Login /> : <Navigate to="/" />}>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Route>
        <Route path="/*" element={true ? <NotFound /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};
export default AppRouter;
