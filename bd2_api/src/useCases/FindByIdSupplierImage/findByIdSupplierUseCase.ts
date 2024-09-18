import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import fs from "fs"


export class FindByIdSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(id: string) {
        const supplier = await this.supplierRepository.findById(id)
        if(supplier?.image){
            fs.writeFileSync(__dirname + "/files/" +  id + ".png", supplier.image, {encoding: "base64"})
            return true
        }
        return false
    }
}