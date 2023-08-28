import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  Card,
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Flex,
  CardHeader,
} from "@chakra-ui/react";
import { Layout, Typography } from "antd";
import { useDispatch } from "react-redux";
import { addItem, calculateTotal } from "./CounterSlice";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsData);
  };
  useEffect(() => {
    getProducts();
  }, []);
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(addItem(product));
    dispatch(calculateTotal());
  };

  return (
    <Layout>
      <Flex
        padding={5}
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
            <Button onClick={() => addToCart(product)}>Add To Cart</Button>
          </Card>
        ))}
      </Flex>
    </Layout>
  );
};

export default Shop;
