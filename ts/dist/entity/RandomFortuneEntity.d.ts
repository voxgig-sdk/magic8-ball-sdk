import { Magic8BallEntityBase } from '../Magic8BallEntityBase';
import type { Magic8BallSDK } from '../Magic8BallSDK';
import type { RandomFortune } from '../Magic8BallTypes';
declare class RandomFortuneEntity extends Magic8BallEntityBase<RandomFortune> {
    constructor(client: Magic8BallSDK, entopts: any);
    make(this: RandomFortuneEntity): RandomFortuneEntity;
}
export { RandomFortuneEntity };
