import mongoose from "mongoose"
import { Schema } from "mongoose"

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    register: {
        type: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    address: {
        type: {
            type: String,
            enum: ["Point"],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        }
    },
    contact: {
        type: [String],
        required: false
    }
}, {
    timestamps: true
})

const Person = mongoose.model("Person", PersonSchema)

export default Person