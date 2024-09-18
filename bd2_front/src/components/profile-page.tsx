'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Custom hook for form state management
const useFormState = (initialState: any) => {
  const [state, setState] = useState(initialState)
  const handleChange = (e:any) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  return [state, handleChange, setState]
}

export function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, handleChange, setUser] = useFormState({
    name: "John Doe",
    email: "john@example.com",
    location: "New York, USA"
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setIsOpen(false)
    // Here you would typically send the updated data to your backend
    console.log("Updated user data:", user)
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <div>{user.name}</div>
          </div>
          <div>
            <Label>Email</Label>
            <div>{user.email}</div>
          </div>
          <div>
            <Label>Location</Label>
            <div>{user.location}</div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>Update Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={user.location}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}