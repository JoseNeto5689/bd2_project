import { AddProductComponent } from "@/components/add-product";
import { ClientManagementComponent } from "@/components/client-management";
import { Header } from "@/components/header";

export default function AddProduct() {
  return (
    <>
      <Header defaultTab="users"/>
      <ClientManagementComponent/>
    </>
  )
}
