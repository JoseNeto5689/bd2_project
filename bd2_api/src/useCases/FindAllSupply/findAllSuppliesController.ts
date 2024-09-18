import { Request, Response } from "express"
import { FindAllSuppliesUseCase } from "./findAllSuppliesUseCase"

export class FindAllSuppliesController{

    constructor(
        private findAllSuppliesUseCase: FindAllSuppliesUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const supplies = await this.findAllSuppliesUseCase.execute()
        return reponse.json(supplies)

    }
}