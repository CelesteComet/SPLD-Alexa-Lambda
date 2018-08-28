'use strict';

/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */


// --------------- Helpers that build all of the responses -----------------------


const fakeResponse = [
    {
        "state": "CA",
        "retailerName": "WHEEL WORLD CYCLERY",
        "country": "US",
        "address": "4051 Sepulveda Blvd.",
        "phone": "(310) 391-5251",
        "postalCode": "90230",
        "city": "Culver City",
        "hours": "Mon-Thu 10-7, Fri 10-6:30, Sat 10-6, Sun 11-5",
        "distance": 1.3,
        "locatorId": 100008246,
        "latitude": 34.007246,
        "longitude": -118.413371,
        "retailerUrl": "http://wheelworld.com",
        "exactItem": {
            "sku": "67016-1004",
            "inventoryItemId": 1765216,
            "upc": "888818080090",
            "displayName": "Body Geometry Gel",
            "colorName": "Black/Neon Yellow",
            "size": "L",
            "miscPropName": null,
            "miscPropValue": null,
            "availableQty": 0,
            "stockStatus": "Warehouse"
        },
        "similarItems": []
    },
    {
        "retailerName": "CYNERGY CYCLES",
        "country": "USA",
        "address": "2300 SANTA MONICA BLVD",
        "phone": "310-857-1500",
        "postalCode": "90404",
        "city": "SANTA MONICA",
        "distance": 5.19450543161283,
        "locatorId": 100020459,
        "latitude": 34.0307975,
        "longitude": -118.4772955,
        "retailerUrl": "http://www.cynergycycles.com",
        "similarItems": [
            {
                "sku": "670E-1664",
                "inventoryItemId": 1206617,
                "upc": "719676210964",
                "displayName": "Body Geometry Gel",
                "colorName": "Black/Black",
                "size": "L",
                "miscPropName": null,
                "miscPropValue": null,
                "availableQty": 1,
                "stockStatus": "Y"
            }
        ],
        "retailerLastUpdateDate": "2017-02-15T09:22:19.153-08:00"
    },
    {
        "state": "CA",
        "retailerName": "BEVERLY HILLS BIKE SHOP",
        "address": "10546 W PICO BLVD",
        "phone": "310-275-2453",
        "postalCode": "90064",
        "city": "LOS ANGELES",
        "distance": 3.71,
        "locatorId": 100018038,
        "latitude": 34.0440734,
        "longitude": -118.4201348,
        "similarItems": []
    },
    {
        "state": "CA",
        "retailerName": "BIKE EFFECT",
        "address": "910 BROADWAY #100",
        "phone": "(310) 393-4348",
        "postalCode": "90401",
        "city": "SANTA MONICA",
        "distance": 5.44,
        "locatorId": 100022571,
        "latitude": 34.0188916,
        "longitude": -118.48855000000003,
        "similarItems": []
    },
    {
        "state": "CA",
        "retailerName": "JUST RIDE LA",
        "address": "1626 S. HILL ST.",
        "phone": "213-745-6783",
        "postalCode": "90015",
        "city": "LOS ANGELES",
        "distance": 8.17,
        "locatorId": 100021611,
        "latitude": 34.0340409,
        "longitude": -118.2647776,
        "similarItems": []
    },
    {
        "state": "CA",
        "retailerName": "SAFETY CYCLE",
        "address": "1014 N WESTERN AVE",
        "phone": "323-464-5765",
        "postalCode": "90029",
        "city": "LOS ANGELES",
        "distance": 8.37,
        "locatorId": 100008157,
        "latitude": 34.0889474,
        "longitude": -118.3091609,
        "similarItems": []
    },
    {
        "state": "CA",
        "retailerName": "BEACH CITIES CYCLE",
        "address": "5140 W. 190th St.",
        "phone": "310-318-6030",
        "postalCode": "90503",
        "city": "Torrance",
        "distance": 9.44,
        "locatorId": 100008203,
        "latitude": 33.8568348,
        "longitude": -118.3907692,
        "similarItems": []
    },
    {
        "state": "CA",
        "retailerName": "UNIVERSAL CYCLES",
        "address": "3717 CAHUENGA BLVD WEST",
        "phone": "818-980-7456",
        "postalCode": "91604",
        "city": "STUDIO CITY",
        "distance": 10.04,
        "locatorId": 100008159,
        "latitude": 34.1352809,
        "longitude": -118.3615051,
        "similarItems": []
    },
    {
        "state": "CA",
        "retailerName": "THE BIKE CONNECTION",
        "address": "13711 VENTURA BLVD",
        "phone": "818-995-5788",
        "postalCode": "91423",
        "city": "SHERMAN OAKS",
        "distance": 10.88,
        "locatorId": 100007467,
        "latitude": 34.148395,
        "longitude": -118.431643,
        "similarItems": []
    },
    {
        "state": "CA",
        "retailerName": "SAFETY CYCLE.",
        "address": "23112 HAWTHORNE BLVD",
        "phone": "310-375-4888",
        "postalCode": "90505",
        "city": "TORRANCE",
        "distance": 12.5,
        "locatorId": 100020562,
        "latitude": 33.8168506,
        "longitude": -118.3508976,
        "similarItems": []
    },
    {
        "state": "CA",
        "retailerName": "BURBANK BIKE SHOP",
        "address": "4400 W VICTORY BLVD",
        "phone": "818-848-6177",
        "postalCode": "91505",
        "city": "BURBANK",
        "distance": 13.43,
        "locatorId": 100008121,
        "latitude": 34.1848672,
        "longitude": -118.3587292,
        "similarItems": []
    },
    {
        "state": "CA",
        "retailerName": "GLENDALE CYCLERY",
        "address": "1250 W GLENOAKS BLVD STE A",
        "phone": "818-246-5551",
        "postalCode": "91201",
        "city": "GLENDALE",
        "distance": 13.65,
        "locatorId": 100008133,
        "latitude": 34.166016,
        "longitude": -118.2828395,
        "similarItems": []
    }
]

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to the Alexa Skills Kit sample. ' +
        'Please tell me your favorite color by saying, my favorite color is red';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Please tell me your favorite color by saying, ' +
        'my favorite color is red';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you for trying the Alexa Skills Kit sample. Have a nice day!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function createFavoriteColorAttributes(favoriteColor) {
    return {
        favoriteColor,
    };
}

