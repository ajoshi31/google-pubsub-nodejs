require('dotenv').config();
const { PubSub } = require('@google-cloud/pubsub');

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const topicNameOrId = 'order_topic';
const data = JSON.stringify({ foo: 'bar' });

// Imports the Google Cloud client library

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function publishMessage() {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
    try {
        const messageId = await pubSubClient
            .topic(topicNameOrId)
            .publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
}

publishMessage();