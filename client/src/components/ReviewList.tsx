import {
    Button,
    Input,
    Textarea,
    Text,
    Box,
    SimpleGrid,
  } from "@chakra-ui/react";
import axios from "axios";
import ReviewCard from "./reviewCard";
import { useEffect, useState } from "react";

interface review {
    reviewid: number,
    objectid: number,
    name: string,
    comment: string
}

interface Props {
    objectID: number
}

const ReviewList = ({objectID}: Props) => {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState<review[]>([]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createReviews(objectID, name, comment);
        setName("");
        setComment("");
      };

    const createReviews = async (objectID:number, name: string, comment: string) => {
      const response = await axios.post("https://met-museum-ten.vercel.app/details/reviews", {
        objectID: objectID, name: name, comment: comment
      });      
      const updatedReviews = [...reviews, ...response.data];
      setReviews(updatedReviews);
      console.log(updatedReviews);
    };

    const fetchReviews = async () => {
        const response = await axios.get("https://met-museum-ten.vercel.app/details/reviews");
        setReviews(response.data);
      };

    useEffect(()=>{fetchReviews()},[]);

    const currentReviews = reviews.filter((review)=>review.objectid == objectID);

    const renderedReviews = currentReviews.map((review) => {
      return (
        <ReviewCard
          key={review.reviewid}
          title={review.name}
          desc={review.comment}
        />
      );
    });

  return (
    <>
      <Box m="1.5rem">
        <Text as="b" fontSize='xl'>{renderedReviews.length>0?"Visitor Reviews":null}</Text>
      </Box>
      <SimpleGrid columns={{sm: 1, md: 2, lg:3}} spacing={10}>
        {renderedReviews}
      </SimpleGrid>
      <Box m="1.5rem">
        <Text as="b" fontSize='xl'>Submit your comment</Text>
      </Box>
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", width: "100%", flexDirection: "column" }}>
          <Input type="text"
            placeholder="Enter your name"
            focusBorderColor="crimson"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br />
          <Textarea
            placeholder="Enter your comment"
            focusBorderColor="crimson"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3} cols={100} />
          <Button type="submit" mt="1.5rem"> Submit </Button>
        </form>
    </>
  )
}

export default ReviewList