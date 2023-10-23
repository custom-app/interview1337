import {FC, useCallback, useEffect, useState} from 'react';
import {Order, useOrderList} from '../../hooks/useOrderList.ts';
import {Item, useItemList} from '../../hooks/useItemList.ts';
import {OrderCard, OrderWithItems} from '../OrderCard/OrderCard.tsx';
import styles from './Orders.module.scss'
import {styled} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {Dayjs} from 'dayjs';

const StyledDuration = styled('div')({
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '10px',
  justifyContent: 'stretch',
})

export const Orders: FC = () => {

  const [filters, setFilters] = useState<{ start: Dayjs | null, finish: Dayjs | null }>({start: null, finish: null})

  useEffect(() => {
    setFilters({
      start: dayjs().subtract(10, 'day'),
      finish: dayjs(),
    })
  }, [filters, setFilters]);

  const [orders, setOrders] = useState<Order[]>()
  const [items, setItems] = useState<Item[]>()

  const fetchItems = useCallback(async () => {
    const {fetch} = useItemList()
    await fetch().then(items => setItems(items))
  }, []);

  const fetchOrders = useCallback(async () => {
    const {fetch} = useOrderList()
    await fetch(filters).then(orders => setOrders(orders))
  }, []);

  fetchItems().then()
  fetchOrders().then()

  const ordersWithItems: OrderWithItems[] | undefined = orders?.map(order => ({
    order,
    items: order.items.map(itemId => items?.find(i => i.id === itemId) as Item),
  }))

  return (
    <div className={styles.container}>
      <StyledDuration>
        <DatePicker
          label="From"
          value={filters.start}
          onChange={date => filters.start = date}
        />
        <DatePicker
          label="To"
          value={filters.finish}
          onChange={date => filters.finish = date}
        />
      </StyledDuration>
      <div>
        {
          ordersWithItems?.map(orderWithItems => (
            <OrderCard
              key={orderWithItems.order.id}
              {...orderWithItems}
            />
          ))
        }
      </div>
    </div>
  )
};
