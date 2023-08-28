import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import ProductsDashboard from "./Products";
import { Layout, Menu } from "antd";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import AdminSider from "./AdminSider";
const Admin = () => {
  const menuItems = [
    {
      label: "Products Dashboard",
      path: "/admin/ProductsDashboard",
    },
    // Add more menu items as needed
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSider />
      <Layout>
        <Routes>
          <Route
            path="/admin/ProductsDashboard"
            element={<ProductsDashboard />}
          />
          {/* Add more routes for other components */}
        </Routes>
      </Layout>
    </Layout>
  );
};

export default Admin;
