import { Request, Response } from "express"
import { UpdateProductUseCase } from "./updateProductUseCase"
import { UpdateProductDTO } from "./updateProductDTO"
import { z } from "zod"
import { generateMessageArray } from "../../utils/zodError"
import { redisClient } from "../../database/redis"

export class UpdateProductController{
    
    constructor(
        private updateProductUseCase: UpdateProductUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            UpdateProductDTO.parse(request.body)
            const data:z.infer<typeof UpdateProductDTO> = request.body
            const supplier_id = request.body.userId
            const { id } = request.params
            const result = await this.updateProductUseCase.execute({
                ...data
            }, id, supplier_id)

            await redisClient.del("products_" + supplier_id)

            return response.status(200).json({
                name: result.name,
                description: result.description,
                price: result.price,
                manufacturing_date: result.manufacturing_date,
                expiration_date: result.expiration_date,
                ammount: result.ammount,
                type: result.type
            })
        }
        catch(err:any){
            if(err.issues) {
                const message = generateMessageArray(err)
                return response.status(400).json({errors: message}) 
            }
            return response.status(400).json({error: err.message})
        }
    }
}