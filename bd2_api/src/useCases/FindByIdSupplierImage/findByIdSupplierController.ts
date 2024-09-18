import { Request, Response } from "express"
import { FindByIdSupplierUseCase } from "./findByIdSupplierUseCase"
import  path  from "path"

export class FindByIdSupplierImageController{
    
    constructor(
        private findByIdSupplierUseCase: FindByIdSupplierUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        const { id } = request.params
        if (await this.findByIdSupplierUseCase.execute(id)){
            return response.sendFile(id + ".png", {root: path.join(__dirname + "/files")})
        }
        return response.json({ message: "This supplier does not exist or have an image"})
        
    }
}