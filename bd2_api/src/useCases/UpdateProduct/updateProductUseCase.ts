import { z } from "zod"
import { IProductRepository } from "../../repositories/IProductRepository" 
import { Product } from "../../types/Product" 
import { UpdateProductDTO } from "./updateProductDTO"

export class UpdateProductUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    
    async execute(data:z.infer<typeof UpdateProductDTO>, id: string, supplier_id: string) {
        const product = await this.productRepository.findById(id) as Product
        if (product.supplier_id !== supplier_id) throw new Error("You can't update a product that is not yours")
        const newProduct: Product = {
            barcode: product.barcode,
            name: data.name || product.name,
            description: data.description || product.description,
            price: data.price || product.price,
            batch: data.batch || product.batch,
            manufacturing_date: data.manufacturing_date || product.manufacturing_date,
            expiration_date: data.expiration_date || product.expiration_date,
            image: data.image || product.image,
            ammount: data.ammount || product.ammount,
            type: data.type || product.type,
            supplier_id: product.supplier_id
        }

        await this.productRepository.update(newProduct, id)

        return newProduct
    }
}