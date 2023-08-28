import React from "react";
import { Button, Result, Typography } from "antd";
import Functions from "./Functions";
import { useSelector } from "react-redux";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Success = () => {
  const total = useSelector((state) => state.cart.total);
  const orderNumber = Math.random() * 100000;
  return (
    <Result
      status="success"
      title="Successfully Purchased !"
      subTitle={`Order Number : ${orderNumber?.toFixed()}`}
      extra={[
        <Typography.Title level={3} code>
          Total is : {total} EGP
        </Typography.Title>,
        <Link to={"/"}>
          {" "}
          <Button>Shop Again</Button>
        </Link>,
      ]}
    />
  );
};

export default Success;
