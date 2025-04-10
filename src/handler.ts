// handler.ts
// Import the handler function created by the ASK SDK SkillBuilders
import { handler as skillHandler } from './app';

// Re-export the handler for AWS Lambda
// This keeps the entry point consistent with the serverless.yml configuration
export const handler = skillHandler;