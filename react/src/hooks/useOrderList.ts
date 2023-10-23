import {Dayjs} from 'dayjs';

export interface Order {
  id: number
  date: number
  items: number[]
}

const mockOrders = Array.from({length: 1000}, (_, i) => ({
  date: Date.now() - i * 24 * 60 * 60 * 1000,
  id: i + 1,
  items: Array.from({length: 10}, (_) => Math.ceil(Math.random() * 999))
}))

export function useOrderList() {
  const fetch = (_: {start: Dayjs | null, finish: Dayjs | null}) => Promise.resolve(mockOrders)
  return {fetch}
}
