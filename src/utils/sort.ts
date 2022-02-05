export function ordererList<Type>(
  list: Array<Type>,
  field: keyof Type,
  order: string
): Array<Type> {
  return list.sort((a, b) => {
    if (a[field] > b[field]) {
      return order === 'asc' ? 1 : -1
    }
    if (a[field] < b[field]) {
      return order === 'asc' ? -1 : 1
    }
    return 0
  })
}
