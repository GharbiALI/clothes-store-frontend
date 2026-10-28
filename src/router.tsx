import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./component/Login";
import { Home } from "./component/Home";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
