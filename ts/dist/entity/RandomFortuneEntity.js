"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomFortuneEntity = void 0;
const Magic8BallEntityBase_1 = require("../Magic8BallEntityBase");
// TODO: needs Entity superclass
class RandomFortuneEntity extends Magic8BallEntityBase_1.Magic8BallEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'random_fortune';
        this.name_ = 'random_fortune';
        this.Name = 'RandomFortune';
    }
    make() {
        return new RandomFortuneEntity(this._client, this.entopts());
    }
}
exports.RandomFortuneEntity = RandomFortuneEntity;
//# sourceMappingURL=RandomFortuneEntity.js.map