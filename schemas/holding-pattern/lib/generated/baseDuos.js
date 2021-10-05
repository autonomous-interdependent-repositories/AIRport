import { Duo, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo extends Duo {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseActorDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
export class BaseOperationHistoryDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
export class BaseRecordHistoryDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseRecordHistoryNewValueDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
export class BaseRecordHistoryOldValueDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
export class BaseRepoTransHistoryChangedRepositoryActorDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
export class BaseRepositoryDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseRepositoryActorDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseRepositoryApplicationDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseRepositorySchemaDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
export class BaseRepositoryTransactionHistoryDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
export class BaseTransactionHistoryDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
//# sourceMappingURL=baseDuos.js.map