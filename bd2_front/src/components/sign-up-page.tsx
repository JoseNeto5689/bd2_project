'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"


export function SignUpPageComponent() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const handleEmailSignUp = (e: React.FormEvent) => {
    if(password !== confirmPassword) {
      alert("As senhas não coincidem")
      return
    }
    e.preventDefault()
    fetch("http://localhost:3000/supplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    .then((res) => {
      if(res.status !== 201) {
        alert("Erro ao cadastrar")
        return
      }
      router.push("/")
     })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Cadastro</CardTitle>
          <CardDescription className="text-center">Crie uma conta na Storage.io</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" required  onChange={(e) => {setName(e.target.value)}}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirme a senha</Label>
              <Input id="confirm-password" type="password" required onChange={(e) => {setConfirmPassword(e.target.value)}}/>
            </div>
            <Button type="submit" className="w-full">
              <User className="mr-2 h-4 w-4" />
              Cadastrar-se com email
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
           Ja possui uma conta? <a href="/" className="text-blue-500 hover:underline">Realize o login</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}