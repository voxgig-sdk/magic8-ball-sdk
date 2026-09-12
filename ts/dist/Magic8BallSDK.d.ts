import { BiasedEntity } from './entity/BiasedEntity';
import { CategoryEntity } from './entity/CategoryEntity';
import { CategoryFortuneEntity } from './entity/CategoryFortuneEntity';
import { RandomFortuneEntity } from './entity/RandomFortuneEntity';
export type * from './Magic8BallTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { Magic8BallEntityBase } from './Magic8BallEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class Magic8BallSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Biased(entopts?: Record<string, any>): BiasedEntity;
    Category(entopts?: Record<string, any>): CategoryEntity;
    CategoryFortune(entopts?: Record<string, any>): CategoryFortuneEntity;
    RandomFortune(entopts?: Record<string, any>): RandomFortuneEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): Magic8BallSDK;
    tester(testopts?: any, sdkopts?: any): Magic8BallSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof Magic8BallSDK;
export { stdutil, config, BaseFeature, Magic8BallEntityBase, Magic8BallSDK, SDK, };
