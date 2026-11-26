import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./component/Login";
import { Home } from "./component/Home";
import { Clothes } from "./component/clothes/Clothes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
