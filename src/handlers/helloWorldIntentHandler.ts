import { SkillBuilders, RequestHandler, ErrorHandler, HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model'; // Import specific model types

export const HelloWorldIntentHandler: RequestHandler = {
    // Determines if this handler can handle the incoming request
    canHandle(handlerInput: HandlerInput): boolean {
        // Checks if the request type is 'IntentRequest' and the intent name is 'HelloWorldIntent'
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    // Executes the logic for the handler
    handle(handlerInput: HandlerInput): Response {
        // The speech output for this intent
        const speakOutput: string = 'Hello World from iPlayer Sounds in TypeScript!';

        // Builds the response object
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // No reprompt needed here as it's a simple statement
            .getResponse();
    }
};

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
      
        HelloWorldIntentHandler
  

    )
    .lambda(); // Creates the Lambda handler function