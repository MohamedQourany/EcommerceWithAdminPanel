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
import { FaArrowRight } from "react-icons/fa";

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
    >
      <Box
        width={{ lg: "sm" }}
        transform={{ base: "translateY(-50%)", lg: "none" }}
        bg={{
          base: useColorModeValue("red.50", "gray.700"),
          lg: "transparent",
        }}
        mx={{ base: "6", md: "8", lg: "0" }}
        px={{ base: "6", md: "8", lg: "0" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Stack spacing={{ base: "8", lg: "10" }}>
          <Stack spacing={{ base: "2", lg: "4" }}>
            <Heading size="xl" fontWeight="normal">
              One Stop Shop
            </Heading>
          </Stack>
          <HStack spacing="3">
            <Link
              color={useColorModeValue("red.500", "red.300")}
              fontWeight="bold"
              fontSize="lg"
            >
              Discover now
            </Link>
            <Icon
              color={useColorModeValue("red.500", "red.300")}
              as={FaArrowRight}
            />
          </HStack>
        </Stack>
      </Box>
      <Flex flex="1" overflow="hidden">
        <Image
          src="/iPhone-13-Pro-Max.png"
          alt="Lovely Image"
          fallback={<Skeleton />}
          maxH="450px"
          minW="300px"
          objectFit="cover"
          flex="1"
        />
        <Image
          display={{ base: "none", sm: "initial" }}
          src="https://www.att.com/scmsassets/global/devices/phones/apple/apple-iphone-14-pro/defaultimage/deep-purple-hero-zoom.png"
          alt="Lovely Image"
          fallback={<Skeleton />}
          maxH="450px"
          objectFit="cover"
        />
      </Flex>
    </Stack>
  </Box>
);
