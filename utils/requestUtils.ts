// src/utils/requestUtils.ts
import { HandlerInput } from 'ask-sdk-core';
import { IntentRequest } from 'ask-sdk-model';

/**
 * Safely retrieves the value of a slot from an IntentRequest.
 * Handles cases where slots might be missing or the request isn't an IntentRequest.
 *
 * @param handlerInput The handler input object.
 * @param slotName The name of the slot to retrieve.
 * @returns The slot value as a string, or undefined if not found.
 */
export function getSlotValue(handlerInput: HandlerInput, slotName: string): string | undefined {
    const request = handlerInput.requestEnvelope.request;
    // Check if it's an IntentRequest and slots exist
    if (request.type === 'IntentRequest' && request.intent.slots) {
        const slot = request.intent.slots[slotName];
        // Check if the slot exists and has a value
        if (slot && slot.value) {
            return slot.value;
        }
    }
    return undefined; // Return undefined if any check fails
}