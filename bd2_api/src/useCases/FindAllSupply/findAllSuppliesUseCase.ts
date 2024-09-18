import { ISupplyRepository } from "../../repositories/ISupplyRepository"


export class FindAllSuppliesUseCase {

    constructor(
        private supplyRepository: ISupplyRepository
    ) {}

    async execute() {
        const supplies = await this.supplyRepository.findAll()
        return supplies
    }
}