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
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaHeart, FaRegHeart } from "react-icons/fa";

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
  const [likes, setLikes] = useState(JSON.parse(localStorage.getItem("likes")) || {});
  const [page, setPage] = useState(1);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, loading } = useFetch(page);
  // const data = true;
  // const loading = true;

  // update state of likes and save to local storage
  const toggleLike = (id) => {
    setLikes({ ...likes, [id]: !likes[id] });
    console.log(JSON.stringify({ ...likes, [id]: !likes[id] }))
    localStorage.setItem("likes", JSON.stringify({ ...likes, [id]: !likes[id] }));
  };
  // scroll to top after page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <Center p="5" bg="gray.200">
        <SimpleGrid
          minChildWidth="300px"
          spacing="10"
          minHeight="100vh"
          maxW={{ base: "100%", md: "1000px" }}
          pb='20'
        >
          {loading
            ? [...Array(9)].map((_, i) => <Skeleton key={i} />)
            : data.photos.map((photo) => (
                <Stack
                  boxShadow="base"
                  rounded="base"
                  bg="white"
                  key={photo.id}
                  overflow="hidden"
                >
                  <button
                    onClick={() => {
                      setModalImageUrl(photo.img_src);
                      onOpen();
                    }}
                  >
                    <Image
                      src={photo.img_src}
                      width="100%"
                      loading="lazy"
                      // onDoubleClick={() => {
                      //   setLikes({
                      //     ...likes,
                      //     [idx]: true,
                      //   });
                      // }}
                    />
                  </button>
                  <Box p="6">
                    <Text>{photo.earth_date}</Text>
                    <Text>
                      Taken by {photo.rover.name} using the{" "}
                      {photo.camera.full_name}
                    </Text>
                    <IconButton
                      icon={likes[photo.id] ? <FaHeart /> : <FaRegHeart />}
                      onClick={() => {
                        toggleLike(photo.id);
                      }}
                    />
                  </Box>
                </Stack>
              ))}
        </SimpleGrid>
      </Center>
      <Center>
        <HStack spacing="10" position="fixed" bottom="5" rounded="base" bg="whiteAlpha.800" backdropFilter='blur(5px)' boxShadow='base'>
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <Image src={modalImageUrl} />
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
