"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eddy = void 0;
const tslib_1 = require("tslib");
const q_wrapper_1 = require("q-wrapper");
const clone_1 = (0, tslib_1.__importDefault)(require("./clone"));
class Eddy {
    constructor(connectionObject) {
        this.connectionObject = connectionObject;
        this.connection = new q_wrapper_1.QWrapperDomain(connectionObject);
        this.consumeCb = connectionObject.consumeCb;
    }
    async connect() {
        await this.connection.initialize();
        this.consumeRegister();
    }
    consumeRegister() {
        this.connection.consume(async (message) => {
            try {
                return await this.consumeCb(JSON.parse(message.content.toString()));
            }
            catch (e) {
                console.error(message.fields.routingKey, e);
                return { processed: false, requeue: false };
            }
        });
    }
    publish(payload) {
        if (!this.connection) {
            throw new Error(`${this.connectionObject.queue} publish called but connect not called`);
        }
        this.connection.sendToQueue((0, clone_1.default)(payload), this.connectionObject.queue);
    }
}
exports.Eddy = Eddy;
