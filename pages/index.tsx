import {Box, Code, Container, Heading, ListItem, Text, UnorderedList} from '@chakra-ui/react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const author = 'Sergio Lushkovsky'
  
  const stack = [
    'next',
    'CharkaUI (ui framework)',
    'react-use-cart (cart state management)',
    'Faker (test data generation)',
    'Stripe (payments provider)',
    'react-infinite-scroll-component (pagination via infinity scroll)',
  ]

  const theCase = `
    Question:
    Create a simple product category website with checkout function. The website should contain the following pages:

    Product list page
    Product detail page
    Checkout page
    Thank you page after payment success

    Pagination, shopping cart are optional. You can use any library /framework as you like. But we highly recommend to use NextJs, Tailwind CSS. For the payment gateway, you can use PayPal / Stripe sandbox mode to do so. 

    After you complete the implementation, please upload the related source code to a public GitHub / GitLab / Bitbucket repo with a simple readme. 
  `

  return (
    <div className={styles.container}>
      <Head>
        <title>{author}</title>
        <meta name="description" content="Test case (result)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Box mt="30px">
          <Text>Test case</Text>
          <Heading>{author}</Heading>
        </Box>

        <Box mt="30px">
          <Text>The case:</Text>
          <Code>{theCase}</Code>
        </Box>

        <Box mt="30px">
          <Text>Tech stack:</Text>
          <UnorderedList>
            {
              stack.map(technology => 
                <ListItem key={technology}>{technology}</ListItem>
              )
            }
          </UnorderedList>
        </Box>
      </Container>
    </div>
  )
}
