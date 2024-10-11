export interface Item {
  id: number
  name: string
  favourite: boolean
}

export const items: {data?: Item[]} = {}
