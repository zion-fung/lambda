const methods = require("./methods")
// Given an event, parse the information and return the appropriate response
const commandsList = "help\n(Displays this help message\nadd throws #\n(Adds # of throws)\nremove throws #\n(Removes # of throws)\nadd quote q\n(Adds q to the list of quotes)\nget quote\n(Randomly gets a quote)\nget all throws\n(Gets throws for all users sorted in descending order)"
async function app_mention(event) {
    const text = event["text"]
    const user = event["user"]
    const input = text.substring(text.indexOf(" ") + 1)
    let body = {"channel": event["channel"]}
    if(input.match(/add throws/i)) {
        let throws = Number(input.replace(/add throws /i, ""))
        if(!throws) {
            body["text"] = "Error: you must provide a number"
            return body
        }
        let output = await methods.addThrows(user, throws)
        body["text"] = output
    } else if(input.match(/remove throws/i)) {
        let throws = Number(input.replace(/remove throws /i, ""))
        if(!throws) {
            body["text"] = "Error: you must provide a number"
            return body
        }
        let output = await methods.removeThrows(user, throws)
        body["text"] = output
    } else if(input.match(/add quote/i)) {
        let quote = input.replace(/add quote /i, "")
        let output = await methods.addQuote(quote)
        body["text"] = output
    } else if(input.match(/get quote/i)) {
        let output = await methods.getQuote()
        body["text"] = output
    } else if(input.match(/get throws/i)) {
        let output = await methods.getThrows(user)
        body["text"] = output
    } else if(input.match(/get all throws/i)) {
        let output = await methods.getAllThrows()
        body["text"] = output
    } else if(input.match(/help/i)) {
        body["text"] = `List of all comands:\n${commandsList}`
    } else {
        body["text"] = "I don't recognize that command"
    }
    return body
}

module.exports = {
    app_mention
}