var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-traffic-control';
let ClientType = class ClientType {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'CLIENT_LID',
        referencedColumnName: 'CLIENT_LID'
    })
], ClientType.prototype, "client", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'TYPE_ID',
        referencedColumnName: 'TYPE_ID'
    })
], ClientType.prototype, "type", void 0);
ClientType = __decorate([
    Entity(),
    Table({
        name: 'CLIENT_TYPES'
    })
], ClientType);
export { ClientType };
//# sourceMappingURL=ClientType.js.map