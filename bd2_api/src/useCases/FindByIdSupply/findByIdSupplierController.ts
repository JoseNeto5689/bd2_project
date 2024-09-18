import { Request, Response } from "express"
import { Supply } from "../../types/Supply"
import { FindByIdSupplyUseCase } from "./findByIdSupplierUseCase"

export class FindByIdSupplyController{
    
    constructor(
        private findByIdSupplyUseCase: FindByIdSupplyUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const { id } = request.params
        const person: Supply | null = await this.findByIdSupplyUseCase.execute(id)
        return reponse.json(person)
        
    }
}