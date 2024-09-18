import { Supplier } from "../../types/Supplier"
import { ISupplierRepository } from "../ISupplierRepository"
import SupplierModel from "../../database/models/Supplier"

export class SupplierRepository implements ISupplierRepository {

    async findByEmail(email: string): Promise<Supplier | null> {
        const result: Supplier | null = await SupplierModel.findOne({email})

        return result
    }

    async findById(id: string): Promise<Supplier | null> {
        const result: Supplier | null = await SupplierModel.findOne({_id: id})
        return result
    }
    
    async findAll(): Promise<Supplier[]> {
        const result = await SupplierModel.find()
        const suppliers: Supplier[] = []
        result.forEach((supplier: any) => {
            suppliers.push(supplier)
        })
        return suppliers
    }

    async save(supplier: Supplier): Promise<unknown> {
        const supplierCreated = await SupplierModel.create({...supplier})

        return supplierCreated
    }

    async remove(id: string): Promise<void> {
        await SupplierModel.deleteOne({
            _id: id
        })
    }

    async update(supplier: Supplier, id: string): Promise<unknown> {
        
        const supplierUpdated = await SupplierModel.findOneAndUpdate({_id: id}, supplier)
        return supplierUpdated
    }

}