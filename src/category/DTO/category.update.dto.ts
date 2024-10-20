import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDTO } from "./category.create.dto";

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) { }