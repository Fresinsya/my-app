import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header, CreateContainer, MainContainer } from "./components";
import { AnimatePresence } from "framer-motion";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary mb-8">
        <Header />
        <main className="w-full p-8 mt-10 ">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
