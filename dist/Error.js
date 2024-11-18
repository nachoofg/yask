"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheError extends Error {
    constructor(id, additionalInfo = '') {
        super();
        this.message = `YASK-${id} ${additionalInfo}`;
    }
}
exports.default = CacheError;
//# sourceMappingURL=Error.js.map