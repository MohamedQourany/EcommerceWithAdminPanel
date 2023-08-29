import React from "react";
import { Carousel } from "antd";
import { Flex, Image } from "@chakra-ui/react";
const contentStyle = {
  height: "500px",
  color: "whitre",
  width: "100%",
  lineHeight: "160px",
  textAlign: "center",
  background: "black",
};
const CarouselSlider = () => (
  <Carousel autoplay>
    <div>
      <Image
        alignSelf={"center"}
        style={contentStyle}
        src="https://asset.kompas.com/crops/9fjF5pzqYgZzsOZopAbRlqsEamM=/0x0:3464x2309/750x500/data/photo/2022/09/09/631ae3f796604.jpg"
        objectFit={"contain"}
      />
    </div>
    <div>
      <Image
        alignSelf={"center"}
        style={contentStyle}
        src="https://s3.eu-west-1.amazonaws.com/dist.soreto.com/clientsrc/assets/samsunguk/default/jan23/banner-samsung-blog.jpg"
        objectFit={"contain"}
      />
    </div>
  </Carousel>
);
export default CarouselSlider;
