const lameJokes = [
  "My mate punched a driver for pulling into the bike lane... He's a bit of a cycle-path.",
  "Everytime my bike hurts me, I punch it right back... It's a vicious cycle.",
  "I bought a new wheel from the local bike shop, but it was missing something in the middle... When I complained, they sent me straight to their spokes-person"
];

function getRandomJoke(lameJokes) {
  return lameJokes[Math.floor(Math.random() * lameJokes.length)];
}


const jokeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'JokeIntent';
  },
  handle(handlerInput) {
    const speechText = getRandomJoke(lameJokes);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

module.exports = jokeIntentHandler;