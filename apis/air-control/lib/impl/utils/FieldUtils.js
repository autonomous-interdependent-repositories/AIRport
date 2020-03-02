"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
class FieldUtils {
    getFieldQueryJson(fieldSubQuery, entityAliases, queryUtils) {
        if (!this.FieldQuery) {
            this.FieldQuery = require('../query/facade/FieldQuery').FieldQuery;
        }
        let subSelectQuery = new this.FieldQuery(fieldSubQuery, entityAliases);
        return subSelectQuery.toJSON(queryUtils, this);
    }
}
exports.FieldUtils = FieldUtils;
di_1.DI.set(tokens_1.FIELD_UTILS, FieldUtils);
//# sourceMappingURL=FieldUtils.js.map