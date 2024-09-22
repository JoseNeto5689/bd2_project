'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon, MinusIcon, Trash2Icon } from 'lucide-react'
import { getToken, verifyToken } from '@/utils/token'
import { useRouter } from 'next/navigation'

type Product = {
  product: {
    _id: string;
    name: string;
  }
  quantity: number;
}

type Purchase = {
  _id: string;
  person: {
    _id: string;
    name: string;
  },
  products: Product[];
}


export function PurchaseManagementComponent() {
  const token = getToken()
  const router = useRouter()

  function resetSales(){
    fetch("http://localhost:3000/supply", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {setPurchases([...data])})
  }

  useEffect(() => {
    verifyToken(token as string, router)
    resetSales()
  }, [])


  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [personId, setPersonId] = useState('')
  const [personName, setPersonName] = useState('')
  const [products, setProducts] = useState<Product[]>([{ product: { _id: '', name: '' }, quantity: 1 }])

  const handleAddProduct = () => {
    setProducts([...products, { product: { _id: '', name: '' }, quantity: 1 }])
  }

  const handleRemoveProduct = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index)
    setProducts(newProducts)

  }

  const handleProductChange = (index: number, field: 'id' | 'name' | 'quantity', value: string) => {
    const newProducts = [...products]
    if (field === 'id') {
      newProducts[index].product._id = value
    } else if (field === 'name') {
      newProducts[index].product.name = value
    } else {
      newProducts[index].quantity = parseInt(value) || 0
    }
    setProducts(newProducts)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetch("http://localhost:3000/supply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        person_id: personId,
        products: products.map(product => {
          return {
            product_id: product.product._id,
            quantity: product.quantity
          }
        })
      })
    })
    .then(res => res.json())
    .then(data => {
      resetSales()
    })
  }

  const handleRemovePurchase = (id: string) => {
    console.log(id)
    fetch("http://localhost:3000/supply/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => { if(res.ok) resetSales() })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Gerenciamento de Vendas</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Adicionar nova venda</h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="personId">Id do cliente</Label>
              <Input
                className='flex-1'
                id="personId"
                value={personId}
                onChange={(e) => setPersonId(e.target.value)}
                placeholder="Enter person ID"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Produtos</Label>
            {products.map((product, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={product.product._id}
                  onChange={(e) => handleProductChange(index, 'id', e.target.value)}
                  placeholder="Id do Produto"
                  required
                />
                <Input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                  placeholder="Quantidade"
                  min="1"
                  required
                />
                <Button 
                  className='p-2'
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleRemoveProduct(index)}
                  disabled={products.length === 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddProduct}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Realizar Venda
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Historico de Vendas</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Cliente</TableHead>
              <TableHead>Produtos Vendidos</TableHead>
              <TableHead className="w-[100px]">Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {purchase.person.name} <br/>({purchase.person._id})
                </TableCell>
                <TableCell>
                  <ul className="list-none pl-0">
                    {purchase.products.map((product, productIndex) => (
                      <li key={productIndex} className="mb-2">
                        <span className="font-semibold">{product.product.name}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          (ID: {product.product._id}, Quantidade: {product.quantity})
                        </span>
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemovePurchase(purchase._id)}
                  >
                    <Trash2Icon className="h-4 w-4 mr-2" />
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}