import { IPersonRepository } from "../../repositories/IPersonRepository"


export class FindAllPersonsUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    async execute() {
        const persons = await this.personRepository.findAll()
        return persons
    }
}