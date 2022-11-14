const fs = require('fs');
const { faker } = require('@faker-js/faker');
 
const N = 500
const FILENAME = 'products.test.json'

const products = Array(N).fill(null).map((_, idx) => ({
  id: idx + 1,
  img: faker.image.business(640, 480, true), 
  name: faker.commerce.product(),
  price: parseInt(faker.finance.amount())
}))

fs.writeFile(FILENAME, JSON.stringify(products), (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Success (${FILENAME} generated)`)
  }
});
