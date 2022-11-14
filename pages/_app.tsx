import { ChakraProvider, Box, Flex, Container } from '@chakra-ui/react'
import { CartProvider } from "react-use-cart";
import Link from 'next/link'

import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CartProvider>
        <Box position="fixed" w="100%" h="50px" top="0" left="0" boxShadow="0 0 3px gray;">
          <Container h="100%">
            <Flex direction="row" justifyContent="space-between" alignItems="center" h="100%">
              <Link href={{ pathname: '/'}}>About</Link>
              <Link href={{ pathname: '/list'}}>Products List</Link>
              <Link href={{ pathname: '/cart'}}>Cart</Link>
            </Flex>
          </Container>
        </Box> 
        <Box pt="80px">
          <Component {...pageProps} />
        </Box>
      </CartProvider>
    </ChakraProvider>
  )
}
