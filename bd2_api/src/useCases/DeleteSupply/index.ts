import { SupplyRepository } from '../../repositories/implementations/SupplyRepository'
import { DeleteSupplyController } from './deleteSupplyController'
import { DeleteSupplyUseCase } from './deleteSupplyUseCase'
import sequelize from "../../database/index"

const supplyRepository = new SupplyRepository(sequelize)
const deleteSupplyUseCase = new DeleteSupplyUseCase(supplyRepository)
const deleteSupplyController = new DeleteSupplyController(deleteSupplyUseCase)

export { deleteSupplyController, deleteSupplyUseCase }