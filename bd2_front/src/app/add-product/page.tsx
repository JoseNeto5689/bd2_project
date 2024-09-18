import { AddProductComponent } from "@/components/add-product";
import { Header } from "@/components/header";

export default function AddProduct() {
  return (
    <>
      <Header defaultTab="add-product"/>
      <AddProductComponent/>
    </>
  )
}
