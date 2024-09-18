'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LogIn, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"


export function LoginPageComponent() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }
    )})
    const data = await result.json()
    localStorage.setItem("token", data.token)
    router.push("/home")
  }

  const handleGoogleLogin = () => {
    console.log("Google login clicked")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Choose your login method</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <Button type="submit" className="w-full">
              <User className="mr-2 h-4 w-4" />
              Login with Email
            </Button>
          </form>
          <Button variant="outline" className="w-full mt-3" onClick={handleGoogleLogin}>
            <LogIn className="mr-2 h-4 w-4" />
            Login with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}