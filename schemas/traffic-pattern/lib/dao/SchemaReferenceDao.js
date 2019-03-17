"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const generated_1 = require("../generated/generated");
const InjectionTokens_1 = require("../InjectionTokens");
let SchemaReferenceDao = class SchemaReferenceDao extends generated_1.BaseSchemaReferenceDao {
    findAllForSchemaVersions(schemaVersionIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let sr;
            return yield this.db.find.tree({
                select: {},
                from: [
                    sr = generated_1.Q.SchemaReference
                ],
                where: sr.ownSchemaVersion.id.in(schemaVersionIds)
            });
        });
    }
};
SchemaReferenceDao = __decorate([
    typedi_1.Service(InjectionTokens_1.SCHEMA_REFERENCE_DAO)
], SchemaReferenceDao);
exports.SchemaReferenceDao = SchemaReferenceDao;
//# sourceMappingURL=SchemaReferenceDao.js.map