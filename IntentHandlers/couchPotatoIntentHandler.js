const CouchPotatoIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' 
      && request.intent.name === 'CouchPotatoIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('You don\'t want to start your career? Have fun wasting away on the couch.')
      .getResponse();
  },
};

module.exports = CouchPotatoIntent;