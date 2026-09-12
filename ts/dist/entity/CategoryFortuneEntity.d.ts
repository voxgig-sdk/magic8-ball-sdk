import { Magic8BallEntityBase } from '../Magic8BallEntityBase';
import type { Magic8BallSDK } from '../Magic8BallSDK';
import type { Control } from '../types';
import type { CategoryFortune, CategoryFortuneLoadMatch } from '../Magic8BallTypes';
declare class CategoryFortuneEntity extends Magic8BallEntityBase<CategoryFortune> {
    constructor(client: Magic8BallSDK, entopts: any);
    make(this: CategoryFortuneEntity): CategoryFortuneEntity;
    load(this: any, reqmatch?: CategoryFortuneLoadMatch, ctrl?: Control): Promise<CategoryFortuneEntity>;
}
export { CategoryFortuneEntity };
