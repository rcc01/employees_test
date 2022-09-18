import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../containers/App";
import MenuNavbar from "../components/MenuNavbar";
import NewEmployee from "../components/NewEmployee";

const Router = () => {
  return (
    <BrowserRouter>
      <MenuNavbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/request" element={<NewEmployee />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
