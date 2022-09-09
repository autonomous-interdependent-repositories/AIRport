import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	RepositoryVDescriptor,
} from './VRepository';
import {
	Repository,
} from '../../../ddl/repository/Repository';
import {
	DatabaseVDescriptor,
	Database,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryDatabase,
} from '../../entity/repository/IRepositoryDatabase';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryDatabaseVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor<Repository>
	database?: DatabaseVDescriptor<Database>

  // Non-Id relations (including OneToMany's)

}


