/**
 * A Lambda function that returns a static string
 */
exports.helloFromLambdaHandler = async () => {
    // If you change this message, you will need to change hello-from-lambda.test.js
    const message = '{"msg":"Hello from Lambda!"}';

    var response = {
        "statusCode": 200,
        "body": JSON.stringify(message)
    };
    // All log statements are written to CloudWatch
    console.info(`${message}`);
    
    return response;
}
