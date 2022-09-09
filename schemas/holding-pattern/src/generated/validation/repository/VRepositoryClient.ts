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
	ClientVDescriptor,
	Client,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryClient,
} from '../../entity/repository/IRepositoryClient';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryClientVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor<Repository>
	client?: ClientVDescriptor<Client>

  // Non-Id relations (including OneToMany's)

}


