import { AIR_DB } from '@airport/air-control';
import { DI } from '@airport/di';
import { RecordHistory } from '../ddl/history/RecordHistory';
import { ActorApplication } from '../ddl/infrastructure/ActorApplication';
import { Application } from '../ddl/infrastructure/Application';
import { RepositoryApplication } from '../ddl/repository/RepositoryApplication';
import { Repository } from '../ddl/repository/Repository';
import { RepositoryActor } from '../ddl/repository/RepositoryActor';
import { Actor } from '../ddl/infrastructure/Actor';
import { RepoTransHistoryChangedRepositoryActor } from '../ddl/history/RepoTransHistoryChangedRepositoryActor';
import { RecordHistoryNewValue } from '../ddl/history/RecordHistoryNewValue';
import { RecordHistoryOldValue } from '../ddl/history/RecordHistoryOldValue';
import { TransactionHistory } from '../ddl/history/TransactionHistory';
import { RepositoryTransactionHistory } from '../ddl/history/RepositoryTransactionHistory';
import { OperationHistory } from '../ddl/history/OperationHistory';
import { Stageable } from '../ddl/infrastructure/Stageable';
import { RepositoryEntity } from '../ddl/repository/RepositoryEntity';
import { RepositorySchema } from '../ddl/repository/RepositorySchema';
import { ChildRepoRow } from '../ddl/traditional/ChildRepoRow';
import { ChildRow } from '../ddl/traditional/ChildRow';
import { ImmutableRepoRow } from '../ddl/traditional/ImmutableRepoRow';
import { ImmutableRow } from '../ddl/traditional/ImmutableRow';
import { MutableRepoRow } from '../ddl/traditional/MutableRepoRow';
import { MutableRow } from '../ddl/traditional/MutableRow';
import { ReferenceRow } from '../ddl/traditional/ReferenceRow';

DI.db().get(AIR_DB).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'holding-pattern');
  accumulator.add(RecordHistory, 0);
  accumulator.add(ActorApplication, 1);
  accumulator.add(Application, 2);
  accumulator.add(RepositoryApplication, 3);
  accumulator.add(Repository, 4);
  accumulator.add(RepositoryActor, 5);
  accumulator.add(Actor, 6);
  accumulator.add(RepoTransHistoryChangedRepositoryActor, 7);
  accumulator.add(RecordHistoryNewValue, 8);
  accumulator.add(RecordHistoryOldValue, 9);
  accumulator.add(TransactionHistory, 10);
  accumulator.add(RepositoryTransactionHistory, 11);
  accumulator.add(OperationHistory, 12);
  accumulator.add(Stageable, undefined);
  accumulator.add(RepositoryEntity, undefined);
  accumulator.add(RepositorySchema, 13);
  accumulator.add(ChildRepoRow, undefined);
  accumulator.add(ChildRow, undefined);
  accumulator.add(ImmutableRepoRow, undefined);
  accumulator.add(ImmutableRow, undefined);
  accumulator.add(MutableRepoRow, undefined);
  accumulator.add(MutableRow, undefined);
  accumulator.add(ReferenceRow, undefined);
});
