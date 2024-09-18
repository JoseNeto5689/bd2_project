import { IProductRepository } from "../../repositories/IProductRepository"


export class FindByIdProductUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(id: string) {
        const person = await this.productRepository.findById(id)
        return person
    }
}