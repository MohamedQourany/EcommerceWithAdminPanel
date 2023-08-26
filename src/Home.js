import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db, provider } from "./firebase";
import "./App.css";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Layout,
  Modal,
  Row,
  Skeleton,
  Space,
  Spin,
  Typography,
} from "antd";
import {
  addItem,
  calculateTotal,
  decrease,
  increaseQ,
  removeFromCart,
} from "./CounterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import {
  chakra,
  Box,
  Flex,
  HStack,
  Stack,
  Divider,
  Card,
  CardHeader,
  CardFooter,
  Text,
  SimpleGrid,
  Container,
  Icon,
} from "@chakra-ui/react";
import { DottedBox } from "./Icons";
import { Hero } from "./Hero";
const Home = () => {
  const [products, setProducts] = useState();
  const dispatch = useDispatch();
  const getProducts = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "Products"), where("Tag", "==", "Homepage"))
    );
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsData);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  const addToCart = (product) => {
    dispatch(addItem(product));
    dispatch(calculateTotal());
  };
  const features = [
    {
      heading: "Easy Payment",
      content: "Choose from PayPal,Cash On Delivery,Visa.",
      icon: (
        <svg
          width={36}
          height={36}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          ></path>
        </svg>
      ),
    },
    {
      heading: "Invoicing",
      content: "Automatically email customers PDF receipts and invoices.",
      icon: (
        <svg
          width={36}
          height={36}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          ></path>
        </svg>
      ),
    },
    {
      heading: "Cashback Offers",
      content: "Cashback Offers Every Thursday.",
      icon: (
        <svg
          width={36}
          height={36}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
      ),
    },
  ];
  const statData = [
    {
      label: "Weekly downloads",
      score: "3.2M",
    },
    {
      label: "Stars on GitHub",
      score: "77k",
    },
    {
      label: "Contributors",
      score: "2.4k",
    },
    {
      label: "Followers on Twitter",
      score: "17k",
    },
  ];

  const planList = [
    "Customer obsessed. We put our customers front & center.",
    "Transparency. Most of our work is public.",
    "Freedom. We work from anywhere in the world.",
    "Autonomy. We want to create a safe, high-trust team.",
    "Excellence. We are aiming high, and we know it.",
  ];

  const [loading, setLoading] = useState(true);
  return (
    <Layout className="hero">
      {!loading ? (
        <Content>
          <Hero />
          <Divider mt={20} mb={20} />
          <Flex
            direction={"column"}
            alignContent={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
            alignItems={"center"}
          >
            <Typography.Title>Top Selling</Typography.Title>

            <Flex
              justify={"space-evenly"}
              width={"100%"}
              flexWrap={"wrap"}
              flexDirection={"row"}
            >
              {products?.map((product) => (
                <Card key={product?.id} padding={10} width={300} mb={20}>
                  <CardHeader>
                    <Typography.Title level={5}>
                      {product?.productName}
                    </Typography.Title>
                  </CardHeader>
                  <Image src={product?.image} />
                  <CardFooter>
                    <Flex direction={"column"}>
                      <Text noOfLines={3}>{product?.description}</Text>
                      <Text fontWeight={"bold"}>{product?.price} EGP</Text>
                    </Flex>
                  </CardFooter>
                  <Button onClick={() => addToCart(product)}>
                    Add To Cart
                  </Button>
                </Card>
              ))}
            </Flex>
          </Flex>
          <Divider mt={50} mb={50} />
        </Content>
      ) : (
        <Flex
          width={"100%"}
          align={"center"}
          justify={"center"}
          height={"100vh"}
        >
          <Spin />
        </Flex>
      )}
    </Layout>
  );
};

export default Home;
