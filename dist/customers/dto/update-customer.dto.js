"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const customer_dto_1 = require("./customer.dto");
class UpdateCustomerDto extends (0, mapped_types_1.PartialType)(customer_dto_1.CreateCustomerDto) {
}
exports.UpdateCustomerDto = UpdateCustomerDto;
//# sourceMappingURL=update-customer.dto.js.map