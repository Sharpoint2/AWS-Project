import { SkillBuilders, RequestHandler, ErrorHandler, HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model'; // Import specific model types

export const LaunchRequestHandler: RequestHandler = {
    // Determines if this handler can handle the incoming request
    canHandle(handlerInput: HandlerInput): boolean {
        // Checks if the request type is 'LaunchRequest'
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    // Executes the logic for the handler
    handle(handlerInput: HandlerInput): Response {
        // The speech output to be spoken to the user
        const speakOutput: string = 'Welcome to the iPlayer Sounds skill, You can ask me to play something.';

        // Builds the response object
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput) // Keeps the session open for user response
            .getResponse();
    }
   
};

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
       
 

    )
    .lambda(); // Creates the Lambda handler function