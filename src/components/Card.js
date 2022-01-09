import React from "react";
import {
  Stack,
  Image,
  IconButton,
  Text,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Card = ({ photo, setModalPhoto, onOpen, likes, toggleLike }) => (
  <Stack
    boxShadow="lg"
    rounded="lg"
    bg="white"
    key={photo.id}
    // overflow="hidden"
    alignItems="stretch"
  >
    <Button
      width="100%"
      height="100%"
      p={0}
      roundedBottom={0}
      overflow="hidden"
      onClick={() => {
        setModalPhoto(photo);
        onOpen();
      }}
    >
      <Image
        width="100%"
        height="100%"
        src={photo.img_src}
        fit="cover"
        fallback={<Skeleton height="300px" />}
        // onDoubleClick={() => {
        //   setLikes({
        //     ...likes,
        //     [idx]: true,
        //   });
        // }}
      />
    </Button>
    <Stack px={5} pb={5} pt={2}>
      <Text as="b">
        {photo.rover.name} - {photo.camera.full_name}
      </Text>
      <Text>{photo.earth_date}</Text>
      {/* <Spacer /> */}
      <IconButton
        icon={likes[photo.id] ? <FaHeart /> : <FaRegHeart />}
        mt={3}
        onClick={() => {
          toggleLike(photo.id);
        }}
      />
    </Stack>
  </Stack>
);

export default Card;
