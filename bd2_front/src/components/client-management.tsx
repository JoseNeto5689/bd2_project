'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

// Mock data for initial clients
const initialClients = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '098-765-4321' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '111-222-3333' },
]

type Client = {
  id: number
  name: string
  email: string
  phone: string
}

export function ClientManagementComponent() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [filteredClients, setFilteredClients] = useState<Client[]>(initialClients)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filtered = clients.filter(client => 
      client.name.toLowerCase().includes(lowercasedFilter) ||
      client.email.toLowerCase().includes(lowercasedFilter) ||
      client.phone.toLowerCase().includes(lowercasedFilter)
    )
    setFilteredClients(filtered)
  }, [searchTerm, clients])

  const handleEditClient = (client: Client) => {
    setCurrentClient(client)
    setIsModalOpen(true)
  }

  const handleAddClient = () => {
    setCurrentClient(null)
    setIsModalOpen(true)
  }

  const handleSaveClient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const updatedClient = {
      id: currentClient?.id || Date.now(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    }

    if (currentClient) {
      setClients(clients.map(c => c.id === currentClient.id ? updatedClient : c))
    } else {
      setClients([...clients, updatedClient])
    }

    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Client Management</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handleAddClient}>Add Client</Button>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search clients..."
            className="pl-8 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditClient(client)} variant="outline">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredClients.length === 0 && (
        <div className="text-center py-4 text-gray-500">No clients found</div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveClient}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={currentClient?.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentClient?.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={currentClient?.phone}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}