import { IQOrderableField } from '../../../lingo/core/field/Field';
import { INonEntityFindOne } from '../../../lingo/query/api/NonEntityFindOne';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { RawSheetQuery } from '../../../lingo/query/facade/SheetQuery';
import { ITreeEntity, RawTreeQuery } from '../../../lingo/query/facade/TreeQuery';
/**
 * Created by Papa on 11/12/2016.
 */
export declare class NonEntityFindOne implements INonEntityFindOne {
    tree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): Promise<ITE>;
    sheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }): Promise<any[]>;
    field<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): Promise<any>;
}
