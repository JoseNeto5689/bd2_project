'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, User } from "lucide-react"

export function SignUpPageComponent() {
  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email sign-up logic here
    console.log("Email sign-up submitted")
  }

  const handleGoogleSignUp = () => {
    // Handle Google sign-up logic here
    console.log("Google sign-up clicked")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              <User className="mr-2 h-4 w-4" />
              Sign Up with Email
            </Button>
          </form>
          
          <Button variant="outline" className="w-full mt-4" onClick={handleGoogleSignUp}>
            <LogIn className="mr-2 h-4 w-4" />
            Sign Up with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account? <a href="#" className="text-blue-500 hover:underline">Log in</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}