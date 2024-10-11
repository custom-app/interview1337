import {FC} from 'react';
import {Order} from '../../lib/orders.ts';
import {Item} from '../../lib/items.ts';

export interface OrderWithItems {
  order: Order
  items: Item[]
}

export const OrderCard: FC<OrderWithItems> = ({order, items}) => {
  return (
    <div>
      <div>ID: {order.id}</div>
      <div>ITEMS:</div>
      {
        items.map((item, index) => (
          <div key={index}>
            name: {item.name}, favourite: {item.favourite}
          </div>
        ))
      }
    </div>
  )
}
