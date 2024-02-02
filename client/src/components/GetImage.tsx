import { useState, useEffect } from "react";
import axios from "axios";
import {
  Heading,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const GetImage = () => {
  // VERY crucial id and data both being collected from the browser cache so page reloads without lag
  const [artworkIds, setArtworkIds] = useState<any[]>(() => {
    // Retrieve artworkIds from localStorage on component load
    const savedIds = localStorage.getItem("artworkIds");
    return savedIds ? JSON.parse(savedIds) : [];
  });
  const [artworkData, setArtworkData] = useState<any[]>(() => {
    const savedData = localStorage.getItem("artworkData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  //Setting an upper limit on items that can render
  const itemsPerPage = 100;

  // This is always storing artworkIds in the cache to prevent recalling the ids SEE ABOVE
  useEffect(() => {
    localStorage.setItem("artworkIds", JSON.stringify(artworkIds));
  }, [artworkIds]);
  // same thing but with data
  useEffect(() => {
    localStorage.setItem("artworkData", JSON.stringify(artworkData));
  }, [artworkData]);

  // When page loads this calls the default search "sunflower" the same one called when a user searches an invalid term -- see below
  // If it sees the artwork Id has nothing
  useEffect(() => {
    if (artworkIds.length === 0) {
      callDefault(); // Call the default API function
    }
  }, [artworkIds]); // This is called everytime artworkIds is updated so the page never displays blank

  // a workaround method that is called when the user searches something that is not in the database
  // also the default fallback for other methods
  const callDefault = async () => {
    try {
      const response = await axios.get(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=sunflower"
      );
      console.log(response.data);
      setArtworkIds(response.data.objectIDs);
      console.log("ids updated");
    } catch (error) {

    }
  };

  // function that retrieves the data based on the IDs in the useState
  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        // we attempted pagination but ended up just using it as a cap to load first 100 items
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const idsToFetch = artworkIds.slice(start, end);
        setCurrentPage(1)
        // calling a map of data with the ids presented by the previous state (either the cache, search for term or default search)
        const newData = await Promise.all(
          idsToFetch.map(async (id) => {
            try {
              const response = await axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
              );
              return response.data;
            } catch (error) {
              console.error(
                `Failed to fetch artwork data for ID: ${id}`,
                error
              );
              return null; // or handle error as needed
            }
          })
        );
        setArtworkData([]);
        // Filter out null values and append the new data
        setArtworkData((prevState) => [
          ...prevState,
          ...newData.filter(Boolean),
        ]);
        console.log("All data updated");
      } catch (error) {

      }
    };

    if (artworkIds.length > 0) {
      fetchArtworkData();
    }
  }, [artworkIds, currentPage]);


  // Code for future pagination

  // const handleLoadMore = () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // };

  // TODO: make calls work with api client

  async function searchForTerm(search: string) {
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
        // reset data to blank and call default
        setArtworkData([]);
        callDefault();
        return;
      } else {
        //otherwise set a new batch of ids and delete current data
        // by reseting the IDs the data function is automatically called
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

  // for 'back to top' button
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setShowBackToTop(scrollTop > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // TODO: clean up error catching

  return (
    <div>
      <div>
        <InputGroup size="md" my={7}>
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
              <Button type="submit" size="sm" mr={1}>
                Search
              </Button>
            </InputRightElement>
          </form>
        </InputGroup>

        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          className="my-masonry-grid"
        >
          <Masonry gutter="20px">
            {artworkData.map((artwork, index) => {
              if (artwork.primaryImageSmall) {
                return (
                  <div key={index}>
                    <Link to={"/details/" + artwork.objectID} state={artwork}>
                      <img src={artwork.primaryImageSmall} alt={artwork.title} />
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
        {showBackToTop && (
          <IconButton
            icon={<FaArrowUp />}
            aria-label="Back to Top"
            position="fixed"
            bottom="4"
            right="4"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        )}
      </div>
    </div>
  );
};

export default GetImage;
