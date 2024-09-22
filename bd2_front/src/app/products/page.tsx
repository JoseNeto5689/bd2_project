"use client";
import { Header } from "@/components/header";
import { MarketStorageFrontPageComponent } from "@/components/market-storage-front-page";
import { verifyToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getToken } from "@/utils/token";


export default function Home() {
  return (
    <>
      <Header defaultTab="products"/>
      <MarketStorageFrontPageComponent/>
    </>
  )
}
