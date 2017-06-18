'use strict';

let Wit=null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;

}

const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/basic.js HII4D2BEC7NPXF6YLXIO2GLO4EBRLS6U');
    process.exit(1);
  }
  return process.argv[2];
})();

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    console.log('user said...', request.text);
    console.log('sending...', JSON.stringify(response));
  },
};

console.log('wit', Wit);
const client = new Wit({accessToken, actions});
interactive(client);