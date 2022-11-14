import { useCart } from "react-use-cart";
import { Container, Text, Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Img} from '@chakra-ui/react'

export default function Checkout() {
  const {
    totalUniqueItems,
    items,
    updateItemQuantity,
  } = useCart();

  const total = items.reduce((prev, curr) => prev + curr.price * (curr.quantity || 0), 0)

  const onCheckoutClick = async () => {
    const resp = await fetch("/api/stripeCheckout", {
      method: "POST",
      body: JSON.stringify({ items }),
      headers: {
          "Content-Type": "application/json",
      },
    })

    const body = await resp.json()
    const { redirectTo } = body

    if (redirectTo) {
      const wnd = window.open(redirectTo, '_blank')

      if (wnd) {
        wnd.focus()
      }
    } else {
      console.error('No redirect link', resp.json())
    }
  }

  return (
    <Container>
      <Heading mt="50px" mb="30px">Cart ({totalUniqueItems} products)</Heading>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map(item => 
              <Tr key={item.id}>
                <Td><Img src={item.img} /></Td>
                <Td>{item.name}</Td>
                <Td>{item.quantity}
                  <button
                    onClick={() => updateItemQuantity(item.id, (item.quantity || 0) - 1)}
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateItemQuantity(item.id, (item.quantity || 0) + 1)}
                  >
                    +
                  </button>
                </Td>
                <Td>
                  ${(item.quantity || 0) * item.price/100}
                </Td>
              </Tr>
              )}
          </Tbody>
        </Table>
      </TableContainer>

      <Text mt="20px">Total: ${total/100}</Text>

      <Button onClick={onCheckoutClick} mt="30px">Checkout</Button>
    </Container> 
  )
}
