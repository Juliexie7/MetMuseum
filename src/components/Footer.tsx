import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  Link,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import logo from "../assets/logo.jpg";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box height={300} w="100%">
      <Divider m={5} />
      <Flex align="center" justify="space-around" margin={10}>
        <SimpleGrid className="footerLinks" columns={4} gap={2} w="100%">
          <Flex direction="column" align="center" position="relative">
            <img src={logo} alt="logo" width={"120px"} height={"120px"} />

            <Flex justify="center" position="absolute" bottom={0} width="100%">
              <Link>
                <Icon boxSize={5} as={FaTwitter} mx={2} />
              </Link>
              <Link>
                <Icon boxSize={5} as={FaFacebook} mx={2} />
              </Link>
              <Link>
                <Icon boxSize={5} as={FaInstagram} mx={2} />
              </Link>
            </Flex>
          </Flex>
          <UnorderedList listStyleType="none" spacing={4}>
            <ListItem fontSize={["sm", "lg", "xl"]}>Useful Links</ListItem>
            <ListItem>
              <Link>Support</Link>
            </ListItem>
            <ListItem>
              <Link>Membership</Link>
            </ListItem>
            <ListItem>
              <Link>Events</Link>
            </ListItem>
            <ListItem>
              <Link>Contact Us</Link>
            </ListItem>
          </UnorderedList>
          <UnorderedList listStyleType="none" spacing={4}>
            <ListItem fontSize={["sm", "lg", "xl"]}>About The Met</ListItem>
            <ListItem>
              <Link>Mission and History</Link>
            </ListItem>
            <ListItem>
              <Link>Departments</Link>
            </ListItem>
            <ListItem>
              <Link>Press</Link>
            </ListItem>
            <ListItem>
              <Link>Careers</Link>
            </ListItem>
          </UnorderedList>
          <Flex direction="column" align="center">
            <Text fontSize={["sm", "lg", "xl"]}>
              Enter your email to receive news about the Met:
            </Text>
            <Input
              type="email"
              placeholder="your.name@example.com"
              m={2}
              focusBorderColor="crimson"
            />
            <Button width="8rem">Submit</Button>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default Footer;
