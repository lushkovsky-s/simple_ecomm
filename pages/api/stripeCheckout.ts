import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

import { ErrorResp } from './_common'

const stripeClient = new Stripe('sk_test_51M3LJjKBfxs07HSmkreRFkqBQVEL0iRHOMVULceZmNGkhWaN6oldNl1obrE1Xasib0PyUBmdX6ZpJCM0gjc2hThj00CrPAxCgF', { apiVersion: '2022-08-01' })

type Data = {
  redirectTo: string | null
}

type Item = {
  name: string
  price: number
  quantity: number
}

interface StripeCheckoutReq extends NextApiRequest {
  body: {
    items: Item[]
  }
}

export default async function stripeCheckout(
  req: StripeCheckoutReq,
  res: NextApiResponse<Data | ErrorResp>
) {
  const session = await stripeClient.checkout.sessions.create({
    line_items: req.body.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name
        },
        unit_amount: item.price
      },
      quantity: item.quantity
    })),
    mode: 'payment',
    success_url: 'http://localhost:3000/paymentSuccess',
    cancel_url: 'http://localhost:3000/paymentFail',
  })

  res.status(200).json({ redirectTo: session.url })
}
