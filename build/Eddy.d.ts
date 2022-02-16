import { QWrapperDomain } from 'q-wrapper';
import { ConsumerResponse, QWrapperSettings } from 'q-wrapper/lib/models';
export declare class Eddy<T> {
    connection: QWrapperDomain;
    connectionObject: QWrapperSettings;
    consumeCb: (payload: T) => Promise<ConsumerResponse>;
    constructor(connectionObject: QWrapperSettings & {
        consumeCb: (payload: T) => Promise<ConsumerResponse>;
    });
    connect(): Promise<void>;
    consumeRegister(): void;
    publish(payload: T): void;
}
