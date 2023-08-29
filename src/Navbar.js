import React, { useEffect, useState } from "react";
import { AppstoreOutlined, ShopOutlined } from "@ant-design/icons";
import "./App.css";
import {
  Affix,
  Button,
  Col,
  Drawer,
  Dropdown,
  Form,
  Image,
  Input,
  Menu,
  Modal,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import ButtonGroup from "antd/es/button/button-group";
import { useSelector } from "react-redux";
import Functions from "./Functions";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "./firebase";
import { Divider, Flex, Stack } from "@chakra-ui/react";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const LoginModalOpen = () => {
    setLoginModalOpen(true);
  };
  const handleLoginClose = () => {
    setLoginModalOpen(false);
  };
  const handleLogout = () => {
    setLoginData("");
    localStorage.clear("user");
    window.location.reload();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState("");
  const SignupWithPw = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setEmail(user.email);
          setLoginData(user.email);
          setPassword(password);
          localStorage.setItem("user", user.email);
          onLogin();
          message.success("Welcome Back");
        })
        .catch((error) => {
          const errorCode = error.code;
          message.error(error);
        });
    } catch (error) {
      console.log(error);
      message.error(error);
    }
    window.location.reload();
  };

  const signInWithPw = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          setEmail(email);
          setPassword(password);
          setLoginData(user.email);
          localStorage.setItem("user", user?.email);
          message.success("Hello " + user.email);
          setLoginModalOpen(false);
        }
      );
    } catch (error) {
      message.error("Email Doesn't Exist" + error);
    }
    window.location.reload();
  };
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      message.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      message.error("Failed to send password reset email: " + error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      message.error("Please provide your registered email.");
      return;
    }

    await sendPasswordReset(email);
  };
  const renderPasswordResetLink = () => {
    return (
      <Button onClick={() => handlePasswordReset()}>Forgot Password</Button>
    );
  };
  const LoggedInUser = localStorage.getItem("user");
  const { removeFromCartHandler, increaseItem, decreaseItem, total } =
    Functions();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // admin@ecommerce.com
  const onLogin = () => {
    if (LoggedInUser === "admin@ecommerce.com") {
      const adminMenu = (
        <>
          <Menu>
            <Menu.Item>
              <Link to={"/admin"}>Admin View</Link>
            </Menu.Item>
            <Menu.Item>
              <Button onClick={handleLogout}>Logout</Button>
            </Menu.Item>
          </Menu>
        </>
      );
      return (
        <Flex align={"center"}>
          <h2>Hello, Admin</h2>
          <Dropdown overlay={adminMenu}>
            <Button>Admin Options</Button>
          </Dropdown>{" "}
        </Flex>
      );
    }
    if (LoggedInUser) {
      return (
        <Flex align={"center"}>
          <h1>Hello, {LoggedInUser}</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </Flex>
      );
    }
    return <Button onClick={LoginModalOpen}>Login</Button>;
  };
  const [searchValue, SetSearchValue] = useState("");
  const items = [
    {
      label: <Link to={"/shop"}>Shop</Link>,
      key: "Shop",
      icon: <ShopOutlined />,
    },
    {
      label: <Link to={"/Faq"}>Faq</Link>,
      key: "Faq",
      icon: <AppstoreOutlined />,
    },

    {
      label: (
        <Button type="primary" onClick={showModal}>
          Cart
        </Button>
      ),
    },
    {
      label: onLogin(),
      key: "login",
    },
  ];
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const [top, setTop] = useState(0);
  const cart = useSelector((state) => state.cart);
  return (
    <Affix style={{ zIndex: 1 }} offsetTop={top}>
      <Flex justify={"space-between"} align={"center"} bg={"white"}>
        <Flex alignItems={"center"} justify={"space-evenly"} width={"100%"}>
          <Link to={"/"}>
            <Typography.Text>Ecommerce</Typography.Text>
          </Link>
          <Button className="drawer-btn" type="link" onClick={toggleDrawer}>
            ☰
          </Button>
          <Drawer
            className="drawer"
            title="Menu"
            placement="right"
            closable={false}
            onClose={toggleDrawer}
            open={isDrawerOpen}
            theme="light"
          >
            <Menu
              mode="vertical"
              theme="light"
              expandIcon={<AppstoreOutlined />}
            >
              {items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
          <Menu
            className="menu"
            mode="horizontal"
            expandIcon={<AppstoreOutlined />}
            disabledOverflow
          >
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Flex>
        <Modal open={loginModalOpen} onOk={handleLoginClose}>
          <Form>
            <Typography.Title level={5}>Login or SignUp</Typography.Title>
            <Form.Item>
              <Input
                style={{ height: "30px", marginBottom: "10px" }}
                placeholder="Type Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input.Password
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={() => handlePasswordReset()}>Forgot </Button>
            </Form.Item>
            <Button type="primary" onClick={SignupWithPw}>
              Signup
            </Button>
            <Button type="default" onClick={signInWithPw}>
              Signin
            </Button>
            {renderPasswordResetLink}
          </Form>
        </Modal>
        <Modal open={isModalOpen} footer onCancel={handleOk}>
          <Typography.Title level={4}>Total is : {total} EGP</Typography.Title>
          <Divider mt={10} mb={10} />
          <Flex direction={"column"} justifyItems={"center"}>
            {cart.cart.map((item) => (
              <Flex
                alignItems={"center"}
                align={"center"}
                justify={"space-between"}
                mb={10}
                key={item.id}
              >
                <Image src={item.image} height={80} alt="" />
                <Row justify={"space-between"}>
                  <Flex mr={"15px"} direction={"column"}>
                    <Typography.Text style={{ color: "black" }}>
                      {item?.productName}
                    </Typography.Text>
                    <Typography.Text>Price: {item.price} USD</Typography.Text>
                  </Flex>
                  <Typography.Text code>Q: {item?.quantity}</Typography.Text>
                </Row>
                <ButtonGroup>
                  <Button onClick={() => increaseItem(item.id)}>+</Button>{" "}
                  <Button onClick={() => decreaseItem(item.id)}>-</Button>
                  <Button onClick={() => removeFromCartHandler(item.id)}>
                    X
                  </Button>
                </ButtonGroup>
              </Flex>
            ))}
          </Flex>
          <Stack spacing={1} flexDirection={"row"}>
            <Link to={"/Checkout"}>
              <Button onClick={handleOk}>Checkout</Button>
            </Link>
            <Button onClick={handleOk}>Continue Shopping</Button>
          </Stack>
        </Modal>
      </Flex>
      <Divider />
    </Affix>
  );
};
export default Navbar;
