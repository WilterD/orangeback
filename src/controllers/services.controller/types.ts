export interface ServicePaginated {
  serviceId: number
  description: string
  totalCost: number
  createdAt: string
}

export interface Service {
  serviceId: number
  description: string
  totalCost: number
  createdAt: string
  activities: Activity[]
  bookings: Booking[]
  models: Model[]
}

export interface Activity {
  activityId: number
  description: string
  costHour: number
  createdAt: string
}

export interface Booking {
  bookingId: number
  expeditionDate: string
  expirationDate: string
  clientDni: string
  licensePlate: string
  createdAt: string
}

export interface Model {
  modelId: number
  brand: string
  description: string
  modelYear: string
}
