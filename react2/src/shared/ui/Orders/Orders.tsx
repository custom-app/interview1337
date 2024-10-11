import {useRef} from 'react';
import {searchOrders, useAllOrders, useMyOrders} from '../../lib/useOrders.ts';
import {useForm} from 'react-hook-form';
import {Search} from '../Search/Search.tsx';
import {orders} from '../../lib/orders.ts';
import {OrderCard} from '../OrderCard/OrderCard.tsx';
import {Item, items} from '../../lib/items.ts';

interface SearchForm {
  search: string
}

export const Orders = () => {
  const tab = useRef('all')

  if (tab.current === 'all') {
    useAllOrders()
  } else if (tab.current === 'my') {
    useMyOrders()
  }

  const {control, setValue, getValues} = useForm<SearchForm>({
    defaultValues: {}
  })

  if (getValues('search')) {
    searchOrders(getValues('search'))
  }

  const orderList = () => {
    const orderList = orders.data
    return (
      <>
        <div>
          Results for {getValues('search')}
        </div>
        {
          orderList?.map(order => (
            <OrderCard
              order={order}
              items={order.items.map((itemId) => items.data?.find(item => item.id === itemId)) as Item[]}
            />
          ))
        }
      </>
    )
  }

  return (
    <>
      <div>
        <Search
          onChange={(v: string) => setValue('search', v)}
          value={getValues('search')}
          controllerProps={{
            control,
            name: 'search',
          }}
        />
      </div>
      <div>
        <button onClick={() => tab.current = 'all'}>All</button>
        <button onClick={() => tab.current = 'my'}>My</button>
      </div>
      <div>
        {orderList()}
      </div>
    </>
  )
}
