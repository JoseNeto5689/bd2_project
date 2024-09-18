'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  location: { lat: number; lng: number }
  setLocation: (location: { lat: number; lng: number }) => void
}

function Map({ location, setLocation }: MapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([location.lat, location.lng], 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current)

        markerRef.current = L.marker([location.lat, location.lng], {
          draggable: true
        }).addTo(mapRef.current)

        markerRef.current.on('dragend', () => {
          const newPos = markerRef.current?.getLatLng()
          if (newPos) {
            location = ({ lat: newPos.lat, lng: newPos.lng })
          }
        })

        mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
          markerRef.current?.setLatLng(e.latlng)
          location = ({ lat: e.latlng.lat, lng: e.latlng.lng })
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

export function ClientRegistrationComponent() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contacts, setContacts] = useState('')
  const [identifierType, setIdentifierType] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 }) // Default to London

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email, contacts, identifierType, identifier, location })
    // Here you would typically send this data to your backend
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Client Registration</CardTitle>
          <CardDescription>Register a new client in the system</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
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
              <Label htmlFor="contacts">Contacts</Label>
              <Input 
                id="contacts" 
                value={contacts} 
                onChange={(e) => setContacts(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="identifierType">Identifier Type</Label>
              <Select onValueChange={setIdentifierType} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select identifier type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="cnpj">CNPJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="identifier">Identifier</Label>
              <Input 
                id="identifier" 
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
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
            <Button type="submit" className="w-full">Register Client</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}