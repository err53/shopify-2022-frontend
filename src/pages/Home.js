import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  SimpleGrid,
  Image,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const useFetch = (page) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${process.env.REACT_APP_NASA_API_KEY}`
      );
      const json = await response.json();
      console.log(json);
      setData(json);
      setLoading(false);
    }
    fetchData();
  }, [page]);

  return { data, loading };
};

const Home = (props) => {
  const [likes, setLikes] = useState(
    JSON.parse(localStorage.getItem("likes")) || {}
  );
  const [page, setPage] = useState(parseInt(props.page) || 1);
  const [modalPhoto, setModalPhoto] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, loading } = useFetch(page);
  // const data = true;
  // const loading = true;

  // update state of likes and save to local storage
  const toggleLike = (id) => {
    setLikes({ ...likes, [id]: !likes[id] });
    console.log(JSON.stringify({ ...likes, [id]: !likes[id] }));
    localStorage.setItem(
      "likes",
      JSON.stringify({ ...likes, [id]: !likes[id] })
    );
  };
  // scroll to top after page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <Box bg="gray.200">
      <Stack maxW={{ base: "auto", md: "1200px" }} px={5} mx="auto">
        <Heading as="h1" pt={5}>
          Spacestagram
        </Heading>
        <Text>Data from the NASA Mars Rover Photos API</Text>
        <SimpleGrid
          minChildWidth="300px"
          spacing="10"
          minHeight="100vh"
          pb="20"
        >
          {loading
            ? [...Array(9)].map((_, i) => <Skeleton key={i} />)
            : data.photos.map((photo) => (
                <Card
                  photo={photo}
                  setModalPhoto={setModalPhoto}
                  onOpen={onOpen}
                  likes={likes}
                  toggleLike={toggleLike}
                />
              ))}
        </SimpleGrid>
      </Stack>
      <Navbar page={page} setPage={setPage} loading={loading} data={data} />
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent overflow="hidden" w="auto" m="auto" minH='0!important' >
          <ModalCloseButton />
          <ModalHeader>
            <Heading>{modalPhoto?.rover?.name} - {modalPhoto?.camera?.full_name}</Heading>
          </ModalHeader>
          <ModalBody p={0} pb="10" minH={0}>
            <Image src={modalPhoto?.img_src}  fit="scale-down"/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
