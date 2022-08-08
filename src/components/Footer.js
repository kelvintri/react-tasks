import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaFacebook,  FaInstagram, FaTwitter } from "react-icons/fa";


const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <>
      <Box overflow='hidden'
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
        bottom={0}
        width="100%"
        position='fixed'
      >
        <Container
          as={Stack}
          maxW={"9xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        ><Box>
          <Text textAlign='center'>Made with ❤ by Kelvin</Text>
        </Box>
          <Stack direction={"row"} spacing={5}>
            <SocialButton label={"Twitter"} href={"https://twitter.com/kelvintri7"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"Facebook"} href={"https://www.facebook.com/ygbacainimonyet"}>
              <FaFacebook />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"https://www.instagram.com/kelvintriy/"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
