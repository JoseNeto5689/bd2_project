import { z } from "zod"

export const UpdatePersonDTO = z.object({
    name: z.string({
        invalid_type_error: "Name must be a string",
    }).optional(),
    address: z.object({type: z.string(), coordinates: z.array(z.number()), crs: z.any().optional() }).optional(),
    type: z.string({
        invalid_type_error: "Type must be a string",
    }).optional(),
    contact: z.array(z.string()).optional()
})