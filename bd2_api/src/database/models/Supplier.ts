import { Schema } from "mongoose"
import mongoose from "mongoose"

const SupplierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    google_id: {
        type: String,
        required: false
    },

    geolocalization: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const Supplier = mongoose.model("Supplier", SupplierSchema)
export default Supplier