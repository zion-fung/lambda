rm handleBotEvent.zip
zip -r handleBotEvent.zip index.js src/ node_modules/ package*
aws lambda update-function-code --function-name handleBotEvent --zip-file fileb://./handleBotEvent.zip --region us-east-1