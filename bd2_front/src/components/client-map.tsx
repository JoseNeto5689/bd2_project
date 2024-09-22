'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { getToken, verifyToken } from '@/utils/token'
import { useRouter } from 'next/navigation'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

interface Client {
  id: number
  name: string
  location: [number, number] // [latitude, longitude]
}

export function ClientMapComponent() {
  let [clients, setClients] = useState<Client[]>([])
  const token = getToken()
  const router = useRouter()

  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09])
  const [mapZoom, setMapZoom] = useState(13)

  useEffect(() => {
    verifyToken(token as string, router)
    fetch("http://localhost:3000/person", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      let clients: Client[] = []
      data.forEach((client: any) => {
        console.log(client)
        clients.push({ id: client._id, name: client.name, location: client.address.coordinates })
      })
      const latSum = clients.reduce((sum, client) => sum + client.location[0], 0)
      const lngSum = clients.reduce((sum, client) => sum + client.location[1], 0)
      const centerLat = latSum / clients.length
      const centerLng = lngSum / clients.length
      console.log(clients)
      setClients([...clients])
      setMapCenter([centerLat, centerLng])
    })
    
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {clients.map((client) => (
            <Marker key={client.id} position={client.location}>
              <Popup>
                <div>
                  <h3 className="font-bold">{client.name}</h3>
                  <p>Lat: {client.location[0]}, Lng: {client.location[1]}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}