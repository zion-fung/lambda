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

##### Sample sh files for uploading zip file
- Oauth
```
rm oauth/oauth.zip;
zip -r oauth.zip oauth/index.js oauth/auth.ejs node_modules/;
aws lambda update-function-code --function-name LAMBDA_FUNCTION_NAME --zip-file fileb://./oauth.zip --region us-east-1
```
- Events API
```
rm events.zip
zip -r events.zip index.js src/ node_modules/ package*
aws lambda update-function-code --function-name LAMBDA_FUNCTION_NAME --zip-file fileb://./events.zip --region us-east-1
```
LAMBDA_FUNCTION_NAME is whatever you named your lambda functions

### API Gateway

##### GET
- Make a get request pointing at your oauth lambda function
- In Integration Request add a mapping template for type "application/json". The default method passthrough template should work
- In Method Response add a Response Header for 200 as "Content-Type" and for Response Body for 200 add "text/html" and "Empty"
- In Integration Response add a mapping template for "text/html" and set the template to:
  - ```#set($inputRoot = $input.path('$'))```
  - ```$inputRoot.data .```
- Make sure that there is no authorization required

##### POST
- Method Response: "application/json" and "Empty" for Response Body for 200
- Integration Response: mapping template for "application/json" but it was empty (might not be needed)

Make sure that you deploy the API everytime there is a new change.
Request URL: /DEPLOYMENT_STAGE/RESOURCE_NAME

### Events API Contents
- index.js
- src/
- node_modules/

### Oauth Contents
- oauth/
- node_modules/

### TODO
- Handle different bearer tokens for each workspace
