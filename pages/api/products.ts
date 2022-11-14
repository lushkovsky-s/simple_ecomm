import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { requiredParam } from './_common'

type Product = {
  id: number
  name: string
  img: string
  amount: number
}

type Resp = {
  hasMore: boolean
  products: Product[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Resp>
) {
  const offset = parseInt(requiredParam(req.query.offset))
  const count = parseInt(requiredParam(req.query.count))

  const fileContent = await fs.readFile(process.cwd() + '/products.test.json', 'utf8');
  const products = JSON.parse(fileContent)
  const slice = products.slice(offset, offset + count)

  res.status(200).json({ hasMore: slice.length !== 0, products: slice as unknown as Product[] });
}
