import { AddProductComponent } from "@/components/add-product";
import { Header } from "@/components/header";
import { ProductSellingPageComponent } from "@/components/product-selling-page";

export default function Sales() {
  return (
    <>
      <Header defaultTab="add-product"/>
      <ProductSellingPageComponent/>
    </>
  )
}
