import {Button, Container, Spinner, Heading, Image, useToast} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCart } from "react-use-cart";
import useSWR from 'swr';


export default function ProductDetails() {
  const router = useRouter()
  const { addItem } = useCart()
  const toast = useToast()
  const { data: product, error } = useSWR(`/api/product/${router.query.id}`, (url: string) => fetch(url).then((res) => res.json()))

  if (!router.query.id) return <Container><Spinner /></Container>;

  if (error) return <div>Failed to load product info</div>;
  if (!product) return <Container><Spinner /></Container>;


  const onAddToCartClick = () => {
    addItem(product)

    toast({
      title: 'Added to cart',
      status: 'success',
      duration: 1000,
    })
  }

  return (
    <Container>
      <Heading mt="50px" mb="30px">{product.name}</Heading>
      <Image src={product.img} />
      <Button onClick={onAddToCartClick} mt="30px">Add to cart (${product.price / 100})</Button>
    </Container>
  )
}
