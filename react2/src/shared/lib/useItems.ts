import {Item, items} from './items.ts';
import {useEffect} from 'react';

const mockItems: Item[] = Array.from({length: 1000}, (_, i) => ({
  name: `Item ${i + 1}`,
  id: i + 1,
  favourite: Math.random() > 0.5,
}))

const mockFetch = () => Promise.resolve(mockItems)

export const useItems = () => {
  useEffect(() => {
    mockFetch().then(itemListFromServer => items.data = itemListFromServer)
  }, []);
}
