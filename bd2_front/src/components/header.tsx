'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, LogOut } from 'lucide-react'

export function Header({defaultTab}: {defaultTab: string}) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Logo</h1>
        <Tabs defaultValue={"/" + defaultTab} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="products">
              <Link href="/home">Products</Link>
            </TabsTrigger>
            <TabsTrigger value="/dashboard">
              <Link href="/dashboard">Dashboard</Link>
            </TabsTrigger>
            <TabsTrigger value="/maps">
              <Link href="/maps">Maps</Link>
            </TabsTrigger>
            <TabsTrigger value="/users">
              <Link href="/users">User</Link>
            </TabsTrigger>
            <TabsTrigger value="/sale">
              <Link href="/sale">Sales</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-[200px] lg:w-[300px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">shadcn</p>
                <p className="text-xs leading-none text-muted-foreground">m@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile" className="flex w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings" className="flex w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button className="flex w-full items-center" onClick={() => console.log('Sign out')}>
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