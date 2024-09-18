import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { FindAllProductsUseCase } from "./findAllProductsUsecase"
import { FindSupplierProductsController } from "./findAllProductsController"
import sequelize from "../../database/index"

const productRepository = new ProductRepository(sequelize)
const findSupplierProductsUseCase = new FindAllProductsUseCase(productRepository)
const findSupplierProductsController = new FindSupplierProductsController(findSupplierProductsUseCase)

export { findSupplierProductsController, findSupplierProductsUseCase }