const slackURL = "https://slack.com/api/chat.postMessage";
const token = process.env.BOT_TOKEN;
const fetch = require("node-fetch");
const Headers = require("node-fetch").Headers;
const verify = require("./src/verify")
const app_mention = require("./src/app_mention").app_mention

exports.handler = async (ev) => {
    // Verify that the request matches the signing secret
    console.log("Received from slack:", ev)
    if(verify.verify(ev)) {
        console.log("Request is verified!")
    } else {
        console.log("Request is not verified")
        return "401 Unauthorized"
    }
    // Check if challenge is present in request
    let event = ev["body"]
    if("challenge" in event) {
        return event["challenge"]
    }
    // Set variables
    const eventData = event["event"]
    let body = {
        "text": "Hello!",
        "channel": eventData["channel"]
    };
    // Match events
    if(eventData["type"] == "app_mention") {
        body = await app_mention(eventData)
    }
    // Send response back to slack
    console.log("Sending to slack:", body)
    const result = await fetch(slackURL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({"Content-Type": "application/json;charset=utf-8", "Authorization": token})
    })
    const json = await result.json()
    console.log("Response from slack:", json)
    return "200 OK";
};
