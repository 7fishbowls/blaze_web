import React from "react";
import Home from "./components/Home";
import Logo from "./components/Logo";
import Create from "./components/Create";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import BrowseStories from "./components/BrowseStories";

function App() {
  return (
    <>
      <Logo />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/browse" element={<BrowseStories />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
