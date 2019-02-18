const throws = require("./mongo/mongoCollections").throws;
const quotes = require("./mongo/mongoCollections").quotes;

async function addThrows(user, throwNumber) {
    try {
        let throwsCollection = await throws();
        let data = await throwsCollection.findOne({"user": user})
        if(data) { // If user was already present
            let updateInfo = await throwsCollection.updateOne({"user": user}, {$set: {"throws": throwNumber + data["throws"]}})
            if(updateInfo.matchedCount == 0 && updateInfo.modifiedCount == 0) {
                return "Throws could not be added"
            }
        } else { // If user is not alreay in the database
            let insertInfo = await throwsCollection.insertOne({"user": user, "throws": throwNumber})
            if(insertInfo.insertedCount == 0) {
                return "Throws could not be added"
            }
        }
        return `Added ${throwNumber} throws`
    } catch(error) {
        console.log("Error:", error)
        return "Error occured. Please try again"
    }
}

async function removeThrows(user, throwInput) {
    try {
        let throwsCollection = await throws();
        let data = await throwsCollection.findOne({"user": user})
        if(data) { // If user was already present
            let throwNumber = data["throws"] - throwInput
            if(throwNumber < 0) {
                throwNumber = 0
            }
            let updateInfo = await throwsCollection.updateOne({"user": user}, {$set: {"throws": throwNumber}})
            if(updateInfo.matchedCount == 0 && updateInfo.modifiedCount == 0) {
                return "Throws could not be removed"
            }
        } else { // If user is not alreay in the database
            return "Can't remove throws. User does not have any throws"
        }
        return `Removed ${throwInput} throws`
    } catch(error) {
        console.log("Error:", error)
        return "Error occured. Please try again"
    }
}

async function getThrows(user) {
    try {
        let throwsCollection = await throws();
        let data = await throwsCollection.findOne({"user": user})
        if(data) { // If user was already present
            return `You have ${data["throws"]} throws`
        } else { // If user is not alreay in the database
            return "Can't get throws. User does not exist"
        }
    } catch(error) {
        console.log("Error:", error)
        return "Error occured. Please try again"
    }
}

async function getAllThrows() {
    try {
        let throwsCollection = await throws();
        let data = await throwsCollection.find({}).toArray()
        if(data) { // If data exists
            // sort data in descending order
            data.sort(function(a, b) {return b["throws"] - a["throws"]})
            let output = ""
            let i = 1
            for(const user of data) {
                output += `${i}. <@${user["user"]}> has ${user["throws"]} throws\n`
                i++
            }
            return output
        } else { // If user is not alreay in the database
            return "Can't get throws. User does not exist"
        }
    } catch(error) {
        console.log("Error:", error)
        return "Error occured. Please try again"
    }
}

async function addQuote(text) {
    try {
        let quotesCollection = await quotes();
        let insertInfo = await quotesCollection.insertOne({"quote": text})
        if(insertInfo.insertedCount == 0) {
            return "Could not add quote"
        }
        return "Added quote"
    } catch(error) {
        console.log("Error:", error)
        return "Error occured. Please try again"
    }
}

async function getQuote() {
    try {
        let quotesCollection = await quotes();
        let data = await quotesCollection.find({}).toArray()
        let length = data.length
        if(length == 0) {
            return "There are no quotes"
        }
        let random = Math.floor(Math.random() * Math.floor(length));
        return data[random]["quote"]
    } catch(error) {
        console.log("Error:", error)
        return "Error occured. Please try again"
    }
}

function getCommandsList() {
    return "List of all commands:\nhelp\n(Displays this help message)\nadd throws #\n(Adds # of throws)\nremove throws #\n(Removes # of throws)\nadd quote q\n(Adds q to the list of quotes)\nget quote\n(Randomly gets a quote)\nget all throws\n(Gets throws for all users sorted in descending order)"
}

module.exports = {
    addThrows,
    removeThrows,
    getThrows,
    getAllThrows,
    addQuote,
    getQuote,
    getCommandsList
}