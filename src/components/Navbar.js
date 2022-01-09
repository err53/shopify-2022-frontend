import React from "react";
import { Center, HStack, IconButton, Text } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "@reach/router";

const Navbar = ({ page, setPage, loading, data }) => {
  return (
    <Center>
      <HStack
        spacing="10"
        position="fixed"
        bottom="5"
        rounded="base"
        bg='#E2E8F0BB'
        backdropFilter="blur(5px)"
        boxShadow="base"
      >
        <IconButton
          size="lg"
          icon={<FaArrowLeft />}
          disabled={page <= 1}
          onClick={() => {
            window.history.replaceState(null, "", page - 1)
            setPage(page - 1);
          }}
          bg="whiteAlpha.0"
        />
        <Text>Page {page}</Text>
        <IconButton
          size="lg"
          icon={<FaArrowRight />}
          disabled={!loading && data.photos.length < 25}
          onClick={() => {
            window.history.replaceState(null, "", page + 1)
            setPage(page + 1);
          }}
          bg="whiteAlpha.0"
        />
      </HStack>
    </Center>
  );
};
export default Navbar;
