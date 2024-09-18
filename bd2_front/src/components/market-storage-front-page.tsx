'use client'

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const products = [
  { id: 1, name: "Fresh Apples", price: 2.99, image: "/placeholder-image.jpg?height=200&width=200" },
  { id: 2, name: "Organic Milk", price: 3.49, image: "/placeholder-image.jpg?height=200&width=200" },
  { id: 3, name: "Whole Grain Bread", price: 2.79, image: "/placeholder-image.jpg?height=200&width=200" },
  { id: 4, name: "Free Range Eggs", price: 4.99, image: "/placeholder-image.jpg?height=200&width=200" },
  { id: 5, name: "Cheddar Cheese", price: 5.49, image: "/placeholder-image.jpg?height=200&width=200" },
  { id: 6, name: "Organic Spinach", price: 2.29, image: "/placeholder-image.jpg?height=200&width=200" },
  { id: 7, name: "Grass-Fed Beef", price: 9.99, image: "/placeholder-image.jpg?height=200&width=200" },
  { id: 8, name: "Wild Caught Salmon", price: 12.99, image: "/placeholder-image.jpg?height=200&width=200" },
]

export function MarketStorageFrontPageComponent() {
  const router = useRouter()
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Storage.io</h1>
        <div className="flex justify-center">
          <Input className="max-w-md mr-2" placeholder="Search products..." />
          <Button>Search</Button>
          <Button className="ml-3" onClick={() => { router.push("/add-product") }}>Add new Item</Button>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                </div>
                <Button size="sm" className="px-7 text-sm">Edit</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}