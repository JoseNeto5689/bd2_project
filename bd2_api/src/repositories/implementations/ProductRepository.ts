import ProductModel from "../../database/models/Product"
import { Product } from "../../types/Product"
import { IProductRepository } from "../IProductRepository"

export class ProductRepository implements IProductRepository {

    async findBySupplierId(supplier_id: string): Promise<Product[]> {
        const result = await ProductModel.find({
            supplier_id
        })
        const products: Product[] = []
        result.forEach((product: any) => {
            products.push(product)
        })
        return products
    }
    
    async findById(id: string): Promise<Product | null> {
        const result: Product | null = await ProductModel.findOne({_id: id})
        return result
    }

    async findAll(): Promise<Product[]> {
        const result = await ProductModel.find()
        const products: Product[] = []
        result.forEach((product: any) => {
            products.push(product)
        })
        return products
    }
    
    async save(product: Product): Promise<unknown> {
        
        const productCreated = await ProductModel.create({
            ...product
        })

        return productCreated
    }

    async remove(barcode: string): Promise<void> {
        await ProductModel.deleteOne({
            barcode
        })
    }

    async update(product: Product, barcode: string): Promise<unknown> {
        const productUpdated = await ProductModel.findOneAndUpdate({barcode}, product)

        return productUpdated
    }
}