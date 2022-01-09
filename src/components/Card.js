import React from "react";
import {Stack, Image, Box, Text, IconButton} from "@chakra-ui/react";
import {FaHeart, FaRegHeart} from "react-icons/fa";

const Card = ({photo, setModalImageUrl, onOpen, likes, toggleLike}) => (
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
    <Box px={5} pb={5} pt={2}>
      <Text as='b'>
        {photo.rover.name} - {photo.camera.full_name}
      </Text>
      <Text>{photo.earth_date}</Text>
      <IconButton
        icon={likes[photo.id] ? <FaHeart /> : <FaRegHeart />}
        mt={3}
        onClick={() => {
          toggleLike(photo.id);
        }}
      />
    </Box>
  </Stack>
);

export default Card;
