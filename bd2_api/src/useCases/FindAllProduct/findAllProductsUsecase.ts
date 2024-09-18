import { IProductRepository } from "../../repositories/IProductRepository"


export class FindAllProductsUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute() {
        const products = await this.productRepository.findAll()
        return products
    }
}