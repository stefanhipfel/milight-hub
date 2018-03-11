const express = require('express');
const bodyParser = require('body-parser');
const {commands} = require('./milight');
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post('/action', async (req, res) => {
    const result = req.body.result;
    let cmd = result.parameters.command;
    let loc = result.parameters.location;
    cmd = cmd.toLowerCase();
    loc = loc.toLowerCase();

    if (commands.has(cmd)) {
        await commands.get(cmd)(loc);
        res.status(200).json({
            speech: 'Alright, turning ' + cmd + ' the lights in the ' + loc,
            displayText: 'Alright, turning ' + cmd + ' the lights in the ' + loc,
            source: 'Alright, turning ' + cmd + ' the lights in the ' + loc
        });
        return;
    }
    res.status(200).json({
        speech: 'Sorry I have problems to send your command',
        displayText: 'Sorry I have problems to send your command',
        source: 'Sorry I have problems to send your command'
    });
});

server.listen(3000, () => console.log('Example app listening on port 3000!'))