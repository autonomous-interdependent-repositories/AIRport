"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseActorDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Actor'], qSchema_1.Q);
    }
}
exports.BaseActorDao = BaseActorDao;
class BaseActorApplicationDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ActorApplication'], qSchema_1.Q);
    }
}
exports.BaseActorApplicationDao = BaseActorApplicationDao;
class BaseApplicationDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Application'], qSchema_1.Q);
    }
}
exports.BaseApplicationDao = BaseApplicationDao;
class BaseChildRepoRowDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ChildRepoRow'], qSchema_1.Q);
    }
}
exports.BaseChildRepoRowDao = BaseChildRepoRowDao;
class BaseChildRowDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ChildRow'], qSchema_1.Q);
    }
}
exports.BaseChildRowDao = BaseChildRowDao;
class BaseImmutableRepoRowDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ImmutableRepoRow'], qSchema_1.Q);
    }
}
exports.BaseImmutableRepoRowDao = BaseImmutableRepoRowDao;
class BaseImmutableRowDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ImmutableRow'], qSchema_1.Q);
    }
}
exports.BaseImmutableRowDao = BaseImmutableRowDao;
class BaseMutableRepoRowDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MutableRepoRow'], qSchema_1.Q);
    }
}
exports.BaseMutableRepoRowDao = BaseMutableRepoRowDao;
class BaseMutableRowDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MutableRow'], qSchema_1.Q);
    }
}
exports.BaseMutableRowDao = BaseMutableRowDao;
class BaseOperationHistoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['OperationHistory'], qSchema_1.Q);
    }
}
exports.BaseOperationHistoryDao = BaseOperationHistoryDao;
class BaseRecordHistoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordHistory'], qSchema_1.Q);
    }
}
exports.BaseRecordHistoryDao = BaseRecordHistoryDao;
class BaseRecordHistoryNewValueDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordHistoryNewValue'], qSchema_1.Q);
    }
}
exports.BaseRecordHistoryNewValueDao = BaseRecordHistoryNewValueDao;
class BaseRecordHistoryOldValueDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordHistoryOldValue'], qSchema_1.Q);
    }
}
exports.BaseRecordHistoryOldValueDao = BaseRecordHistoryOldValueDao;
class BaseReferenceRowDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ReferenceRow'], qSchema_1.Q);
    }
}
exports.BaseReferenceRowDao = BaseReferenceRowDao;
class BaseRepoTransHistoryChangedRepositoryActorDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepoTransHistoryChangedRepositoryActor'], qSchema_1.Q);
    }
}
exports.BaseRepoTransHistoryChangedRepositoryActorDao = BaseRepoTransHistoryChangedRepositoryActorDao;
class BaseRepositoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Repository'], qSchema_1.Q);
    }
}
exports.BaseRepositoryDao = BaseRepositoryDao;
class BaseRepositoryActorDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryActor'], qSchema_1.Q);
    }
}
exports.BaseRepositoryActorDao = BaseRepositoryActorDao;
class BaseRepositoryApplicationDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryApplication'], qSchema_1.Q);
    }
}
exports.BaseRepositoryApplicationDao = BaseRepositoryApplicationDao;
class BaseRepositoryEntityDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryEntity'], qSchema_1.Q);
    }
}
exports.BaseRepositoryEntityDao = BaseRepositoryEntityDao;
class BaseRepositorySchemaDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositorySchema'], qSchema_1.Q);
    }
}
exports.BaseRepositorySchemaDao = BaseRepositorySchemaDao;
class BaseRepositoryTransactionHistoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryTransactionHistory'], qSchema_1.Q);
    }
}
exports.BaseRepositoryTransactionHistoryDao = BaseRepositoryTransactionHistoryDao;
class BaseStageableDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Stageable'], qSchema_1.Q);
    }
}
exports.BaseStageableDao = BaseStageableDao;
class BaseTransactionHistoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['TransactionHistory'], qSchema_1.Q);
    }
}
exports.BaseTransactionHistoryDao = BaseTransactionHistoryDao;
//# sourceMappingURL=baseDaos.js.map