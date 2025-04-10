import { SkillBuilders, RequestHandler, ErrorHandler, HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model'; // Import specific model types

// Generic error handler
export const CustomErrorHandler: ErrorHandler = {
    // Determines if this handler can handle the error (true means it handles all errors)
    canHandle(): boolean {
        return true;
    },
    // Executes the error handling logic
    handle(handlerInput: HandlerInput, error: Error): Response {
        console.error(`~~~~ Error handled: ${error.stack}`); // Log the error for debugging
        // User-friendly error message
        const speakOutput: string = `Sorry, I had trouble doing what you asked. Please try again.`;

        // Builds the response object
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput) // Keeps the session open after an error
            .getResponse();
    }
};


export const handler = SkillBuilders.custom()
.addErrorHandlers(
       CustomErrorHandler, // Use the renamed error handler
   
    )
    .lambda(); // Creates the Lambda handler function