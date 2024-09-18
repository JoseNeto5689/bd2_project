import { Supply } from "../../types/Supply"
import { ISupplyRepository } from "../ISupplyRepository"
import SupplyModel from "../../database/models/Supply"

export class SupplyRepository implements ISupplyRepository {
    
    async findById(id: string): Promise<Supply | null> {
        const result: Supply | null = await SupplyModel.findOne({_id: id})
        return result
    }
    async findAll(): Promise<Supply[]> {
        const result = await SupplyModel.find()
        const supplies: Supply[] = []
        result.forEach((supply: any) => {
            supplies.push(supply)
        })
        return supplies
    }
    
    async save(supply: Supply): Promise<unknown> {
        const supplyCreated = await SupplyModel.create({...supply})

        return supplyCreated
    }

    async remove(id: string): Promise<void> {
        await SupplyModel.deleteOne({
            _id: id
        })
    }

    async update(supply: Supply, id: string): Promise<unknown> {
        const supplyUpdated = await SupplyModel.findOneAndUpdate({_id: id})

        return supplyUpdated
    }

}