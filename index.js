/**
    Copyright 2017-2018 Amazon.com, Inc. and its affiliates. All Rights Reserved.
    Licensed under the Amazon Software License (the "License").
    You may not use this file except in compliance with the License.
    A copy of the License is located at
      http://aws.amazon.com/asl/
    or in the "license" file accompanying this file. This file is distributed
    on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express
    or implied. See the License for the specific language governing
    permissions and limitations under the License.
    This skill demonstrates how to use Dialog Management to delegate slot
    elicitation to Alexa. For more information on Dialog Directives see the
    documentation: https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html
    This skill also uses entity resolution to define synonyms. Combined with
    dialog management, the skill can ask the user for clarification of a synonym
    is mapped to two slot values.
 **/

/* eslint-disable  func-names */
/* eslint-disable  no-restricted-syntax */
/* eslint-disable  no-loop-func */
/* eslint-disable  consistent-return */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const { getAllSlotNames, getSlotValues } = require('./utils/alexaUtils');
const msg = require('./localization/en.json'); //with path

const JokeIntent = require('./IntentHandlers/jokeIntentHandler');

/* INTENT HANDLERS */

const slotsToOptionsMap = {
  'strong-road-rich-climbing': 'S-Works Tarmac',
  'strong-road-rich-aero': 'S-Works Venge',
  'strong-road-rich-both': 'S-Works Crux',
  'strong-road-poor-climbing': 'Allez',
  'strong-road-poor-aero': 'Shiv',
  'strong-road-poor-both': 'Allez',
  'strong-mountain-rich-climbing': 'S-Works Stumpjumper',
  'strong-mountain-rich-aero': 'S-Works Stumpjumper',
  'strong-mountain-rich-both': 'S-Works Stumpjumper',
  'strong-mountain-poor-climbing': 'Stumpjumper',
  'strong-mountain-poor-aero': 'Stumpjumper',
  'strong-mountain-poor-both': 'Stumpjumper',
  'weak-road-rich-climbing': 'Turbo Vado 6.0',
  'weak-road-rich-aero': 'Turbo Vado 6.0',
  'weak-road-rich-both': 'Turbo Vado 6.0',
  'weak-road-poor-climbing': 'Turbo Vado 2.0',
  'weak-road-poor-aero': 'Turbo Vado 2.0',
  'weak-road-poor-both': 'Turbo Vado 2.0',
  'weak-mountain-rich-climbing': 'S-Works Turbo Levo',
  'weak-mountain-rich-aero': 'S-Works Turbo Levo',
  'weak-mountain-rich-both': 'S-Works Turbo Levo',
  'weak-mountain-poor-climbing': 'Turbo Levo',
  'weak-mountain-poor-aero': 'Turbo Levo',
  'weak-mountain-poor-both': 'Turbo Levo'
};

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



const InProgressRecommendationIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'RecommendationIntent'
      && request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    let prompt = '';

    const allSlotNames = getAllSlotNames(handlerInput);

    for (const slotName of allSlotNames) {

      const currentSlot = currentIntent.slots[slotName];

      if (currentSlot.confirmationStatus !== 'CONFIRMED'
                && currentSlot.resolutions
                && currentSlot.resolutions.resolutionsPerAuthority[0]) {

        if (currentSlot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_MATCH') {
          if (currentSlot.resolutions.resolutionsPerAuthority[0].values.length > 1) {
            prompt = 'Which would you like';
            const size = currentSlot.resolutions.resolutionsPerAuthority[0].values.length;

            currentSlot.resolutions.resolutionsPerAuthority[0].values
              .forEach((element, index) => {
                prompt += ` ${(index === size - 1) ? ' or' : ' '} ${element.value.name}`;
              });

            prompt += '?';

            return handlerInput.responseBuilder
              .speak(prompt)
              .reprompt(prompt)
              .addElicitSlotDirective(currentSlot.name)
              .getResponse();
          }
        } else if (currentSlot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH') {
          if (requiredSlots.indexOf(currentSlot.name) > -1) {
            prompt = `What ${currentSlot.name} are you looking for`;

            return handlerInput.responseBuilder
              .speak(prompt)
              .reprompt(prompt)
              .addElicitSlotDirective(currentSlot.name)
              .getResponse();
          }
        }
      }
    }

    // Initial Prompt
    return handlerInput.responseBuilder
      .addDelegateDirective(currentIntent)
      .getResponse();
  },
};

const CompletedRecommendationIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'RecommendationIntent'
      && request.dialogState === 'COMPLETED';
  },
  handle(handlerInput) {
    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;

    const slotValues = getSlotValues(filledSlots);
    console.log("WORKS UP TO HERE");
    let strength, terrain, wealth, ridingStyle;
    strength = slotValues.riderStrength.resolved;
    terrain = slotValues.preferredTerrain.resolved;
    wealth = slotValues.wealth.resolved;
    ridingStyle = slotValues.ridingStyle.resolved;


    const key = `${strength}-${terrain}-${wealth}-${ridingStyle}`;

    //const occupation = options[slotsToOptionsMap[key]];
    const recommendedBike = slotsToOptionsMap[key];

    const NLPMapping = {
      strong: 'strong',
      weak: 'weak',
      rich: 'fancy pants aristocratic',
      poor: 'poor pleabian',
      aero: 'riding fast on flats and trying to race cars',
      climbing: 'climbing up hills just to crash on the descent',
      both: 'cycling for the sake of cycling',
      road: 'car roads without bike lanes',
      mountain: 'dirty dirt roads',
      both: 'both skinny and fat tire bikes'
    };

    console.log("WERKS HERE");

    let speechOutput = `So you're a ${NLPMapping[strength]} ${NLPMapping[wealth]} rider who enjoys ${NLPMapping[ridingStyle]} riding on ${NLPMapping[terrain]}.`
    speechOutput += ` I would recommend you buy an ${slotsToOptionsMap[key]} at your nearest Specialized dealer.`;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  },
};

const HelpHandler = {
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

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Bye')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};


const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

/* CONSTANTS */

const skillBuilder = Alexa.SkillBuilders.custom();

const requiredSlots = [
  'preferredTerrainType',
  'riderStrengthType',
  'wealthType',
  'ridingStyle'
];


/*
  if it includes weakling, remove everything but bikes with turbo
  if it includes poor, 

  
  const bikes = 'Turbo Levo', 'Turbo Vado', 'Turbo Como', 
  'Venge', 'Tarmac', 'Roubaix'
  'S-Works Venge', 'S-Works Tarmac', 'Roubaix'
*/


/*
const slotsToOptionsMap = {
  'unimportant-introvert-low-animals': 20,
  'unimportant-introvert-low-people': 8,
  'unimportant-introvert-high-animals': 1,
  'unimportant-introvert-high-people': 4,
  'unimportant-extrovert-low-animals': 10,
  'unimportant-extrovert-low-people': 3,
  'unimportant-extrovert-high-animals': 11,
  'unimportant-extrovert-high-people': 13,
  'somewhat-introvert-low-animals': 20,
  'somewhat-introvert-low-people': 6,
  'somewhat-introvert-high-animals': 19,
  'somewhat-introvert-high-people': 14,
  'somewhat-extrovert-low-animals': 2,
  'somewhat-extrovert-low-people': 12,
  'somewhat-extrovert-high-animals': 17,
  'somewhat-extrovert-high-people': 16,
  'very-introvert-low-animals': 9,
  'very-introvert-low-people': 15,
  'very-introvert-high-animals': 17,
  'very-introvert-high-people': 7,
  'very-extrovert-low-animals': 17,
  'very-extrovert-low-people': 0,
  'very-extrovert-high-animals': 1,
  'very-extrovert-high-people': 5,
};
*/

const options = [
  { name: 'Actor', description: '' },
  { name: 'Animal Control Worker', description: '' },
  { name: 'Animal Shelter Manager', description: '' },
  { name: 'Artist', description: '' },
  { name: 'Court Reporter', description: '' },
  { name: 'Doctor', description: '' },
  { name: 'Geoscientist', description: '' },
  { name: 'Investment Banker', description: '' },
  { name: 'Lighthouse Keeper', description: '' },
  { name: 'Marine Ecologist', description: '' },
  { name: 'Park Naturalist', description: '' },
  { name: 'Pet Groomer', description: '' },
  { name: 'Physical Therapist', description: '' },
  { name: 'Security Guard', description: '' },
  { name: 'Social Media Engineer', description: '' },
  { name: 'Software Engineer', description: '' },
  { name: 'Teacher', description: '' },
  { name: 'Veterinary', description: '' },
  { name: 'Veterinary Dentist', description: '' },
  { name: 'Zookeeper', description: '' },
  { name: 'Zoologist', description: '' },
];

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    JokeIntent,
    InProgressRecommendationIntent,
    CompletedRecommendationIntent,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler    
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();