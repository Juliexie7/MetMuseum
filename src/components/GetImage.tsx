import { useState, useEffect } from "react";
import axios from "axios";
import {
  Divider,
  Heading,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";

const GetImage = () => {
  const [artworkIds, setArtworkIds] = useState<any[]>([]);
  const [artworkData, setArtworkData] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const toast = useToast();
  console.log(error);

  // when page loads default is Sunflower search
  useEffect(() => {
    const fetchArtworkIds = async () => {
      try {
        const response = await axios.get(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=sunflower"
        );
        console.log(response.data);
        setArtworkIds(response.data.objectIDs);
        console.log("ids updated");
      } catch (error) {
        setError("Failed to fetch artwork data");
      }
    };

    fetchArtworkIds();
  }, []);

  // a workaround method that is called when the user searches something that is not in the database
  const callDefault = async () => {
    try {
      const response = await axios.get(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=sunflower"
      );
      console.log(response.data);
      setArtworkIds(response.data.objectIDs);
      console.log("ids updated");
    } catch (error) {
      setError("Failed to fetch artwork data");
    }
  };

  // function that retrives the data based on the IDs in the useState
  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        for (let i = 0; i < artworkIds.length; i++) {
          // iterate through id's appending them to end of url to recieve JSON data
          const response = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkIds[i]}`
          );
          // Update artworkData with the fetched data using prevState on search its blanked out before.
          setArtworkData((prevState) => [...prevState, response.data]);
          console.log("data updated");
        }
      } catch (error) {
        setError("Failed to fetch artwork data");
      }
    };

    if (artworkIds.length > 0) {
      fetchArtworkData();
    } else {
    }
  }, [artworkIds]); // whenever ID state is updated this function is called which does all the heavy lifting.

  // TODO: make calls work with api client
  async function searchForTerm(search: string) {
    // apiClient
    //   .get<any>(`/search?isOnView=true&q=${search}`)
    //   .then((res) => {
    //     setArtworkIds(res.data);
    //     console.log("here"); // Log the response data
    //   })
    //   .catch((err) => setError(err.message));

    try {
      // Takes the search term and finds all the IDs associated with it
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=${search}`
      );
      // console log to see how many items there are
      console.log(response.data);
      // checks if the user searched and it came up with no results aka null
      // returns the default search
      if (response.data.objectIDs === null) {
        //toast popup that tells user
        toast({
          title: `No Items Found with term: ${search}`,
          status: "error",
          isClosable: true,
        });
        setArtworkData([]);
        callDefault();
        return;
      } else {
        setArtworkIds(response.data.objectIDs);
        setArtworkData([]);
        console.log("ids updated");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console logs for changes to state.. used for debugging
  useEffect(() => {
    console.log("artworkIds updated:", artworkIds);
  }, [artworkIds]);

  useEffect(() => {
    console.log("artworkData updated:", artworkData);
  }, [artworkData]);

  //handle submit function that calls async function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh on form submit
    searchForTerm(inputValue); // Handle form submission
  };

  // TODO: clean up error catching
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      {/* <button>press</button> */}
      {/* <p>Artist: {artworkData.constituents[0]?.name || "Unknown Artist"}</p>
      <p>Medium: {artworkData.medium}</p> */}
      <div>
        <InputGroup size="md" my={4}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <Input
              id="search"
              type="text"
              placeholder="Explore the Met..."
              focusBorderColor="crimson"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              pr="4.5rem"
            />
            <InputRightElement width="4.5rem">
              <Button type="submit" size="sm">
                Search
              </Button>
            </InputRightElement>
          </form>
        </InputGroup>
        <Divider my={5} />

        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          className="my-masonry-grid"
        >
          <Masonry gutter="20px">
            {artworkData.map((artwork, index) => {
              if (artwork.primaryImage) {
                return (
                  <div key={index}>
                    <Link to={"details/" + artwork.objectID} state={artwork}>
                      <img src={artwork.primaryImage} alt={artwork.title} />
                    </Link>
                    <Box textAlign="left" m={1} py={1}>
                      <Heading as="h4" size="sm">
                        {artwork.title}
                      </Heading>
                      <Text fontSize="md" fontWeight={100}>
                        {artwork.artistDisplayName
                          ? artwork.artistDisplayName
                          : artwork.objectDate}
                      </Text>
                    </Box>
                  </div>
                );
              }
              return null;
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default GetImage;
