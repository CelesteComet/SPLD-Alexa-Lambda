const { getAllSlotNames, getSlotValues } = require('../utils/alexaUtils');

const missionControlFAQHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;  
    console.log(request.dialogState);
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MissionControlFAQIntent';
  },
  handle(handlerInput) {
    const slotValue = handlerInput.requestEnvelope.request.intent.slots.question;

    console.log(slotValue);

    /*
    for (const slotName of slotNames) {
      const currentSlot = currentIntent.slots[slotName];    
      console.log(currentSlot);
    }
    */


    console.log("HANDLING MISSION CONTROL");
    console.log(handlerInput);
    console.log("HANDLER INPUT");

    const question = (handlerInput.intent.slots.toName.value ? this.event.request.intent.slots.toName.value.toLowerCase() : null);    
    console.log(question);
    console.log("question should've been out");

    return handlerInput.responseBuilder
      .speak("Hello, I am mission control.")
      .getResponse();
  }
};

module.exports = missionControlFAQHandler;