'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Define types for our data structure
type Product = {
  name: string
  quantity: number
}

type Supplier = {
  id: string
  name: string
  products: Product[]
}

// Sample data
const suppliers: Supplier[] = [
  {
    id: "S001",
    name: "John Doe",
    products: [
      { name: "Product A", quantity: 100 },
      { name: "Product B", quantity: 50 },
    ],
  },
  {
    id: "S002",
    name: "Jane Smith",
    products: [
      { name: "Product C", quantity: 75 },
      { name: "Product D", quantity: 120 },
      { name: "Product E", quantity: 30 },
    ],
  },
  {
    id: "S003",
    name: "Bob Johnson",
    products: [
      { name: "Product F", quantity: 200 },
    ],
  },
]

export function SupplierProductsTableComponent() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Supplier Products</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Supplier ID</TableHead>
            <TableHead>Person Name</TableHead>
            <TableHead>Products</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium">{supplier.id}</TableCell>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${supplier.id}`}>
                    <AccordionTrigger>
                      View Products ({supplier.products.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Quantity</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {supplier.products.map((product, index) => (
                            <TableRow key={index}>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}