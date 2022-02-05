interface Filter {
  [key: string]: unknown
}

interface Product extends Filter {
  id: string
  name: string
  price: number
  image: string
  categoryId: string
}

interface Category extends Filter {
  id: string
  name: string
}

interface User extends Filter {
  id: string
  name: string
  email: string
  password: string
}

interface Order extends Filter {
  id: string
  userId: string
  products: Product[]
}
