'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ShoppingCart, User, X, Plus } from "lucide-react"

// Mock data for clients and products
const clients = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
]

const products = [
  { id: 1, name: 'Product A', price: 10.99 },
  { id: 2, name: 'Product B', price: 15.99 },
  { id: 3, name: 'Product C', price: 20.99 },
  { id: 4, name: 'Product D', price: 25.99 },
  { id: 5, name: 'Product E', price: 30.99 },
]

export function ProductSellingPageComponent() {
  const [selectedClient, setSelectedClient] = useState(null)
  const [clientSearch, setClientSearch] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [total, setTotal] = useState(0)

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(clientSearch.toLowerCase())
  )

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  )

  const handleAddProduct = (product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id)
    if (existingProduct) {
      handleQuantityChange(product.id, existingProduct.quantity + 1)
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }])
      updateTotal([...selectedProducts, { ...product, quantity: 1 }])
    }
  }

  const handleRemoveProduct = (productId) => {
    const updatedProducts = selectedProducts.filter(p => p.id !== productId)
    setSelectedProducts(updatedProducts)
    updateTotal(updatedProducts)
  }

  const handleQuantityChange = (productId, quantity) => {
    const updatedProducts = selectedProducts.map(p =>
      p.id === productId ? { ...p, quantity: parseInt(quantity) || 0 } : p
    )
    setSelectedProducts(updatedProducts)
    updateTotal(updatedProducts)
  }

  const updateTotal = (products) => {
    const newTotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
    setTotal(newTotal)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Order submitted:', { client: selectedClient, products: selectedProducts, total })
    // Here you would typically send this data to your backend
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Selling</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Client</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="text-gray-400" />
            <Input
              type="text"
              placeholder="Search clients..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              className="flex-grow"
            />
          </div>
          {clientSearch && (
            <div className="mt-2 space-y-2">
              {filteredClients.length > 0 ? (
                filteredClients.map(client => (
                  <Button
                    key={client.id}
                    variant={selectedClient?.id === client.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedClient(client)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    {client.name} ({client.email})
                  </Button>
                ))
              ) : (
                <p className="text-sm text-gray-500">No clients found</p>
              )}
            </div>
          )}
          {selectedClient && (
            <div className="mt-4 p-2 bg-gray-100 rounded-md">
              <h3 className="font-semibold">Selected Client:</h3>
              <p>{selectedClient.name} ({selectedClient.email})</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="flex-grow"
            />
          </div>
          {productSearch && (
            <div className="mb-4">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map(product => (
                    <Button
                      key={product.id}
                      variant="outline"
                      className="justify-between"
                      onClick={() => handleAddProduct(product)}
                    >
                      <span>{product.name} - ${product.price.toFixed(2)}</span>
                      <Plus className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No products found</p>
              )}
            </div>
          )}
          
          {selectedProducts.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>${(product.price * product.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => handleRemoveProduct(product.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" onClick={handleSubmit} disabled={!selectedClient || selectedProducts.length === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Complete Sale
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}