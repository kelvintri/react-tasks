import React from 'react';
import { useColorMode, Box, IconButton } from '@chakra-ui/react';
import { MoonIcon,SunIcon } from '@chakra-ui/icons'

export default function ThemeToggler() {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = { light: 'purple.100', dark: 'purple.700' };
    const textColor = { light: 'purple.800', dark: 'white' };
    return (
      <Box textAlign="right" py={4} mr={12}>
        <IconButton
          aria-label='Toggle Theme'
          icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
          onClick={toggleColorMode}
          variant="ghost"
          color={textColor[colorMode]}
          bg={bgColor[colorMode]}
        />
      </Box>
    );
  }