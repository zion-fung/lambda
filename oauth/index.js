const fetch = require("node-fetch");
const Headers = require("node-fetch").Headers;
const verificationUrl = "https://slack.com/api/oauth.access"
const ejs = require("ejs");
const qs = require("qs");

exports.handler = async (event, context) => {
    console.log("Received from slack:", event)
    const params = event["params"]["querystring"]
    if(!params["code"]) {
        return ""
    }
    const data = {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: params["code"]
    }
    console.log("Sending to oauth.access:", data)
    const response = await fetch(verificationUrl, {
        method: "POST",
        body: qs.stringify(data),
        headers: new Headers({"Content-Type": "	application/x-www-form-urlencoded"})
    })
    let json = await response.json()
    console.log("Response from oauth.access:", json)
    let text = ""
    if(response["ok"] === true) {
        text = await ejs.renderFile(__dirname + "/auth.ejs", {
            message: "Successfully authenticated"
        })
    } else {
        text = await ejs.renderFile(__dirname + "/auth.ejs", {
            message: "Failed to Authenticate"
        })
    }
    text = text.replace(/\r\n/ig,"")
    context.succeed({data: text})
};
