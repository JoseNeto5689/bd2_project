import { Request, Response } from "express"
import { FindAllProductsUseCase } from "./findAllProductsUsecase"

export class FindAllProductsController{

    constructor(
        private findAllProductsUseCase: FindAllProductsUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const products = await this.findAllProductsUseCase.execute()
        return reponse.json(products)

    }
}