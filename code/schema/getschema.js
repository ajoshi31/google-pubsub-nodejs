const { PubSub } = require('@google-cloud/pubsub');
const path = require("path");
const serviceKey = path.join(__dirname, "./../../key.json");
const schemaNameOrId = 'order_schema';


const pubSubClient = new PubSub({
    keyFilename: serviceKey,
    projectId: "feisty-audio-278013",
});
async function getSchema(schemaNameOrId) {
    const schema = pubSubClient.schema(schemaNameOrId);
    const info = await schema.get();
    const fullName = await schema.getName();
    console.log(`Schema ${fullName} info: ${JSON.stringify(info, null, 4)}.`);
}

getSchema(schemaNameOrId);
