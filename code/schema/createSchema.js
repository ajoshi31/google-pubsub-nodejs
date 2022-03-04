/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const { PubSub, SchemaTypes } = require('@google-cloud/pubsub');
const path = require("path");
const fs = require('fs');
const serviceKey = path.join(__dirname, "./../../key.json");
const schemaNameOrId = 'order_schema';
const avscFile = 'schema.avsc';
const topicNameOrId = 'order_schema';
const pubSubClient = new PubSub({
    keyFilename: serviceKey,
    projectId: "feisty-audio-278013",
});

async function createAvroSchema(schemaNameOrId, avscFile) {
    const definition = fs.readFileSync(avscFile).toString();
    console.log(definition);
    const schema = await pubSubClient.createSchema(
        schemaNameOrId,
        SchemaTypes.Avro,
        definition
    );

    const name = await schema.getName();
    console.log(`Schema ${name} created.`);
}

createAvroSchema(schemaNameOrId, avscFile);

