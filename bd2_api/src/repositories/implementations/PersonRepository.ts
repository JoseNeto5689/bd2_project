import { Person } from "../../types/Person"
import { IPersonRepository } from "../IPersonRepository"
import PersonModel from "../../database/models/Person"
export class PersonRepository implements IPersonRepository {
    constructor(private sequelize: any) {}

    async findByName(name: string): Promise<Person | null> {
        const person = await PersonModel.findOne({
            name
        })

        return person as Person | null
    }

    async update(person: Person, id: string): Promise<unknown> {
        const personUpdated = await PersonModel.findOneAndUpdate({_id: id}, person)
        return personUpdated
    }


    async remove(id: string): Promise<void> {
        await PersonModel.deleteOne({
            _id: id
        })
    }

    async findById(id: string): Promise<Person | null> {
        const result: Person | null = await PersonModel.findOne({
            _id: id
        })
        return result
    }
    
    async save(person: Person): Promise<unknown> {
        const personCreated = await PersonModel.create(person)
        return personCreated
    }

    async findAll(): Promise<Person[]> {
        const result =  await PersonModel.find()
        const persons: Person[] = []
        result.forEach((person: any) => {
            persons.push(person)
        })
        return persons
    }


}