"use client";
import { Header } from "@/components/header";
import { MarketStorageFrontPageComponent } from "@/components/market-storage-front-page";
import { verifyToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getToken } from "@/utils/token";


export default function Home() {
  const router = useRouter()
  const token = getToken()

  const [products, setProducts] = useState([])

  useEffect(() => {
    verifyToken(token as string, router)
    fetch("http://localhost:3000/own-products", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((data) => {setProducts([...data]); console.log(products)})
    .catch((error) => console.error(error))

  },[])

  
  return (
    <>
      <Header defaultTab="home"/>
      <MarketStorageFrontPageComponent/>
    </>
  )
}
