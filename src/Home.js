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
  useColorModeValue,
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
    <Layout>
      {!loading ? (
        <Content>
          <Box pb={8}>
            <Stack
              pos="relative"
              bgGradient={`linear(to-l, blue.800, blue.600 , cyan.600)`}
              height="250px"
              w="100%"
            ></Stack>
            <Box
              p={4}
              isolation="isolate"
              zIndex={3}
              mt="-10rem"
              marginInline="auto"
            >
              <Box p={{ base: 4, sm: 8 }} overflow="hidden" rounded="2xl">
                <Stack
                  pos="relative"
                  zIndex={1}
                  direction="column"
                  spacing={5}
                  textAlign="left"
                  bg={"white"}
                  padding={20}
                  borderRadius={"3xl"}
                >
                  <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
                    Explore Ecommerce
                  </chakra.h1>
                  <chakra.h1 color="gray.400" fontSize="xl" lineHeight={1.2}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quos quidem velit voluptatum? Minima fugiat debitis
                    laudantium assumenda eum sunt dolores expedita ad, maxime
                    reprehenderit pariatur, doloremque qui cum, labore officiis.
                  </chakra.h1>

                  <Stack direction={{ base: "column", md: "row" }} spacing={3}>
                    <chakra.button
                      h={10}
                      px={6}
                      color="white"
                      fontSize="md"
                      variant="solid"
                      rounded="md"
                      lineHeight={1}
                      bg="blue.400"
                      _hover={{ bg: "blue.600" }}
                    >
                      View Shop
                    </chakra.button>
                    <Button
                      as={Link}
                      href="#"
                      rounded="md"
                      colorscheme="gray"
                      variant="solid"
                    >
                      FAQ
                    </Button>
                    <Button
                      as={Link}
                      href="#"
                      rounded="md"
                      color="white"
                      variant="solid"
                      colorscheme="purple"
                      _hover={{ bg: "purple.600" }}
                    >
                      Newsletter
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
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
              justify={"space-between"}
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

          <Container p={{ base: 5, md: 10 }}>
            <chakra.h3
              fontSize="4xl"
              fontWeight="bold"
              mb={20}
              textAlign="center"
            >
              Everything you need and more...
            </chakra.h3>
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3 }}
              placeItems="center"
              spacing={10}
              mb={4}
            >
              {features.map((feature, index) => (
                <Box
                  key={index}
                  p={6}
                  rounded="lg"
                  textAlign="center"
                  pos="relative"
                >
                  <Flex
                    p={2}
                    w="max-content"
                    color="white"
                    bgGradient="linear(to-br, #228be6, #15aabf)"
                    rounded="md"
                    marginInline="auto"
                    pos="absolute"
                    left={0}
                    right={0}
                    top="-1.5rem"
                    boxShadow="lg"
                  >
                    {feature.icon}
                  </Flex>
                  <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
                    {feature.heading}
                  </chakra.h3>
                  <Text fontSize="md" mt={4}>
                    {feature.content}
                  </Text>
                  <Link href="#" mt={4} fontSize="sm" color="blue.400">
                    Learn more →
                  </Link>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
          <Container p={{ base: 4, sm: 10 }}>
            <Stack
              direction={{ base: "column", md: "row" }}
              justifyContent="space-between"
            >
              <Stack spacing={4}>
                <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold">
                  Our ultimate goal
                </chakra.h1>
                <Text fontSize="md" color="gray.400">
                  We aim high trying to design the most effective and efficient
                  tool for building UIs, for developers and designers. ChakraUI
                  started back in 2019, to unify React. Since then, we've become
                  a community of over 2M developers from every corner of the
                  world.
                </Text>

                <Stack spacing={2}>
                  <Text fontSize="md" color="gray.400">
                    We plan on doing all that cultivating our values:
                  </Text>
                  {planList.map((data, index) => (
                    <HStack
                      key={index}
                      alignItems="center"
                      spacing={1}
                      fontSize="md"
                    >
                      <Icon
                        as={AiFillCheckCircle}
                        w={4}
                        h={4}
                        color="blue.400"
                      />
                      <Text fontSize="md">{data}</Text>
                    </HStack>
                  ))}
                </Stack>
              </Stack>
              <Stack>
                <SimpleGrid
                  columns={2}
                  spacing={5}
                  pt={8}
                  pl={{ base: 0, md: 10 }}
                  margin="auto 0"
                >
                  {statData.map((data, index) => (
                    <Stack
                      key={index}
                      pl={3}
                      py={1}
                      pr={1}
                      borderLeft="2px solid"
                      borderLeftColor="blue.400"
                      justifyContent="space-between"
                    >
                      <Box fontSize="2xl" fontWeight="bold" color="blue.400">
                        {data.score}
                      </Box>
                      <Text fontSize="md">{data.label}</Text>
                    </Stack>
                  ))}
                </SimpleGrid>
              </Stack>
            </Stack>
          </Container>
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
