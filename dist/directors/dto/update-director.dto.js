"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDirectorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_director_dto_1 = require("./create-director.dto");
class UpdateDirectorDto extends (0, mapped_types_1.PartialType)(create_director_dto_1.CreateDirectorDto) {
}
exports.UpdateDirectorDto = UpdateDirectorDto;
//# sourceMappingURL=update-director.dto.js.map