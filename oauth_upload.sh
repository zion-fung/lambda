rm oauth/oauth.zip;zip -r oauth.zip oauth/index.js oauth/auth.ejs node_modules/;aws lambda update-function-code --function-name oauth --zip-file fileb://./oauth.zip --region us-east-1