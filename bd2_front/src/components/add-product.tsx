"use client"

import { use, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { storage } from '@/services/firebase'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { getToken, verifyToken } from '@/utils/token'
import { useRouter, useSearchParams } from 'next/navigation'

export function AddProductComponent() {
  const token = getToken()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [file, setFile] = useState<File | undefined | null>(null)
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [manufacturingDate, setManufacturingDate] = useState<string>()
  const [expirationDate, setExpirationDate] = useState<string>()
  const [ammount, setAmount] = useState(0)

  const action: "add" | "edit" = searchParams.get("id") ? "edit" : "add"

  useEffect(() => { 
    verifyToken(token as string, router)
    if(action == "edit"){
      fetch("http://localhost:3000/product/" + searchParams.get("id"), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
      })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name)
        setType(data.type)
        setPrice(data.price)
        setDescription(data.description)
        setManufacturingDate(data.manufacturing_date?.split("T")[0])
        setExpirationDate(data.expiration_date?.split("T")[0])
        setAmount(data.ammount)
       })
    }
   }, [])

   function handleDelete(e: any){
    e.preventDefault()
    console.log(12)
    fetch(`http://localhost:3000/product/${searchParams.get("id")}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res)
      if (res.status != 200) {
        alert("Erro ao deletar")
        return
      }
      router.push("/products")
    })

   }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0])
  }

  const handleSubmit = async () => {
    console.log(1)
    if(action == "add") {
      const imageRef = ref(storage, `images/${file?.name}`)
      uploadBytes(imageRef, file as Blob).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)
        console.log('File uploaded successfully: ', downloadURL)
        fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          type,
          price,
          manufacturing_date: manufacturingDate,
          expiration_date: expirationDate,
          ammount,
          image: downloadURL
        })
      })
      .then((res) => {
        if (res.status != 201) {
          alert("Erro ao adicionar")
          return
        }
        router.push("/products")
      })
      }
  )
  return
  }
  else if(action == "edit") {
    let downloadURL = null
    if(file) {
      const imageRef = ref(storage, `images/${file?.name}`)
      await uploadBytes(imageRef, file as Blob)
      downloadURL = await getDownloadURL(imageRef)

    }
    console.log(name, description, type, price, manufacturingDate, expirationDate, ammount, downloadURL)
    fetch(`http://localhost:3000/product/${searchParams.get("id")}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },  
      body: JSON.stringify({
        name,
        description,
        type,
        price,
        manufacturing_date: manufacturingDate,
        expiration_date: expirationDate,
        ammount,
        image: downloadURL ? downloadURL : undefined
      })
    
    })
    .then((res) => {
      console.log(res)
      if (res.status != 200) {
        router.push("#")
        return
      }
      router.push("/products")
    })
    return
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do produto</Label>
              <Input id="name" name="name" value={name} required onChange={(e) => { setName(e.target.value.toString()) }}/>
            </div>
            <div>
              <Label htmlFor="description">Descricao</Label>
              <Textarea id="description" name="description" value={description} required onChange={(e) => { setDescription(e.target.value.toString()) }}/>
            </div>
            <div>
              <Label htmlFor="manufacturingDate">Data de fabricacao</Label>
              <Input id="manufacturingDate" name="manufacturingDate" type="date" value={ manufacturingDate } required onChange={(e) => { setManufacturingDate(e.target.value.toString()) }}/>
            </div>
            <div>
              <Label htmlFor="expirationDate">Data de validade</Label>
              <Input id="expirationDate" name="expirationDate" type="date" value={expirationDate} onChange={(e) => { setExpirationDate(e.target.value.toString()) }}/>
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Input id="type" name="type" required value={type} onChange={(e) => { setType(e.target.value) }}/>
            </div>
            <div>
              <Label htmlFor="amount">Quantidade</Label>
              <Input id="amount" name="amount" type="number" min={0} value={ammount} required onChange={(e) => { setAmount(parseInt(e.target.value)) }}/>
            </div>
            <div>
              <Label htmlFor="price">Valor</Label>
              <Input id="price" name="price" type="number" step={"any"} min={0} value={price} required onChange={(e) => { setPrice(parseInt(e.target.value)) }}/>
            </div>
            <div>
              <Label htmlFor="image">Imagem do produto</Label>
              <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange}  required={ action=="add" ? true: false } />
            </div>
            <Button id='submitProduct' onClick={(e) => {e.preventDefault(); handleSubmit()}} type="submit">{action == "add" ? "Adicionar Produto" : "Editar Produto"}</Button>
            {action == "edit" && <Button className='m-5' onClick={handleDelete}>Deletar</Button>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}