import { z } from 'zod'

export const billsSchema = z.object({
  orderId: z
    .number()
})
