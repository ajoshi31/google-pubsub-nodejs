require('dotenv').config();
const path = require("path");
const { PubSub } = require('@google-cloud/pubsub');
const serviceKey = path.join(__dirname, "./../key.json");
const topicNameOrId = 'order_topic';
const data = JSON.stringify({ foo: 'bar' });

// Creates a client; cache this for further use
const pubSubClient = new PubSub({
    keyFilename: serviceKey,
    projectId: "feisty-audio-278013",
});

async function publishMessage() {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
    const message = {
        data: dataBuffer
    };

    try {
        const messageId = await pubSubClient
            .topic(topicNameOrId)
            .publishMessage(message)
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
}

publishMessage();