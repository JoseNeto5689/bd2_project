import { ProductRepository } from "../../repositories/implementations/ProductRepository";
import { SaveImageController } from "./saveProductController";
import { SaveImageUseCase } from "./saveProductUseCase";
import sequelize from "../../database/index"

const productRepository = new ProductRepository(sequelize)
const saveImageProduct = new SaveImageUseCase(productRepository)
const saveImageController = new SaveImageController(saveImageProduct)

export {saveImageController}