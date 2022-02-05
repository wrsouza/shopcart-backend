import express, { Application, json, Request, Response } from 'express'
import { categories, products } from '~/database'
import { ordererList } from '~/utils'

const PORT = process.env.PORT || 3000
const server: Application = express()
server.use(json())

server.get('/', function (req: Request, res: Response) {
  res.send('Hello World')
})

server.get('/categories', function (req: Request, res: Response) {
  const { sort } = req.query
  let result: Category[] = categories
  const allowedFields: string[] = ['id', 'name']
  if (sort && allowedFields.includes(String(sort).replace('-', ''))) {
    const field = String(sort).replace('-', '')
    const order = String(sort).indexOf('-') === -1 ? 'asc' : 'desc'
    result = ordererList<Category>(result, field, order)
  }
  res.json(result)
})

server.get('/products', function (req: Request, res: Response) {
  const { categoryId, sort } = req.query
  let result: Product[] = products
  if (categoryId) {
    result = result.filter((p) => p.categoryId === categoryId)
  }
  const allowedFields: string[] = ['id', 'name', 'price']
  if (sort && allowedFields.includes(String(sort).replace('-', ''))) {
    const field = String(sort).replace('-', '')
    const order = String(sort).indexOf('-') === -1 ? 'asc' : 'desc'
    result = ordererList<Product>(result, field, order)
  }
  res.json(result)
})

server.listen(PORT, function () {
  console.log(`Running... http://localhost:${PORT}`)
})
