import { Flex } from "@chakra-ui/react";
import { Button, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      height={"100vh"}
    >
      <Typography.Title>Not Found</Typography.Title>
      <Button>
        <Link to={"/"}>Go Back To Homepage</Link>
      </Button>
    </Flex>
  );
};

export default Error;
