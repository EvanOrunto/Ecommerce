import { PartialType } from "@nestjs/mapped-types";
import { CartDTO } from "./cart.dto";

export class UpdateCartDTO extends PartialType(CartDTO) { }