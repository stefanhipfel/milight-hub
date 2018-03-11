import * as functions from 'firebase-functions';
import { DialogflowApp } from 'actions-on-google';
import * as request from 'request-promise-native';

process.env.DEBUG = 'actions-on-google:*';

const NAME_ACTION = 'send_command';
const COMMAND_ARGUMENT = 'command';
const LOCATION_ARGUMENT = 'location';

export const Milight = functions.https.onRequest((req, res) => {
    const app = new DialogflowApp({request: req, response: res});

    console.log(JSON.stringify(req.body), 'BODY');

    function sendCommand (a: DialogflowApp) {
        const cmd = a.getArgument(COMMAND_ARGUMENT);
        const loc = a.getArgument(LOCATION_ARGUMENT);
        request.put('http://46.128.137.236:3000/kitchenlight/'+cmd)
        .then(() => {
            a.tell('Alright, turning ' +
          cmd + ' the lights in the' + loc);
        })
        .catch(err => {
            console.error(err);
        })
    }
    const actionMap = new Map();
    actionMap.set(NAME_ACTION, sendCommand);

    app.handleRequest(actionMap);
});