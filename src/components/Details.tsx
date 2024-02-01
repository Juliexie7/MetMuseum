import Footer from "./Footer"
import Header from "./Header"
import ReviewList from "./ReviewList"
import { Link, useLocation } from "react-router-dom";
import { Box, Text, SimpleGrid, HStack, VStack, Button, Center } from "@chakra-ui/react";


const details = () => {
  const { state } = useLocation();

  return (
    <>
      <Header />
      <SimpleGrid columns={{sm: 1, md: 2}} spacing={10}>
        <Box>          
          
          <Center h="50vh">
          <VStack>
          <Text fontSize='5xl' as='b'>{state.title}</Text>
          <HStack>
            
            <Text as="b" fontSize='xl'>Artist: </Text>
            <Text fontSize='xl'>{state.artistDisplayName}</Text>
          </HStack>
          <HStack>
            <Text as="b" fontSize='xl'>Artist life dates: </Text>
            <Text fontSize='xl'>{state.artistDisplayBio}</Text>
          </HStack>
          <HStack>
            <Text as="b" fontSize='xl'>Artwork Created: </Text>
            <Text fontSize='xl'>{state.objectDate}</Text>
          </HStack>
          <HStack>
            <Text as="b" fontSize='xl'>Medium: </Text>
            <Text fontSize='xl'>{state.medium}</Text>
          </HStack>
          <HStack>
            <Text as="b" fontSize='xl'>Dimensions: </Text>
            <Text fontSize='xl'>{state.dimensions}</Text>
          </HStack>
          <HStack>
            <Text as="b" fontSize='xl'>Classification: </Text>
            <Text fontSize='xl'>{state.classification}</Text>
          </HStack>
          </VStack>
          </Center>
        </Box>
        <Box>
        <img src={state.primaryImage} alt={state.title} />
        </Box>
        <Box>
        <Button size="md"><Link to="/">Go Back</Link></Button>  
        </Box>
      </SimpleGrid>
      <ReviewList objectID={state.objectID}/>   
      <Footer />
    </>
  )
}

export default details