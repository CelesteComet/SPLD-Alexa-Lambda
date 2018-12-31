const msg = require('../localization/en.json'); //with path

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(msg.WelcomeSpeech)
      .reprompt(msg.WelcomePrompt)
      .getResponse();
  },
};

module.exports = LaunchRequestHandler;

