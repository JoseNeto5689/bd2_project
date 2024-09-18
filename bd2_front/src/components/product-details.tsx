'use client'

import Image from "next/image"
import { CalendarIcon, Edit, Package, DollarSign, Hash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProductDetailsComponent() {
  // This would typically come from a database or API
  const product = {
    name: "Super Gadget 3000",
    description: "The latest in gadget technology, perfect for all your gadgeting needs. Features include AI-powered assistance, holographic display, and quantum computing capabilities.",
    manufacturingDate: "2023-05-15",
    expirationDate: "2025-05-15",
    batch: "SG3K-2023-05-15-001",
    type: "Electronics",
    image: "/placeholder.svg",
    amount: 599.99,
    quantity: 50
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
              <Badge variant="secondary" className="mt-1">{product.type}</Badge>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-green-600" />
              <span className="text-3xl font-bold text-green-600">{product.amount.toFixed(2)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <p className="text-muted-foreground">{product.description}</p>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Manufacturing Date</span>
                </div>
                <span>{product.manufacturingDate}</span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Expiration Date</span>
                </div>
                <span>{product.expirationDate}</span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>Batch</span>
                </div>
                <span>{product.batch}</span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  <span>Quantity in Stock</span>
                </div>
                <span>{product.quantity}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-6">
          <Button className="w-full">
            <Edit className="mr-2 h-4 w-4" /> Edit Product
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}