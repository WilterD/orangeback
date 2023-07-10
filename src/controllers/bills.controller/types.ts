export interface Bill {
  billId: number
  billDate: string
  discountValue: number
  totalCost: number
  orderId: number
  createdAt: string
}

export interface BillPayload {
  billDate: string
  discountValue: number
  totalCost: number
  orderId: number
}
