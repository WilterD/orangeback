export interface Estado {
  id_estado: number
  nombre: string
  created_at: Date
}

export type EstadosRequestBody = Pick<Estado, 'nombre'>
