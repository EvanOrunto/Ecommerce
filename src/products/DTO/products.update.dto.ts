import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDTO } from "./products.create.dto";

export class UpdateProductDTO extends PartialType(CreateProductDTO) { }