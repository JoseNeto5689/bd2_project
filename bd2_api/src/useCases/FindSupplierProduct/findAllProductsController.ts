import { Request, Response } from "express"
import { FindAllProductsUseCase } from "./findAllProductsUsecase"
import { redisClient } from "../../database/redis"

export class FindSupplierProductsController{

    constructor(
        private findAllProductsUseCase: FindAllProductsUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const supplier_id = request.body.userId

        if(await redisClient.exists("products_" + supplier_id)){

            const productsRedis = await redisClient.get("products_" + supplier_id)
            return reponse.json(JSON.parse(productsRedis as string))

        }

        const products = await this.findAllProductsUseCase.execute(supplier_id)
        await redisClient.set("products_" + supplier_id, JSON.stringify(products))

        return reponse.json(products)

    }
}