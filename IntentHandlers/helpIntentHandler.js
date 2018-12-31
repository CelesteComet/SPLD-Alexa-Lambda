const msg = require('../localization/en.json'); //with path

const HelpIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' 
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(msg.HelpSpeech)
      .reprompt(msg.HelpReprompt)
      .getResponse();
  },
};

module.exports = HelpIntentHandler;