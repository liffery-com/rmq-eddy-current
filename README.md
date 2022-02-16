# rmq-eddy-current

A small TS node package for offsetting work to RMQ with the intention of consuming the work by the emitter (or 1 of the emitters in the cluster)


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Example](#example)
- [Scenario:](#scenario)
- [When to use a rmq-eddy-current](#when-to-use-a-rmq-eddy-current)
- [When to not use and eddy](#when-to-not-use-and-eddy)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Example

If you have many connections you might want to connect them all in a single static class for ease of access throughout your app.
You may also want to inject a function from elsewhere as the consumeCb function.
As the emit and parse is from the same service, you now have a typed payload to play with.

```typescript
// import it
import { Eddy } from 'rmq-eddy-current/build/Eddy';

// set the settings for the connection, verbose here for demo
const baseConfig =  {
  protocol: 'amqp',
  hostname: 'mrrabbit.domain.com',
  port: 5672,
  username: 'guest',
  password: 'guest',
  verboseLogging: false,
  queue: `q.somequeue`,
  dleQueue: 'q.dle_queue',
  dleExchange: 'myapp.dleExchange',
  exchange: 'myapp.serviceNameExchange',
  exchangeType: 'direct'
}

// declare the interface for the data shape to be sent via the q
export interface IsomeQueue{
  id: string,
  campaignId: string
}

// initialise it
export const someQueue = new Eddy<IsomeQueue>({
    ...baseConfig,
    consumeCb: async (obj: IsomeQueue): Promise<ConsumerResponse> => {
      // Example thing to be called
      await BuiltwithRepository.patchRecordAsUsed(obj.id, obj.campaignId)
      
      // and anything else...
      
      // then return
      return { processed: true, requeue: false }
});

// Connect the eddy to your rmq 
await someQueue.connect();

// Publish to it
someQueue.publish({
  id: '321354654lop',
  campaignId: '00thgdfhsfgh'
})
```

### Scenario:
1. You have *n services
2. A job comes in to process 20k records
3. You throw each record to a Q, 1 by 1, in seconds
4. Your same service then consumes 1 by 1 an item from the q

### When to use a rmq-eddy-current
Typically, you would employ dedicated workers for this kind of work. However, there are complexities with workers, firstly they must be co-ordinated and maintained.

When you have highly infrequent workloads (typically backoffice kind of stuff) 10k records to parse here and there, it is far more cost-effective to let the service which enqueues the work to also process the work as the performance of that service is not mission critical. Think of it like an eddy current in a stream, the main body of water for the service is flowing but little eddy's quickly spin up do their work then spin down.

### When to not use and eddy
When doing the work would impact the performance of the app to an audience which should not be affected... for example, your customers. Or when the work load is fair consistent, like every 2nd day you need to chunk through a lot of data.

This was not designed for sending data between 2 different services.

