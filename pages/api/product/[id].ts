import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'

import { ErrorResp, requiredParam } from '../_common'

type Product = {
  id: number
  name: string
  img: string
  amount: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | ErrorResp>
) {
  const id = requiredParam(req.query.id)

  const fileContents = await fs.readFile(process.cwd() + '/products.test.json', 'utf8')
  const product = (JSON.parse(fileContents) as unknown as Product[]).find(p => p.id === parseInt(id))

  if (!product) {
    res.status(404).json({ error: `Product (id: ${id}) not found` })
    return
  }

  res.status(200).json(product);
}
