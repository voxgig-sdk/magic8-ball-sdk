import { Magic8BallEntityBase } from '../Magic8BallEntityBase';
import type { Magic8BallSDK } from '../Magic8BallSDK';
import type { Control } from '../types';
import type { Biased, BiasedLoadMatch, BiasedCreateData } from '../Magic8BallTypes';
declare class BiasedEntity extends Magic8BallEntityBase<Biased> {
    constructor(client: Magic8BallSDK, entopts: any);
    make(this: BiasedEntity): BiasedEntity;
    load(this: any, reqmatch?: BiasedLoadMatch, ctrl?: Control): Promise<BiasedEntity>;
    create(this: any, reqdata?: BiasedCreateData, ctrl?: Control): Promise<BiasedEntity>;
}
export { BiasedEntity };
