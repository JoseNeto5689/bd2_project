import { Request, Response } from "express"
import { FindByIdProductUseCase } from "./findByIdImageUseCase"
import path from 'path'

export class FindByIdProductImageController{
    
    constructor(
        private findByIdProductUseCase: FindByIdProductUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        const { id } = request.params
        if (await this.findByIdProductUseCase.execute(id)){
            return response.sendFile(id + ".png", {root: path.join(__dirname + "/files")})
        }
        return response.json({ message: "This product does not exist or have an image"})
        
    }
}