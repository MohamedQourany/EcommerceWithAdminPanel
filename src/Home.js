import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./App.css";
import {
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Skeleton,
  Space,
  Spin,
  Typography,
  message,
} from "antd";
import {
  addItem,
  calculateTotal,
  decrease,
  increaseQ,
  removeFromCart,
} from "./CounterSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import {
  chakra,
  Box,
  Flex,
  HStack,
  Stack,
  Image,
  Divider,
  Card,
  CardHeader,
  CardFooter,
  Text,
  SimpleGrid,
  Container,
  Icon,
  Button,
  VStack,
  Center,
} from "@chakra-ui/react";
import Testimonial from "./Testmonials";
import Rating from "./Rating";
import CarouselSlider from "./Carousel";
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
  const [Hero, setHero] = useState();
  const getHero = async () => {
    const querySnapshot = await getDocs(query(collection(db, "Content")));
    const HeroData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setHero(HeroData);
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
    getHero();
  }, []);
  const addToCart = (product) => {
    dispatch(addItem(product));
    dispatch(calculateTotal());
    message?.success(product?.productName + " is Added to cart");
  };
  const [loading, setLoading] = useState(true);
  return (
    <>
      {!loading ? (
        <Layout>
          <Flex direction={"column"} bg={"white"}>
            <Container maxW={"container.xl"}>
              <Box flexDirection={"row"}>
                <CarouselSlider />
              </Box>
              <Divider bg={"black"} mt={10} />
              <Card
                bg={"gray.100"}
                p={20}
                justify={"center"}
                align={"center"}
                flexDirection={"column"}
                mt={"100px"}
              >
                <Typography.Title level={2}>Brands</Typography.Title>
                <Flex flexDirection={"row"} wrap="wrap">
                  <Image
                    maxW={"sm"}
                    src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
                  />
                  <Image
                    maxW={"sm"}
                    src="https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo-2005-present.jpg"
                  />
                </Flex>
              </Card>
            </Container>
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
          </Flex>
          <Testimonial />
          <Rating />
        </Layout>
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
    </>
  );
};

export default Home;
