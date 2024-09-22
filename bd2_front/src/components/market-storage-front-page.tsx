'use client'

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getToken, verifyToken } from "@/utils/token"

export function MarketStorageFrontPageComponent() {
  const router = useRouter()
  const token = getToken()

  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    verifyToken(token as string, router)
    fetch("http://localhost:3000/own-products", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((data: []) => {setProducts([...data])})
    .catch((error) => console.error(error))

  },[])


  function handleSearch(){
    fetch("http://localhost:3000/product-search?search=" + searchText, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json())
    .then((data: []) => {setProducts([...data]); console.log(products)})
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Storage.io</h1>
        <div className="flex justify-center">
          <Input className="max-w-md mr-2" placeholder="Pesquise aqui novos produtos" onChange={(e) => { setSearchText(e.target.value) }}/>
          <Button onClick={handleSearch}>Pesquisa</Button>
          <Button className="ml-3" onClick={() => { router.push("/add-product") }}>Novo Item</Button>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <Card key={product._id} className="overflow-hidden">
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
                  <p className="text-sm text-gray-500">R${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">ID = {product._id}</p>
                </div>
                <Button size="sm" className="px-7 mt-9 text-sm" onClick={() => {router.push("/add-product?id=" + product._id)}}>Editar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}