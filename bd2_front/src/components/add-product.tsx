"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { storage } from '@/services/firebase'
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage'

export function AddProductComponent() {
  const [file, setFile] = useState<File | undefined | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const imageRef = ref(storage, `images/${file?.name}`)
    uploadBytes(imageRef, file as Blob).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef)
      console.log('File uploaded successfully: ', downloadURL)
    }
  )
    
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" required />
            </div>
            <div>
              <Label htmlFor="manufacturingDate">Manufacturing Date</Label>
              <Input id="manufacturingDate" name="manufacturingDate" type="date" required />
            </div>
            <div>
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input id="expirationDate" name="expirationDate" type="date" required />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" type="number" min="0" required />
            </div>
            <div>
              <Label htmlFor="image">Product Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} required />
            </div>
            <Button type="submit">Add Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}