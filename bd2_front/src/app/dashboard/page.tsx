import { Header } from "@/components/header";
import { MarketStorageFrontPageComponent } from "@/components/market-storage-front-page";



export default function Dashboard() {
  return (
    <>
      <Header defaultTab="dashboard"/>
      <>
        <iframe style={{ width: "100vw", height: "90vh", background: "#21313C", border: "none", borderRadius: "2px",boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}} src="https://charts.mongodb.com/charts-bd2-wcydfgf/embed/charts?id=7bd46b81-effa-4261-9a16-86dc5a9ba0c6&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe>
      </>
    </>
  )
}
