"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Magic8BallError = void 0;
class Magic8BallError extends Error {
    isMagic8BallError = true;
    sdk = 'Magic8Ball';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.Magic8BallError = Magic8BallError;
//# sourceMappingURL=Magic8BallError.js.map