import { Header } from "@/components/header";
import { PurchaseManagementComponent } from "@/components/purchase-management";

export default function Sales() {
  return (
    <>
      <Header defaultTab="add-product"/>
      <PurchaseManagementComponent/>
    </>
  )
}
