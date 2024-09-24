'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LeafIcon, MapPin } from "lucide-react"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { getToken, verifyToken } from '@/utils/token'

interface MapProps {
  location: { lat: number; lng: number }
  setLocation: (location: { lat: number; lng: number }) => void
}

const markerRef: any = {}

let icon = L.icon({ //add this new icon
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});

function Map({ location, setLocation }: MapProps) {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([location.lat, location.lng], 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current)

        markerRef.current = L.marker([location.lat, location.lng], {
          draggable: true,
          icon
        }).addTo(mapRef.current)

        markerRef.current.on('dragend', () => {
          const newPos = markerRef.current?.getLatLng()
          if (newPos) {
            position = ({ lat: newPos.lat, lng: newPos.lng })
          }
        })

        mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
          markerRef.current?.setLatLng(e.latlng)
          position = ({ lat: e.latlng.lat, lng: e.latlng.lng })
        })
      }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [location.lat, location.lng, setLocation])

  return <div id="map" style={{ height: '100%', width: '100%' }} />
}

let position: any = null

export function ClientRegistrationComponent() {
  const token = getToken()
  const router = useRouter()
  const searchParams = useSearchParams()

  const action: "add" | "edit" = searchParams.get("id") ? "edit" : "add"

  verifyToken(token as string, router)

  useEffect(() => {
    if ( action == "edit") {
      fetch(`http://localhost:3000/person/${searchParams.get("id")}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setName(data.name)
        setEmail(data.email)
        setContact(data.contact)
        setIdentifierType(data.register.type)
        setIdentifier(data.register.value)
        markerRef.current?.setLatLng({ lat: data.address.coordinates[1], lng: data.address.coordinates[0]})
      })
    }
  }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [identifierType, setIdentifierType] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [location, setLocation] = useState({ lat: 51.515579783755925, lng: -0.09398460388183595 }) // Default to London

  function handleDelete(){
    fetch(`http://localhost:3000/person/${searchParams.get("id")}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      if (res.status != 200) {
        alert("Erro ao deletar")
        return
      }
      router.push("/users")
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(name, email, contact, identifierType, identifier, position)
    if(action == "add") {
    fetch('http://localhost:3000/person', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify({
        name,
        email,
        contact,
        register: {
          type: identifierType,
          value: identifier
        },
        address: {
          type: 'Point',
          coordinates: [position.lng, position.lat]
        }

      })

    })
    .then((res) => {
      if (res.status != 201) {
        alert("Erro ao adicionar")
        return
      }
      router.push("/users")
    })
  }
    if(action == "edit") {
      fetch(`http://localhost:3000/person/${searchParams.get("id")}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          contact,
          register: {
            type: identifierType,
            value: identifier
          },
          address: {
            type: 'Point',
            coordinates: [position.lng, position.lat]
          }
        })
      })
      .then((res) => {
        if (res.status != 200) {
          alert("Erro ao editar")
          return
        }
        router.push("/users")
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Registrar cliente</CardTitle>
          <CardDescription>Registre um novo cliente</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contacts">Contatos</Label>
              <Input 
                id="contacts" 
                value={contact} 
                onChange={(e) => setContact(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="identifierType">Tipos de Identificador</Label>
              <Select onValueChange={setIdentifierType} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um tipo de identificador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="cnpj">CNPJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="identifier">Identificador</Label>
              <Input 
                id="identifier" 
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>Localizacao</Label>
              <div className="h-[300px] w-full rounded-md overflow-hidden">
                <Map location={location} setLocation={setLocation} />
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Registrar Cliente</Button>
            {action == "edit" && <Button onClick={handleDelete} className="w-full ml-5">Deletar Cliente</Button>}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}