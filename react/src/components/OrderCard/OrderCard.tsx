import {FC} from 'react';
import {Order} from '../../hooks/useOrderList.ts';
import {Item} from '../../hooks/useItemList.ts';

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
            name: {item.name}
          </div>
        ))
      }
    </div>
  )
}
