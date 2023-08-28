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
import ProductsDashboard from "./Products";
import Footer from "./Footer";
import Shop from "./Shop";
import CheckoutForm from "./Checkout";
import Success from "./Success";
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
              <>
                <Route path="/admin" element={<Admin />} />
                <Route
                  path="/admin/ProductsDashboard"
                  element={<ProductsDashboard />}
                />
              </>
            ) : (
              <Route path="/admin" element={<Error />} />
            )}
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Checkout" element={<CheckoutForm />} />
            <Route path="/Success" element={<Success />} />
          </Routes>
        </BrowserRouter>
      </Layout>
      <Footer />
    </Space>
  );
}

export default App;
