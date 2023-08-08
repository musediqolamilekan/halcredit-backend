"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMailinglistDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_mailinglist_dto_1 = require("./create-mailinglist.dto");
class UpdateMailinglistDto extends (0, mapped_types_1.PartialType)(create_mailinglist_dto_1.CreateMailinglistDto) {
}
exports.UpdateMailinglistDto = UpdateMailinglistDto;
//# sourceMappingURL=update-mailinglist.dto.js.map