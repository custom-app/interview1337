import {useEffect} from 'react';
import {Order, orders} from './orders.ts';

const mockOrders: Order[] = Array.from({length: 1000}, (_, i) => ({
  date: Date.now() - i * 24 * 60 * 60 * 1000,
  id: i + 1,
  items: Array.from({length: 10}, (_) => Math.ceil(Math.random() * 999)),
  my: Math.random() > 0.5,
}))

const mockFetch = () => Promise.resolve(mockOrders)

export function useAllOrders() {
  useEffect(() => {
    mockFetch().then(orderListFromServer => orders.data = orderListFromServer)
  }, []);
}

export function useMyOrders() {
  useEffect(() => {
    mockFetch().then(orderListFromServer => orders.data = orderListFromServer.filter(order => order.my))
  }, []);
}

export function searchOrders(search: string) {
  search
  // TOOD: send request to the backend
}
