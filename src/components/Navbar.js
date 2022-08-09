import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  useColorModeValue,
  Stack,
  useColorMode,
  Text
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";



export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box overflow='hidden' bg={useColorModeValue("gray.100", "gray.900")} px={4} width="100%" zIndex={1000} position="fixed">
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          maxW={"9xl"}          
        >
          <Text fontSize='2xl'>Task Creator</Text>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
