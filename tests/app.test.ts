// __tests__/app.test.ts
import { handler } from '../src/app'; // Import the handler function from app.ts
import { RequestEnvelope, ResponseEnvelope, Session } from 'ask-sdk-model'; // Import necessary types
import { Context } from 'aws-lambda'; // Import Lambda context type

// Describe block groups tests for the skill handler
describe('iPlayer Sounds Skill Handlers', () => {

    // Test specific handler: LaunchRequestHandler
    it('should handle LaunchRequest correctly', async () => {
        // 1. Mock the HandlerInput for a LaunchRequest
        const mockLaunchRequest: RequestEnvelope = {
            version: '1.0',
            session: {} as Session, // Provide a minimal session object
            context: { // Provide a minimal context object
                System: {
                    application: { applicationId: 'amzn1.ask.skill.fake-id' },
                    user: { userId: 'amzn1.ask.account.fake-user' },
                    apiEndpoint: "https://api.amazonalexa.com",
                    apiAccessToken: "fake-token"
                }
            },
            request: {
                type: 'LaunchRequest', // The type of request we are testing
                requestId: 'amzn1.echo-api.request.fake-request-id',
                timestamp: new Date().toISOString(),
                locale: 'en-GB', // Specify locale
            },
        };

        // Mock Lambda context (can be minimal for this test)
        const mockContext: Context = {
            callbackWaitsForEmptyEventLoop: false,
            functionName: 'testFunction',
            functionVersion: '$LATEST',
            invokedFunctionArn: 'arn:aws:lambda:eu-west-2:123456789012:function:testFunction',
            memoryLimitInMB: '128',
            awsRequestId: 'fake-aws-request-id',
            logGroupName: '/aws/lambda/testFunction',
            logStreamName: 'fake-log-stream',
            getRemainingTimeInMillis: () => 3000, // Mock remaining time
            done: () => {}, // Mock done callback
            fail: () => {}, // Mock fail callback
            succeed: () => {}, // Mock succeed callback
        };


        // Invoke the handler with the mocked input
        // We need to cast the handler to 'any' temporarily if its direct type causes issues
        // with the generic lambda call signature in some test setups.
        // Alternatively, create a more specific mock structure matching HandlerInput if preferred.
        const responseEnvelope: ResponseEnvelope = await (handler as any)(mockLaunchRequest, mockContext);

        // 3. Assert the expected outcome
        // Check if the response and outputSpeech exist
        expect(responseEnvelope.response).toBeDefined();
        expect(responseEnvelope.response.outputSpeech).toBeDefined();
        expect(responseEnvelope.response.outputSpeech?.type).toEqual('SSML'); // ASK SDK defaults to SSML

        // Check if the speech output contains the expected welcome message
        expect(responseEnvelope.response.outputSpeech?.ssml).toContain('Welcome to the iPlayer Sounds skill');

        // Check if reprompt is set (meaning the session should stay open)
        expect(responseEnvelope.response.reprompt).toBeDefined();
        expect(responseEnvelope.response.reprompt?.outputSpeech).toBeDefined();
        expect(responseEnvelope.response.reprompt?.outputSpeech?.ssml).toContain('Welcome to the iPlayer Sounds skill');
    });

    
});