'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
    router.push("/products")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Realize aqui o seu Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <Button id="button-login" type="submit" className="w-full">
              <User className="mr-2 h-4 w-4" />
              Login com Email
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Nao possui uma conta? <a href="/signup" className="text-blue-500 hover:underline">Crie uma</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}