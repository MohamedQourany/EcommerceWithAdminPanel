import React from "react";
import ProductsDashboard from "./Products";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import AdminSider from "./AdminSider";
import { Box } from "@chakra-ui/react";
import Billing from "./billing";
const Admin = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSider />
      <Layout>
        <Box padding={10}>
          <Billing />
        </Box>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/Homepage" element={<ProductsDashboard />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default Admin;
