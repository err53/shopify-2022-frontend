import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import {
  Box,
  Center,
  SimpleGrid,
  Spinner,
  Image,
  Text,
  IconButton,
  HStack,
  Stack,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Button,
  Heading,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaHeart, FaRegHeart } from "react-icons/fa";
import Footer from "./components/Footer";
import Card from "./components/Card";

const useFetch = (page) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=0&page=${page}&api_key=${process.env.REACT_APP_NASA_API_KEY}`
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

function App() {
  const [likes, setLikes] = useState(
    JSON.parse(localStorage.getItem("likes")) || {}
  );
  const [page, setPage] = useState(1);
  const [modalImageUrl, setModalImageUrl] = useState(null);
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
      <Heading as="h1" pt={5} px={5}>Spacestagram</Heading>
      <Center p="5">
        <SimpleGrid
          minChildWidth="300px"
          spacing="10"
          minHeight="100vh"
          maxW={{ base: "100%", md: "1000px" }}
          pb="20"
        >
          {loading
            ? [...Array(9)].map((_, i) => <Skeleton key={i} />)
            : data.photos.map((photo) => (
                <Card
                  photo={photo}
                  setModalImageUrl={setModalImageUrl}
                  onOpen={onOpen}
                  likes={likes}
                  toggleLike={toggleLike}
                />
              ))}
        </SimpleGrid>
      </Center>
      <Footer page={page} setPage={setPage} loading={loading} data={data} />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <Image src={modalImageUrl} />
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
