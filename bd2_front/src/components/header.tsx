'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteToken } from '@/utils/token'

export function Header({defaultTab}: {defaultTab: string}) {

  const router = useRouter()

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Storage.IO</h1>
        <Tabs defaultValue={"/" + defaultTab} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="products">
              <Link href="/products">Produtos</Link>
            </TabsTrigger>
            <TabsTrigger value="/dashboard">
              <Link href="/dashboard">Mapa</Link>
            </TabsTrigger>
            <TabsTrigger value="/users">
              <Link href="/users">Clientes</Link>
            </TabsTrigger>
            <TabsTrigger value="/sale">
              <Link href="/sale">Vendas</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fbr%2Fsearch%3Fk%3Ddefault%2Bavatar&psig=AOvVaw2gY4yprtLFFxFUTkH-9Qow&ust=1727090211001000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJD43sW21ogDFQAAAAAdAAAAABAE" alt="@shadcn" />
                <AvatarFallback>I</AvatarFallback>
              </Avatar>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <button className="flex w-full items-center" onClick={() => { deleteToken();router.push("/") }}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}