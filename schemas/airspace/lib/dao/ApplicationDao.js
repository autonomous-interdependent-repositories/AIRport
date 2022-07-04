var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ALL_FIELDS, and, max, tree, Y } from '@airport/air-traffic-control';
import { Injected } from '@airport/direction-indicator';
import { ensureChildJsMap } from '@airport/ground-control';
import { BaseApplicationDao, Q } from '../generated/generated';
let ApplicationDao = class ApplicationDao extends BaseApplicationDao {
    async findAllActive() {
        let s;
        return this.db.find.tree({
            select: {},
            from: [
                s = Q.Application
            ]
        });
    }
    async findAllWithJson() {
        let a;
        let av;
        // FIXME: this should be don through currentVersion - verify that it get's populated and switch
        let cv;
        return this.db.find.tree({
            select: {
                ...ALL_FIELDS,
                // currentVersion: {
                // 	applicationVersion: {
                // 		_localId: Y,
                // 		jsonApplication: Y
                // 	}
                // }
                versions: {
                    _localId: Y,
                    jsonApplication: Y
                }
            },
            from: [
                a = Q.Application,
                // cv = a.currentVersion.innerJoin(),
                // av = cv.applicationVersion.innerJoin()
                av = a.versions.innerJoin()
            ]
        });
    }
    async findMapByVersionIds(applicationVersionIds) {
        const applicationMapByIndex = new Map();
        let s, sv;
        const applications = await this.db.find.tree({
            select: {
                index: Y,
                domain: {
                    _localId: Y,
                    name: Y
                },
                name: Y,
                fullName: Y,
                versions: {
                    _localId: Y,
                    majorVersion: Y,
                    minorVersion: Y,
                    patchVersion: Y
                }
            },
            from: [
                s = Q.Application,
                sv = s.versions.innerJoin()
            ],
            where: sv._localId.in(applicationVersionIds)
        });
        for (const application of applications) {
            for (const applicationVersion of application.versions) {
                applicationMapByIndex.set(applicationVersion._localId, application);
            }
        }
        return applicationMapByIndex;
    }
    async findMaxIndex() {
        const s = Q.Application;
        return await this.airportDatabase.findOne.field({
            select: max(s.index),
            from: [
                s
            ]
        });
    }
    async findMaxVersionedMapByApplicationAndDomain_Names(applicationDomain_Names, applicationNames) {
        const maxVersionedMapByApplicationAndDomain_Names = new Map();
        let sv;
        let s;
        let d;
        let sMaV;
        let sMiV;
        const applicationLookupRecords = await this.airportDatabase.find.tree({
            from: [
                sMiV = tree({
                    from: [
                        sMaV = tree({
                            from: [
                                s = Q.Application,
                                sv = s.versions.innerJoin(),
                                d = s.domain.innerJoin()
                            ],
                            select: {
                                index: s.index,
                                domainId: d._localId,
                                domainName: d.name,
                                name: s.name,
                                majorVersion: max(sv.majorVersion),
                                minorVersion: sv.minorVersion,
                                patchVersion: sv.patchVersion,
                            },
                            where: and(d.name.in(applicationDomain_Names), s.name.in(applicationNames)),
                            groupBy: [
                                s.index,
                                d._localId,
                                d.name,
                                s.name,
                                sv.minorVersion,
                                sv.patchVersion,
                            ]
                        })
                    ],
                    select: {
                        index: sMaV.index,
                        domainId: sMaV.domainId,
                        domainName: sMaV.domainName,
                        name: sMaV.name,
                        majorVersion: sMaV.majorVersion,
                        minorVersion: max(sMaV.minorVersion),
                        patchVersion: sMaV.patchVersion,
                    },
                    groupBy: [
                        sMaV.index,
                        sMaV.domainId,
                        sMaV.domainName,
                        sMaV.name,
                        sMaV.majorVersion,
                        sMaV.patchVersion
                    ]
                })
            ],
            select: {
                index: sMiV.index,
                domain: {
                    _localId: sMiV.domainId,
                    name: sMiV.domainName
                },
                name: sMiV.name,
                majorVersion: sMiV.majorVersion,
                minorVersion: sMiV.minorVersion,
                patchVersion: max(sMiV.patchVersion),
            },
            groupBy: [
                sMiV.index,
                sMiV.domainId,
                sMiV.domainName,
                sMiV.name,
                sMiV.majorVersion,
                sMiV.minorVersion
            ]
        });
        for (const applicationLookupRecord of applicationLookupRecords) {
            ensureChildJsMap(maxVersionedMapByApplicationAndDomain_Names, applicationLookupRecord.domain.name)
                .set(applicationLookupRecord.name, applicationLookupRecord);
        }
        return maxVersionedMapByApplicationAndDomain_Names;
    }
    async setStatusByIndexes(indexes, status) {
        let s;
        await this.db.updateWhere({
            update: s = Q.Application,
            set: {
                status
            },
            where: s.index.in(indexes)
        });
    }
    async findMapByFullNames(fullApplication_Names) {
        const mapByFullName = new Map();
        let s;
        const records = await this.db.find.tree({
            select: {},
            from: [
                s = Q.Application
            ],
            where: s.fullName.in(fullApplication_Names)
        });
        for (const record of records) {
            mapByFullName.set(record.fullName, record);
        }
        return mapByFullName;
    }
    async findByDomain_NamesAndApplication_Names(domainNames, applicationNames) {
        let s;
        let d;
        return await this.db.find.tree({
            select: {
                index: Y,
                domain: {
                    _localId: Y,
                    name: Y
                },
                fullName: Y,
                name: Y
            },
            from: [
                s = Q.Application,
                d = s.domain.innerJoin()
            ],
            where: and(d.name.in(domainNames), s.name.in(applicationNames))
        });
    }
    async findByIndex(index) {
        let a;
        let d;
        return await this.db.findOne.tree({
            select: {
                ...ALL_FIELDS,
                domain: {}
            },
            from: [
                a = Q.Application,
                d = a.domain.innerJoin()
            ],
            where: a.index.equals(index)
        });
    }
    async insert(applications, context) {
        let a;
        const values = [];
        for (const application of applications) {
            values.push([
                application.index, application.domain._localId, application.scope,
                application.fullName, application.name,
                // application.packageName,
                application.status, application.signature
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: a = Q.Application,
            columns: [
                a.index,
                a.domain._localId,
                a.scope,
                a.fullName,
                a.name,
                // a.packageName,
                a.status,
                a.signature
            ],
            values
        }, context);
    }
};
ApplicationDao = __decorate([
    Injected()
], ApplicationDao);
export { ApplicationDao };
//# sourceMappingURL=ApplicationDao.js.map