require('dotenv').config();
const { PubSub, Encodings } = require('@google-cloud/pubsub');
const avro = require('avro-js');
const fs = require('fs');
const path = require("path");
const serviceKey = path.join(__dirname, "./../../key.json");
const pubSubClient = new PubSub({
    keyFilename: serviceKey,
    projectId: "feisty-audio-278013",
});
const topicNameOrId = 'new_order_topic';

async function publishAvroRecords(topicNameOrId) {
    // Get the topic metadata to learn about its schema encoding.
    const topic = pubSubClient.topic(topicNameOrId);

    const [topicMetadata] = await topic.getMetadata();

    console.log(topicMetadata);
    const topicSchemaMetadata = topicMetadata.schemaSettings;

    if (!topicSchemaMetadata) {
        console.log(`Topic ${topicNameOrId} doesn't seem to have a schema.`);
        return;
    }
    const schemaEncoding = topicSchemaMetadata.encoding;


    // Make an encoder using the official avro-js library.
    const definition = fs
        .readFileSync('schema.avsc')
        .toString();
    const type = avro.parse(definition);


    // Encode the message.
    const province = {
        "StringField": "Test",
        "IntField": 2
    }


    let dataBuffer;
    switch (schemaEncoding) {
        case Encodings.Binary:
            dataBuffer = type.toBuffer(province);
            break;
        case Encodings.Json:
            dataBuffer = Buffer.from(type.toString(province));
            break;
        default:
            console.log(`Unknown schema encoding: ${schemaEncoding}`);
            break;
    }
    if (!dataBuffer) {
        console.log(`Invalid encoding ${schemaEncoding} on the topic.`);
        return;
    }

    const messageId = await topic.publish(dataBuffer);
    console.log(`Avro record ${messageId} published.`);


}


publishAvroRecords(topicNameOrId);