const { PubSub } = require('@google-cloud/pubsub');
const path = require("path");
const serviceKey = path.join(__dirname, "./../../key.json");


const pubSubClient = new PubSub({
    keyFilename: serviceKey,
    projectId: "feisty-audio-278013",
});
async function listSchemas() {
    for await (const s of pubSubClient.listSchemas()) {
        console.log(s.name);
    }
    console.log('Listed schemas.');
}

listSchemas();