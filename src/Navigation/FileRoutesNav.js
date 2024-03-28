import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import PaySuccessPage from "../Pages/PaySuccessPage";

function FileRoutesNav() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path="/success" element={<PaySuccessPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default FileRoutesNav;
