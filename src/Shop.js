import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  Card,
  Button,
  CardFooter,
  Text,
  Flex,
  CardHeader,
} from "@chakra-ui/react";
import { Drawer, Layout, Menu, Typography } from "antd";
import { useDispatch } from "react-redux";
import { addItem, calculateTotal } from "./CounterSlice";
import Sider from "antd/es/layout/Sider";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
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
  const { Item } = Menu;
  useEffect(() => {
    if (selectedBrand) {
      const filtered = products.filter(
        (product) => product.brand === selectedBrand
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedBrand, products]);
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(addItem(product));
    dispatch(calculateTotal());
  };
  const [drawer, setDrawer] = useState(false);
  const DrawerOpen = () => {
    setDrawer(!drawer);
  };
  return (
    <Layout>
      <Sider collapsible theme="light">
        <Menu theme="light" selectedKeys={[selectedBrand]}>
          <Menu.ItemGroup title="Filter By Brand">
            <Item key="All" onClick={() => setSelectedBrand("")}>
              All
            </Item>
            <Item key="Apple" onClick={() => setSelectedBrand("Apple")}>
              Apple
            </Item>
            <Item key="Samsung" onClick={() => setSelectedBrand("Samsung")}>
              Samsung
            </Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Flex
        padding={5}
        justify="space-evenly"
        width="100%"
        flexWrap="wrap"
        flexDirection="row"
      >
        {(selectedBrand ? filteredProducts : products).map((product) => (
          <Card key={product.id} padding={10} width={300} mb={20}>
            <CardHeader>
              <Typography.Title level={5}>
                {product.productName}
              </Typography.Title>
            </CardHeader>
            <img src={product.image} alt={product.productName} />
            <CardFooter>
              <Flex direction="column">
                <Text noOfLines={3}>{product.description}</Text>
                <Text fontWeight="bold">{product.price} EGP</Text>
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
