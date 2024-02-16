import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "pages/main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/:sub" element={<SubPage />} /> */}
        {/* <Route path="/:sub/:detail" element={<DetailPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
