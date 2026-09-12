import { Magic8BallEntityBase } from '../Magic8BallEntityBase';
import type { Magic8BallSDK } from '../Magic8BallSDK';
import type { Control } from '../types';
import type { Category, CategoryListMatch } from '../Magic8BallTypes';
declare class CategoryEntity extends Magic8BallEntityBase<Category> {
    constructor(client: Magic8BallSDK, entopts: any);
    make(this: CategoryEntity): CategoryEntity;
    list(this: any, reqmatch?: CategoryListMatch, ctrl?: Control): Promise<CategoryEntity[]>;
}
export { CategoryEntity };
