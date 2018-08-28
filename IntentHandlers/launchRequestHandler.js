const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Welcome to Decision Tree. I will recommend the best job for you. Do you want to start your career or be a couch potato?')
      .reprompt('Do you want a career or to be a couch potato?')
      .getResponse();
  },
};

module.exports = LaunchRequestHandler;

