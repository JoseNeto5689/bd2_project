import { ProductRepository } from "../../repositories/implementations/ProductRepository" 
import { CreateProductController } from "./updateProductController" 
import { UpdateProductUseCase } from "./updateProductUseCase" 
import sequelize from "../../database/index"

const productRepository = new ProductRepository(sequelize)

const updateProductUseCase = new UpdateProductUseCase(productRepository)

const updateProductController = new CreateProductController(updateProductUseCase)

export { updateProductUseCase, updateProductController }