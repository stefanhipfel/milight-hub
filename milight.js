const {MilightController, commandsV6} = require('node-milight-promise');
const commands = new Map();
commands.set("on", on);
commands.set("off", off);
commands.set("dimm", brightDown);
commands.set("brighten", brightUp);
commands.set("cooler", cooler);

const light = new MilightController({
  ip: "192.168.118.108",
  type: 'v6',
  port: '5987'
});

const zone = new Map();

zone.set("kitchen", 1);

async function init(loc) {
  await light.ready();
  light.sendCommands(commandsV6.white.link(zone.get(loc)));
}


async function on(loc) {
  try {
    await init();
    light.sendCommands(commandsV6.white.on(zone.get(loc)));
  } catch(err) {
    console.error(err);
    throw err;
  }
}

async function off(loc) {
  try {
    await init();
    light.sendCommands(commandsV6.white.off(zone.get(loc)));
  } catch(err) {
    console.error(err);
    throw err;
  }
}

async function brightUp(loc) {
  try {
    await init();
    light.sendCommands(commandsV6.white.brightUp(zone.get(loc)));
  } catch(err) {
    console.error(err);
    throw err;
  }
}

async function brightDown(loc) {
  try {
    await init();
    light.sendCommands(commandsV6.white.brightDown(zone.get(loc)));
  } catch(err) {
    console.error(err);
    throw err;
  }
}

async function warmer(loc) {
  try {
    await init();
    light.sendCommands(commandsV6.white.cooler(zone.get(loc)));
  } catch(err) {
    console.error(err);
    throw err;
  }
}

async function cooler(loc) {
  try {
    await init();
    light.sendCommands(commandsV6.white.warmer(zone.get(loc)));
  } catch(err) {
    console.error(err);
    throw err;
  }
}

async function close() {
  await light.close();
}

module.exports = {commands}