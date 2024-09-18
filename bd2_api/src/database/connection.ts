import mongoose from "mongoose"

async function databaseInit(connectionUrl: string) {

    await mongoose.connect(connectionUrl, {
        authSource: "admin",
    })
}

export default databaseInit