import { IProductRepository } from "../../repositories/IProductRepository"
import fs from "fs"


export class FindByIdProductUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(id: string) {
        const product = await this.productRepository.findById(id)
        if(product?.image){
            fs.writeFileSync(__dirname + "/files/" +  id + ".png", product.image, {encoding: "base64"})
            return true
        }
        return false
    }
}