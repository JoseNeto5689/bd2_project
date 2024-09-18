'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, Trash2, ShoppingCart, Search, Package } from "lucide-react"

// Mock data for sales
const initialSales = [
  { id: 1, client: 'John Doe', total: 150.99, date: '2023-06-01', products: [
    { id: 1, name: 'Product A', price: 10.99, quantity: 5 },
    { id: 2, name: 'Product B', price: 15.99, quantity: 6 },
  ]},
  { id: 2, client: 'Jane Smith', total: 75.50, date: '2023-06-02', products: [
    { id: 3, name: 'Product C', price: 20.99, quantity: 2 },
    { id: 4, name: 'Product D', price: 25.99, quantity: 1 },
  ]},
  { id: 3, client: 'Bob Johnson', total: 200.00, date: '2023-06-03', products: [
    { id: 5, name: 'Product E', price: 30.99, quantity: 3 },
    { id: 1, name: 'Product A', price: 10.99, quantity: 7 },
    { id: 2, name: 'Product B', price: 15.99, quantity: 2 },
    { id: 3, name: 'Product C', price: 20.99, quantity: 1 },
    { id: 4, name: 'Product D', price: 25.99, quantity: 1 },
  ]},
]

export function SalesManagement() {
  const [sales, setSales] = useState(initialSales)
  const [selectedSale, setSelectedSale] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [productSearch, setProductSearch] = useState('')
  const [editProductSearch, setEditProductSearch] = useState('')

  const handleEditSale = (sale) => {
    setSelectedSale({ ...sale })
    setIsEditModalOpen(true)
  }

  const handleCancelSale = (saleId) => {
    setSales(sales.filter(sale => sale.id !== saleId))
  }

  const handleSaveEdit = () => {
    setSales(sales.map(sale => sale.id === selectedSale.id ? selectedSale : sale))
    setIsEditModalOpen(false)
  }

  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedSale(prevSale => {
      const updatedProducts = prevSale.products.map(product =>
        product.id === productId ? { ...product, quantity: parseInt(newQuantity) || 0 } : product
      )
      const newTotal = updatedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
      return { ...prevSale, products: updatedProducts, total: newTotal }
    })
  }

  const handleViewProducts = (sale) => {
    setSelectedSale(sale)
    setIsProductModalOpen(true)
  }

  const filteredProducts = selectedSale?.products.filter(product =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  ) || []

  const filteredEditProducts = selectedSale?.products.filter(product =>
    product.name.toLowerCase().includes(editProductSearch.toLowerCase())
  ) || []

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map(sale => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{sale.client}</TableCell>
                  <TableCell>${sale.total.toFixed(2)}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleViewProducts(sale)}>
                      <Package className="mr-2 h-4 w-4" />
                      View Products
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => handleEditSale(sale)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => handleCancelSale(sale.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Edit Sale</DialogTitle>
            <DialogDescription>
              Make changes to the sale here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {selectedSale && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Input
                  id="client"
                  value={selectedSale.client}
                  onChange={(e) => setSelectedSale({ ...selectedSale, client: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedSale.date}
                  onChange={(e) => setSelectedSale({ ...selectedSale, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid gap-2">
                <Label>Products</Label>
                <div className="flex items-center space-x-2 mb-2">
                  <Search className="text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={editProductSearch}
                    onChange={(e) => setEditProductSearch(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  {filteredEditProducts.map(product => (
                    <div key={product.id} className="flex items-center justify-between mb-2">
                      <span>{product.name} - ${product.price.toFixed(2)}</span>
                      <Input
                        type="number"
                        min="0"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        className="w-20"
                      />
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold">${selectedSale.total.toFixed(2)}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleSaveEdit}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Products in Sale</DialogTitle>
            <DialogDescription>
              View and search products for this sale.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Search className="text-gray-400" />
              <Input
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${(product.price * product.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}