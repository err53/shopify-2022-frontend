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
  Link,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useParams, Link as RouterLink } from "react-router-dom";

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

const Home = () => {
  let params = useParams();
  params.page = params.page || 1;
  const [likes, setLikes] = useState(
    JSON.parse(localStorage.getItem("likes")) || {}
  );
  const [modalPhoto, setModalPhoto] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, loading } = useFetch(params.page);
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

  const headingRef = React.useRef(null);
  // scroll to top and set focus after page change
  useEffect(() => {
    if (!process.env.NODE_ENV === "test") {
      window.scrollTo(0, 0);
    }
    headingRef.current.focus();
  }, [params.page]);

  return (
    <Box bg="gray.100">
      <Stack maxW={{ base: "auto", md: "1200px" }} px={5} mx="auto">
        <Heading as="h1" pt={5}>
          <Link as={RouterLink} to="/" ref={headingRef}>
            Spacestagram
          </Link>
        </Heading>

        <Text>Data from the NASA Mars Rover Photos API</Text>
        <SimpleGrid
          minChildWidth="300px"
          spacing="10"
          minHeight="100vh"
          pb="20"
        >
          {loading
            ? [...Array(9)].map((_, i) => <Skeleton key={i} data-testid="skeleton" />)
            : data.photos.map((photo, idx) => (
                <Card
                  key={photo.id}
                  idx={idx}
                  photo={photo}
                  setModalPhoto={setModalPhoto}
                  onOpen={onOpen}
                  likes={likes}
                  toggleLike={toggleLike}
                />
              ))}
        </SimpleGrid>
      </Stack>
      <Navbar page={params.page} loading={loading} data={data} />
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent overflow="hidden" w="auto" m="auto" minH="0!important">
          <ModalCloseButton />
          <ModalHeader>
            <Heading>
              {modalPhoto?.rover?.name} - {modalPhoto?.camera?.full_name}
            </Heading>
          </ModalHeader>
          <ModalBody p={0} pb="10" minH={0}>
            <Image
              src={modalPhoto?.img_src}
              fit="scale-down"
              alt={`${modalPhoto?.rover?.name} - ${modalPhoto?.camera?.full_name}`}
              fallback={<Skeleton minH="300px" height="100%" width="100%" />}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
