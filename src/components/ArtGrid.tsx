import GetImage from "./GetImage"
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

const artGrid = () => {
  return (
    <>

<Grid
        templateAreas={`"header"
                        "main"
                        "footer"`}
        gridTemplateRows={"70px 1fr 30px"}
        gridTemplateColumns={"1fr"}
        gap="1"
        fontWeight="bold"
        width="100%"
        justifyContent="center"
      >
        <GridItem pl="2" area={"header"}>
          <Header />
        </GridItem>
        <GridItem pl="2" area={"main"}>
        <GetImage />
        </GridItem>
        <Footer></Footer>
      </Grid>
      
    </>
  )
}

export default artGrid