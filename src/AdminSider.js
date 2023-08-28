import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";

const AdminSider = () => {
  const menuItems = [
    {
      label: "Products Dashboard",
      path: "/admin/ProductsDashboard",
    },
    {
      label: "Homepage Content",
      path: "/admin/HomepageContent",
    },
  ];

  return (
    <Sider width={256} theme="light">
      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        style={{ height: "100%" }}
      >
        {menuItems.map((item, index) => (
          <Menu.Item key={index}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default AdminSider;
