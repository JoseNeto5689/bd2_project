import { SupplyRepository } from "../../repositories/implementations/SupplyRepository"
import { FindByIdSupplyController } from "./findByIdSupplierController"
import { FindByIdSupplyUseCase } from "./findByIdSupplierUseCase"
import sequelize from "../../database/index"

const supplyRepository = new SupplyRepository(sequelize)

const findByIdSupplyUseCase = new FindByIdSupplyUseCase(supplyRepository)

const findByIdSupplyController = new FindByIdSupplyController(findByIdSupplyUseCase)

export { findByIdSupplyController, findByIdSupplyUseCase }