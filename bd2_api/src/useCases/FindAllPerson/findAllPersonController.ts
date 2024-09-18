import { Request, Response } from "express"
import { FindAllPersonsUseCase } from "./findAllPersonUseCase"
import { Person } from "../../types/Person"

export class FindAllPersonController{
    
    constructor(
        private findAllPersonUseCase: FindAllPersonsUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const persons: Person[] = await this.findAllPersonUseCase.execute()
        return reponse.json(persons)
    }
}