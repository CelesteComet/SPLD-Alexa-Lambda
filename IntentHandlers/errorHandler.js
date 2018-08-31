const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const request = handlerInput.requestEnvelope.request;

    console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);
    console.log(`Error handled: ${error}`);

    return handlerInput.responseBuilder
      .speak(`Sorry, I can not understand the command.  Please say again.${error}`)
      .reprompt('Sorry, I can not understand the command.  Please say again.')
      .getResponse();
  },
};

module.exports = ErrorHandler;