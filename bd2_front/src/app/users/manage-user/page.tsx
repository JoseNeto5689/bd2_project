import { AddProductComponent } from "@/components/add-product";
import { ClientManagementComponent } from "@/components/client-management";
import { ClientRegistrationComponent } from "@/components/client-registration";
import { Header } from "@/components/header";

export default function AddProduct() {
  return (
    <>
      <Header defaultTab="users"/>
      <ClientRegistrationComponent/>
    </>
  )
}
