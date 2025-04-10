// src/app.ts
import { SkillBuilders } from 'ask-sdk-core';

// Import handlers from their new locations
import { LaunchRequestHandler } from './handlers/launchRequestHandler';
import { HelloWorldIntentHandler } from './handlers/helloWorldIntentHandler';
import { PlaySoundIntentHandler } from './handlers/playSoundIntentHandler'; // Import the new handler
import { CustomErrorHandler } from './handlers/errorHandler';

// Register all handlers, including the new PlaySoundIntentHandler
export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        PlaySoundIntentHandler,
      
        
    )
    .addErrorHandlers(
        CustomErrorHandler
    )
    .lambda();