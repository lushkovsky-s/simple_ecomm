import {useState, useEffect} from 'react'
import {Box, Container, Flex, Grid, GridItem, Heading, Image, Spinner, Text} from '@chakra-ui/react'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IProduct {
  id: number
  name: string
  price: number
  img: string
}

export default function List() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)

  const fetchData = () => {
    fetch(`/api/products/?offset=${products.length}&count=50`)
      .then(resp => resp.json())
      .then(resp => {
        setHasMore(resp.hasMore)
        setProducts([...products, ...resp.products])
      })
  }

  useEffect(() => fetchData(), [])

  return (
    <Container>
      <Heading mt="50px" mb="30px">Products list</Heading>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Spinner />}
        endMessage={
          <Text my="30px" textAlign="center">Yay! You have seen it all</Text>
        }
      >
        <Grid templateColumns="repeat(4, 1fr)" gap="20px">
          {
            products.map(product =>
              <Link href={{
                pathname: '/product/[id]',
                query: { id: product.id },
              }} key={product.id}>
                <GridItem cursor="pointer">
                  <Box border="1px solid black" borderRadius="3px">
                    <Image mb="10px" src={product.img} />
                    <Flex direction="row" justifyContent="space-between" px="10px">
                      <div>{ product.name }</div>
                      <div>${ product.price/100 }</div>
                    </Flex>
                  </Box>
                </GridItem>
              </Link>
            )
          } 
        </Grid>
      </InfiniteScroll>
    </Container>
  )
}
