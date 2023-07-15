export interface Bill {
  billId: number
  billDate: string
  discountValue: number
  totalCost: number
  items: OrderDetails[]
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

export interface OrderDetails {
  description: string;
  quantity: number;
  price: number;
  
}

export interface OrderDetailsRaw {
  costHour: number
  hoursTaken: number
  activityDescription: string
  employeeName: string
}

