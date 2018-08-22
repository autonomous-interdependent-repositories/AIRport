"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../InjectionTokens");
const SqlSchemaBuilder_1 = require("../SqlSchemaBuilder");
let SqLiteSchemaBuilder = class SqLiteSchemaBuilder extends SqlSchemaBuilder_1.SqlSchemaBuilder {
    constructor(schemaUtils, storeDriver) {
        super(schemaUtils, storeDriver);
    }
    async createSchema(jsonSchema) {
        // Nothing to do
    }
    getColumnSuffix(jsonSchema, jsonEntity, jsonColumn) {
        let primaryKeySuffix = '';
        if (this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
            primaryKeySuffix = ' NOT NULL';
        }
        let autoincrementSuffix = '';
        if (jsonColumn.isGenerated
            && jsonSchema.name === '@airport/airport-code'
            && jsonEntity.name === 'SEQUENCES') {
            autoincrementSuffix = ' AUTOINCREMENT';
        }
        const suffix = primaryKeySuffix + autoincrementSuffix;
        switch (jsonColumn.type) {
            case ground_control_1.SQLDataType.ANY:
                return suffix;
            case ground_control_1.SQLDataType.BOOLEAN:
                return `INTEGER ${suffix}`;
            case ground_control_1.SQLDataType.DATE:
                return `REAL ${suffix}`;
            case ground_control_1.SQLDataType.JSON:
                return `TEXT ${suffix}`;
            case ground_control_1.SQLDataType.NUMBER:
                if (suffix) {
                    return `INTEGER ${suffix}`;
                }
                return 'REAL';
            case ground_control_1.SQLDataType.STRING:
                return `TEXT ${suffix}`;
        }
    }
    getTableName(jsonSchema, jsonEntity) {
        return `${this.schemaUtils.getSchemaName(jsonSchema)}__${jsonEntity.name}`;
    }
    getCreateTableSuffix(jsonSchema, jsonEntity) {
        return ` WITHOUT ROWID`;
    }
    async buildSequences(jsonSchema, jsonEntity) {
    }
};
SqLiteSchemaBuilder = __decorate([
    typedi_1.Service(InjectionTokens_1.SchemaBuilderToken),
    __param(0, typedi_1.Inject(ground_control_1.SchemaUtilsToken)),
    __param(1, typedi_1.Inject(ground_control_1.StoreDriverToken)),
    __metadata("design:paramtypes", [Object, Object])
], SqLiteSchemaBuilder);
exports.SqLiteSchemaBuilder = SqLiteSchemaBuilder;
//# sourceMappingURL=SqLiteSchemaBuilder.js.map