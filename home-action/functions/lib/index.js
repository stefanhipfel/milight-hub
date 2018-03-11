"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const actions_on_google_1 = require("actions-on-google");
const request = require("request-promise-native");
process.env.DEBUG = 'actions-on-google:*';
const NAME_ACTION = 'send_command';
const COMMAND_ARGUMENT = 'command';
const LOCATION_ARGUMENT = 'location';
exports.Milight = functions.https.onRequest((req, res) => {
    const app = new actions_on_google_1.DialogflowApp({ request: req, response: res });
    console.log(JSON.stringify(req.body), 'BODY');
    function sendCommand(a) {
        const cmd = a.getArgument(COMMAND_ARGUMENT);
        const loc = a.getArgument(LOCATION_ARGUMENT);
        request.put('http://46.128.137.236:3000/kitchenlight/' + cmd)
            .then(() => {
            a.tell('Alright, turning ' +
                cmd + ' the lights in the' + loc);
        })
            .catch(err => {
            console.error(err);
        });
    }
    const actionMap = new Map();
    actionMap.set(NAME_ACTION, sendCommand);
    app.handleRequest(actionMap);
});
//# sourceMappingURL=index.js.map