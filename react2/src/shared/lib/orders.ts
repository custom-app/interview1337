export interface Order {
  id: number
  date: number
  items: number[]
  my: boolean
}

export const orders: { data?: Order[] } = {}
