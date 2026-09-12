import { Context } from './Context';
declare class Magic8BallError extends Error {
    isMagic8BallError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { Magic8BallError };
