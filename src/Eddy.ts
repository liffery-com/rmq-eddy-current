import { QWrapperDomain } from 'q-wrapper';
import { ConsumerResponse, QWrapperSettings } from 'q-wrapper/lib/models';
import { Message as amqMessage } from 'amqplib/properties';
import clone from './clone';

export class Eddy<T> {
  connection: QWrapperDomain;
  connectionObject: QWrapperSettings;
  consumeCb: (payload: T) => Promise<ConsumerResponse>;

  constructor (connectionObject: QWrapperSettings & { consumeCb: (payload: T) => Promise<ConsumerResponse> }) {
    this.connectionObject = connectionObject;
    this.connection = new QWrapperDomain(connectionObject);
    this.consumeCb = connectionObject.consumeCb;
  }

  async connect (): Promise<void> {
    await this.connection.initialize();
    this.consumeRegister();
  }

  consumeRegister (): void {
    this.connection.consume(async (message: amqMessage): Promise<ConsumerResponse> => {
      try {
        return await this.consumeCb(
          JSON.parse(
            message.content.toString()
          )
        );
      } catch (e) {
        console.error(message.fields.routingKey, e);
        return { processed: false, requeue: false };
      }
    });
  }

  publish (payload: T): void {
    if (!this.connection) {
      throw new Error(`${this.connectionObject.queue} publish called but connect not called`);
    }
    this.connection.sendToQueue(
      clone(payload),
      this.connectionObject.queue
    );
  }
}
