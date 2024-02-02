import {
  Box,
  Divider,
  Flex,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import logo from "../assets/logo.jpg";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Link to="/">
          {" "}
          <img src={logo} alt="logo" width={"70px"} height={"70px"} />
        </Link>
        <IconButton
          size="sm"
          onClick={toggleColorMode}
          aria-label={"Color Mode"}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />{" "}
        {/* npm i @chakra-ui/icons */}
      </Flex>
      <Divider my={5} />
    </Box>
  );
};

export default Header;
