const crypto = require("crypto")

/**
 * 
 * @param {any} req - The entire request from slack
 * @return {boolean} - Whether the request was valid or not
 */
function verify(req) {
    const slackSigningSecret = process.env.SIGNING_SECRET;
    const rawBody = JSON.stringify(req.body)
    const slackSignature = req["headers"]["X-Slack-Signature"]
    const timestamp = req["headers"]["X-Slack-Request-Timestamp"]
    let time = Math.floor(new Date().getTime()/1000);
    // If request happened more than 5 minutes ago it could be a replay attack so ignore it
    if (Math.abs(time - timestamp) > 300) {
        return "Ignore this request"
    }
    const version = slackSignature.split("=")[0]
    let sigBasestring = version + ":" + timestamp + ':' + rawBody;
    let mySignature = version + "=" + crypto.createHmac('sha256', slackSigningSecret).update(sigBasestring).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(slackSignature), Buffer.from(mySignature))
}

module.exports = {
    verify
}