// src/handlers/playSoundIntentHandler.ts
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { getSlotValue } from '../utils/requestUtils';

// Import AWS SDK v3 clients
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb"; // Use DocumentClient for easier item handling

// Initialize the DynamoDB Document Client
const client = new DynamoDBClient({ region: process.env.AWS_REGION }); // Use region from environment
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.SOUNDS_TABLE_NAME; // Get table name from environment variable

export const PlaySoundIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PlaySoundIntent';
    },
    // Make the handler async to await the database query
    async handle(handlerInput: HandlerInput): Promise<Response> {
        const soundNameSlot = getSlotValue(handlerInput, 'SoundName');
        const soundKey = soundNameSlot?.toLowerCase(); // Use lowercase key for consistency

        let speakOutput: string;

        if (!tableName) {
            console.error("SOUNDS_TABLE_NAME environment variable not set.");
            speakOutput = "Sorry, there was a configuration error. Please try again later.";
        } else if (soundKey) {
            // Prepare the DynamoDB Query command
            const command = new QueryCommand({
                TableName: tableName,
                KeyConditionExpression: "soundKey = :key", // Query by partition key
                ExpressionAttributeValues: {
                    ":key": soundKey, // The value for the key
                },
                Limit: 1 // We only expect one item for a given key
            });

            try {
                // Execute the query asynchronously
                const result = await docClient.send(command);

                if (result.Items && result.Items.length > 0) {
                    // Item found in DynamoDB
                    const sound = result.Items[0]; // Contains attributes like title, streamUrl etc.
                    speakOutput = `Okay, playing ${sound.title}.`;
                   
                    /*
                    handlerInput.responseBuilder
                       .speak(speakOutput)
                       .addAudioPlayerPlayDirective('REPLACE_ALL', sound.streamUrl, sound.streamUrl, 0, undefined, { title: sound.title });
                    */
                } else {
                    // Item not found for the given key
                    speakOutput = `Sorry, I couldn't find "${soundNameSlot}". You could ask me to play the news or radio one.`;
                }
            } catch (error) {
                console.error("Error querying DynamoDB:", error);
                speakOutput = "Sorry, I had trouble accessing the sound library. Please try again.";
            }

        } else {
            // Slot was likely missing
            speakOutput = "Sorry, I didn't catch what you want to play. Please tell me the name of the sound.";
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(!soundKey || !speakOutput.startsWith("Okay, playing")) // End session if we found it, otherwise keep open
            .getResponse();
    }
};