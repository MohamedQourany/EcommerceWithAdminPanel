import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Typography from "antd/es/typography/Typography";
import { FaArrowRight } from "react-icons/fa";
import Carousel from "./Slider";

export const Hero = () => (
  <Box
    maxW="7xl"
    mx="auto"
    px={{ base: "0", lg: "12" }}
    py={{ base: "0", lg: "12" }}
  >
    <Stack
      direction={{ base: "column-reverse", lg: "row" }}
      spacing={{ base: "0", lg: "20" }}
      align={"center"}
    >
      <Box
        width={{ lg: "sm" }}
        transform={{ base: "translateY(-50%)", lg: "none" }}
        bg={{
          base: useColorModeValue("red.50", "gray.700"),
          lg: "transparent",
        }}
        flexWrap={"wrap"}
        mx={{ base: "6", md: "8", lg: "0" }}
        px={{ base: "6", md: "8", lg: "0" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Stack spacing={{ base: "8", lg: "10" }}>
          <Stack spacing={{ base: "2", lg: "4" }}>
            <Heading size="2xl" fontWeight="extrabold">
              One Stop Shop
            </Heading>
          </Stack>
          <Flex flexDirection={"column"} spacing="3">
            <Link
              color={useColorModeValue("red.500", "red.300")}
              fontWeight="bold"
              fontSize="lg"
            >
              <Typography.Title>Discover now</Typography.Title>
            </Link>
            <Typography.Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
              excepturi magni dolore vitae corrupti. Perferendis minima adipisci
              tenetur nesciunt tempora doloribus dolore minus maiores illo. In
              ad repudiandae fugiat molestiae!
            </Typography.Text>
            <Icon
              color={useColorModeValue("red.500", "red.300")}
              as={FaArrowRight}
            />
          </Flex>
        </Stack>
      </Box>
      <Flex flex="1" overflow="hidden">
        <Image
          src="/iPhone-13-Pro-Max.png"
          alt="Lovely Image"
          fallback={<Skeleton />}
          maxH="450px"
          minW="300px"
          objectFit="contain"
          flex="1"
        />
      </Flex>
    </Stack>
  </Box>
);
