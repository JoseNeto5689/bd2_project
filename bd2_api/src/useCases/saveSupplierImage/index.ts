import { SupplierRepository } from "../../repositories/implementations/SupplierRepository";
import { SaveImageController } from "./saveSupplierController";
import { SaveImageUseCase } from "./saveSupplierUseCase";
import sequelize from "../../database/index"

const supplierRepository = new SupplierRepository(sequelize)
const saveImageSupplier = new SaveImageUseCase(supplierRepository)
const saveImageController = new SaveImageController(saveImageSupplier)

export {saveImageController}