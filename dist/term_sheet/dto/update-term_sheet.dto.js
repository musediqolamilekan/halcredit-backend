"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTermSheetDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_term_sheet_dto_1 = require("./create-term_sheet.dto");
class UpdateTermSheetDto extends (0, mapped_types_1.PartialType)(create_term_sheet_dto_1.CreateTermSheetDto) {
}
exports.UpdateTermSheetDto = UpdateTermSheetDto;
//# sourceMappingURL=update-term_sheet.dto.js.map