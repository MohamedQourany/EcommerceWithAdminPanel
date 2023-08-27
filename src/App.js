import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin from "./admin";
import { db } from "./firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import { Layout, Space } from "antd";
import Error from "./Error";
import Navigation from "./navigation";
function App() {
  const User = localStorage.getItem("user");
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {User === "admin@ecommerce.com" ? (
              <Route path="/admin" element={<Admin />} />
            ) : (
              <Route path="/admin" element={<Error />} />
            )}
          </Routes>
        </BrowserRouter>
      </Layout>
    </Space>
  );
}

export default App;
