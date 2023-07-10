export interface Bill {
  billId: number
  billDate: string
  discountValue: number
  totalCost: number
  orderId: number
  createdAt: string
  payments: Payment[]
}

export interface BillPayload {
  billDate: string
  discountValue: number
  totalCost: number
  orderId: number
}

export interface Payment {
  billId: number
  paymentId: number
  cost: number
  paymentDate: string
  paymentMethod: string
  cardNumber?: string
  createdAt: string
}
