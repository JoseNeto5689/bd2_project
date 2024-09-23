import { Request, Response } from "express"
import { DeleteProductUseCase } from "./deleteProductUseCase"
import { redisClient } from "../../database/redis"

export class DeleteProductController{
    
    constructor(
        private deleteProductUseCase: DeleteProductUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const { id } = request.params
        const supplier_id = request.body.userId

        await redisClient.del("products_" + id)

        await this.deleteProductUseCase.execute(id, supplier_id)
        return reponse.status(200).json("ok")
        
    }
}