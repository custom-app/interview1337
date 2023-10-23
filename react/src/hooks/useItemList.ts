export interface Item {
  name: string
  id: number
}

const mockItems: Item[] = Array.from({length: 1000}, (_, i) => ({
  name: `Item ${i + 1}`,
  id: i + 1,
}))

export const useItemList = () => {
  const fetch = () => Promise.resolve(mockItems)
  return {fetch}
}
