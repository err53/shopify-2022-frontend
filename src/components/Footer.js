import React from "react";
import { Center, HStack, IconButton, Text } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Footer = ({ page, setPage, loading, data }) => {
  return (
    <Center>
      <HStack
        spacing="10"
        position="fixed"
        bottom="5"
        rounded="base"
        bg="whiteAlpha.800"
        backdropFilter="blur(5px)"
        boxShadow="base"
      >
        <IconButton
          icon={<FaArrowLeft />}
          disabled={page <= 1}
          onClick={() => {
            setPage(page - 1);
          }}
          bg="whiteAlpha.0"
        />
        <Text>Page {page}</Text>
        <IconButton
          icon={<FaArrowRight />}
          disabled={!loading && data.photos.length < 25}
          onClick={() => {
            setPage(page + 1);
          }}
          bg="whiteAlpha.0"
        />
      </HStack>
    </Center>
  );
};
export default Footer;
