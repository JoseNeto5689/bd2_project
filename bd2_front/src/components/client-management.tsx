'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { getToken, verifyToken } from '@/utils/token'
import { useRouter } from 'next/navigation'

type Client = {
  _id: number
  name: string
  email: string
  contact: string
}

export function ClientManagementComponent() {
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const token = getToken()
  const router = useRouter()

  useEffect(() => {
    verifyToken(token as string, router)
    fetch("http://localhost:3000/person", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((data) => {setClients([...data]); console.log(data)})
    .catch((error) => console.error(error))
  },[])

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filtered = clients.filter(client => 
      client.name.toLowerCase().includes(lowercasedFilter) ||
      client.email.toLowerCase().includes(lowercasedFilter) ||
      client.contact.toLowerCase().includes(lowercasedFilter)
    )
    setFilteredClients(filtered)
  }, [searchTerm, clients])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de clientes</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => { router.push("/users/manage-user") }}>Adicionar Clientes</Button>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Procure clientes"
            className="pl-8 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Opcoes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (
            <TableRow key={client._id}>
              <TableCell>{client._id}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.contact}</TableCell>
              <TableCell>
                <Button onClick={() => { router.push("/users/manage-user?id=" + client._id) }} variant="outline">Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredClients.length === 0 && (
        <div className="text-center py-4 text-gray-500">0 clientes achados</div>
      )}
    </div>
  )
}