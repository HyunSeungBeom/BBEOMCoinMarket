import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "pages/main";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <BuildHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const BuildHeader: React.FC = () => {
  return (
    <div className="w-full top-0 bg-purple-600 text-white p-4">
      <div>
        <h1 className="text-4xl">Coin Market</h1>
      </div>
    </div>
  );
};
