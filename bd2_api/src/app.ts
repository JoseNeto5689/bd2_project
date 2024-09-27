import databaseInit from "./database"
import app from "./config"
import dotenv from "dotenv"
import Person from "./database/models/Person"
import Product from "./database/models/Product"
import Supplier from "./database/models/Supplier"
import Supply from "./database/models/Supply"

dotenv.config()
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000



try {
    await databaseInit()
    Person.deleteMany()
    Product.deleteMany()
    Supplier.deleteMany()
    Supply.deleteMany()
    app.listen(port, () => {
        console.table({
            status: "Working",
            port: port,
            URL: `http://localhost:${port}`
        })
    })
} catch (error) {
    console.error("Unable to connect to the database:", error)
}

