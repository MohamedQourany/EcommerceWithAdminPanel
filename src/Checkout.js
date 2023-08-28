import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  Input,
} from "@chakra-ui/react";
import { Divider, Form, Space, Table, Typography } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQ } from "./CounterSlice";
import Functions from "./Functions";
import { Link } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const { removeFromCartHandler, increaseItem, decreaseItem, total } =
    Functions();
  const cart = useSelector((state) => state.cart);

  const [cc, setCC] = useState();
  const [ccName, setCCname] = useState();
  return (
    <Stack border={"2px"} borderColor={"whiteAlpha.100"} bg={"whatsapp.100"}>
      <Stack pt={10} align={"center"} bg={"white"}>
        <Text fontSize={"4xl"} alignSelf={"center"}>
          Checkout Page
        </Text>
        <Flex
          flexDirection="row"
          wrap={"wrap"}
          justifyContent="space-evenly"
          width="100%"
        >
          {" "}
          <Stack wrap={"wrap"} spacing={20} width="calc(50% - 10px)">
            {" "}
            <Flex flexDirection={"column"}>
              {cart.cart.map((cartItem) => (
                <Flex align={"center"} mb={3}>
                  <Card
                    align={"center"}
                    justify={"space-between"}
                    p={5}
                    border={"1px"}
                    borderColor={"ButtonShadow"}
                    w={"lg"}
                    maxW={"lg"}
                    flexDirection={"row"}
                  >
                    <Flex flexDirection={"column"}>
                      <Image src={cartItem?.image} width={150} />
                      <Text fontSize={"xl"} justifySelf={"start"}>
                        {cartItem?.productName}
                      </Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                      <Typography.Title level={3}>
                        {cartItem?.price} EGP
                      </Typography.Title>
                      <Typography.Text>
                        Quantity :{" "}
                        <Typography.Text>{cartItem?.quantity}</Typography.Text>
                      </Typography.Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                      <Button mb={2} onClick={() => increaseItem(cartItem.id)}>
                        +
                      </Button>
                      <Button onClick={() => decreaseItem(cartItem.id)}>
                        -
                      </Button>
                    </Flex>
                  </Card>
                </Flex>
              ))}
            </Flex>
          </Stack>
          <Stack w={"lg"} maxW={"md"} mb={10}>
            <Card
              p={8}
              align={"center"}
              border={"1px"}
              borderColor={"ButtonShadow"}
            >
              <Typography.Title level={3}>
                Total is : {total} EGP
              </Typography.Title>
              <Box position={"relative"}>
                <Image
                  src="https://signetlondon.com/cdn/shop/products/Signet-Black_c8307df4-8703-4c46-a4d9-66851f636826_1024x.png?v=1662560505"
                  w={"sm"}
                />
                <Text
                  position={"absolute"}
                  bottom={10}
                  left={6}
                  color={"white"}
                  fontSize={"xl"}
                  letterSpacing={10}
                >
                  {cc}
                </Text>
                <Text
                  position={"absolute"}
                  top={5}
                  left={20}
                  color={"white"}
                  fontSize={"3xl"}
                  fontWeight={"extrabold"}
                  letterSpacing={10}
                >
                  Your Bank
                </Text>
                <Text
                  position={"absolute"}
                  bottom={2}
                  left={6}
                  color={"white"}
                  fontSize={"xl"}
                  letterSpacing={5}
                >
                  {ccName}
                </Text>
              </Box>
              <Text mt={5} mb={5}>
                Fill Your Credit Card Details
              </Text>
              <Flex flexDirection={"column"} w={"xs"}>
                <Input
                  onChange={(e) => setCCname(e.target.value)}
                  placeholder="Card Holder Name"
                  mt={2}
                />
                <Input
                  placeholder="Card Number"
                  onChange={(e) => setCC(e.target.value)}
                  maxLength={16}
                  mt={2}
                />
                <Flex flexDirection={"row"} mt={2} align={"center"}>
                  {" "}
                  <Input placeholder="CVV" width={"sm"} maxLength={3} />
                  <Input type="date" ml={2} />
                </Flex>
              </Flex>
              <Link to={"/Success"}>
                <Button mt={5} alignSelf={"center"}>
                  Checkout
                </Button>
              </Link>
            </Card>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Checkout;
