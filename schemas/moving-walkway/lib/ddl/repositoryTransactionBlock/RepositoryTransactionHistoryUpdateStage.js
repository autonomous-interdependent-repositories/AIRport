var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, Table } from '@airport/air-control';
let RepositoryTransactionHistoryUpdateStage = class RepositoryTransactionHistoryUpdateStage {
};
__decorate([
    Id(),
    Column({ name: "REPOSITORY_TRANSACTION_HISTORY_ID" }),
    DbNumber()
], RepositoryTransactionHistoryUpdateStage.prototype, "repositoryTransactionHistoryId", void 0);
__decorate([
    Column({ name: "BLOCK_ID" }),
    DbNumber()
], RepositoryTransactionHistoryUpdateStage.prototype, "blockId", void 0);
RepositoryTransactionHistoryUpdateStage = __decorate([
    Entity(),
    Table({ name: "REPOSITORY_TRANSACTION_HISTORY_UPDATE_STAGE" })
], RepositoryTransactionHistoryUpdateStage);
export { RepositoryTransactionHistoryUpdateStage };
//# sourceMappingURL=RepositoryTransactionHistoryUpdateStage.js.map