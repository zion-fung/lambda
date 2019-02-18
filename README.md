## lambda (Slack bot made in aws lambda)

### Pre-installation
- Run npm install
- Make a settings.json in the mongo folder
```
{
    "mongoConfig": {
      "serverUrl": "",
      "database": ""
    }
}
```

### Installation
- Make a lambda function in AWS in node.js
  - BOT_TOKEN (env variable) should be "Bearer " prepended to your Bot User Oauth Token (TODO)
  - SIGNING_SECRET (env variable) should be your signing secret
- Upload the code for events api by creating a zip 
- Deploy an API Gateway that calls the lambda function that you created
- Make a slack app with a bot user and use the url from the API Gateway as the Event target
- Upload code for oauth by creating a zip
- Set SLACK_CLIENT_ID and SLACK_CLIENT_SECRET env variables
- Add GET method to API gateway and edit request/response integrations to take in the data and return html
- Invite slack app into your channel

#### Events API Contents
- index.js
- src/
- node_modules/

#### Oauth Contents
- oauth/
- node_modules/

### TODO
- Handle different bearer tokens for each workspace
