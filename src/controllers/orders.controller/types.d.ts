export interface Order {
  responsibleDni: string | null
  responsibleName: string | null
  entryTime: string
  estimatedDeparture: string
  realDeparture: string | null
  bookingId: number
  createdAt: string
}
