import { DI } from "@airport/di";
import { LEVEL_2_DAO } from "../server-tokens";

export interface ILevel2Dao {

}

export class Level2Dao
    implements ILevel2Dao {

}
DI.set(LEVEL_2_DAO, Level2Dao)