/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
function setColorInSession(intent, session, callback) {
    const cardTitle = intent.name;
    const favoriteColorSlot = intent.slots.Color;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (favoriteColorSlot) {
        const favoriteColor = favoriteColorSlot.value;
        sessionAttributes = createFavoriteColorAttributes(favoriteColor);
        speechOutput = `I now know your favorite color is ${favoriteColor}. You can ask me ` +
            "your favorite color by saying, what's my favorite color?";
        repromptText = "You can ask me your favorite color by saying, what's my favorite color?";
    } else {
        speechOutput = "I'm not sure what your favorite color is. Please try again.";
        repromptText = "I'm not sure what your favorite color is. You can tell me your " +
            'favorite color by saying, my favorite color is red';
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getColorFromSession(intent, session, callback) {
    let favoriteColor;
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = false;
    let speechOutput = '';

    if (session.attributes) {
        favoriteColor = session.attributes.favoriteColor;
    }

    if (favoriteColor) {
        speechOutput = `Your favorite color is ${favoriteColor}. Goodbye.`;
        shouldEndSession = true;
    } else {
        speechOutput = "I'm not sure what your favorite color is, you can say, my favorite color " +
            ' is red';
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}


// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'MyColorIsIntent') {
        setColorInSession(intent, session, callback);
    } else if (intentName === 'WhatsMyColorIntent') {
        getColorFromSession(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else if (intentName === 'FindNearbyIntent') {
        handleBikeRequest(intent, session, callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when user wants a bike
 * 
 */
function handleBikeRequest(intent, session, callback) {
    const sessionAttributes = {};

    const speechOutput = `You want a brand new Specialized bicycle? You searched for ${intent.slots.ProductSearch.value}`;
    const shouldEndSession = true;
    const repromptText = null;

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));    
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};

