import { Box, Heading, Text } from "@chakra-ui/react"

interface Props{
    title:string, 
    desc:string,
}

const Review = ({title,desc}:Props) => {
  return (
    <>
      <Box p={5} shadow='md' borderWidth='1px'>
        <Heading fontSize='xl'>{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    </>
  )
}

export default Review