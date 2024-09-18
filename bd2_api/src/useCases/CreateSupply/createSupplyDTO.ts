import { z } from "zod"

export const CreateSupplyDTO = z.object({
    products: z.array(z.object({product_id: z.string(), quantity: z.number()})),
    supplier_id: z.string({
        required_error: "Supplier is required",
        invalid_type_error: "Supplier must be a string",
    }),
    person_id: z.string({
        required_error: "Person is required",
        invalid_type_error: "Person must be a string",
    }),
})