'use strict'
const api = require('express').Router()
const db = require('../db')
const fetch  = require('isomorphic-fetch')
let Wit = require('node-wit').Wit
let interactive = require('node-wit').interactive

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/:userText', (req, res) => {
	const sessionId = 'my-user-session-42'
	let message = req.params.userText;
	const client = new Wit({accessToken: 'HII4D2BEC7NPXF6YLXIO2GLO4EBRLS6U', actions});
	//interactive(client,actions);
	console.log('checking actions');
    const context0 = {};
    client.runActions(sessionId, message, context0)
    .then((context1) => {
      console.log('retuAction returns', context1)
      res.send(context1)
    })
    .catch((e) => {
      console.log('Oops! Got an error: ' + e);
    });


 //  if(message.indexOf('like') > -1){
	// 	console.log('checking actions');
	// 	const context0 = {};
	// 	client.runActions(sessionId, message, context0)
	// 	.then((context1) => {
	// 	  res.send(context1)
	// 	})
	// 	.catch((e) => {
	// 	  console.log('Oops! Got an error: ' + e);
	// 	});

	// }
	// else{
	// 	client.converse(sessionId, message, {})
	// 	.then((context1) => {
	//  	 //console.log('The session state is now: ' + JSON.stringify(context1));
	//  	 res.send(context1)
	//  	 // return client.runActions(sessionId, 'and in Brussels?', context1);
	// 	})
	// }

	

	//checking actions
	
	// const token = 'HII4D2BEC7NPXF6YLXIO2GLO4EBRLS6U'
	// fetch(
	//   'https://api.wit.ai/message?v=20141022&session_id=abcd1234&q=hello',
	//   {
	//     method: 'GET',
	//     headers: {Authorization: `Bearer ${token}`}
	//   }
	// )
	// .then(response => response.json())
	// .then((json)=>{
	// 	res.send(json)

	// });
	// //res.send({hello: 'world'}))
})

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  send(request, response) {
    return new Promise(function(resolve, reject) {
        console.log(JSON.stringify(response));
        return resolve();
      });
    // const {sessionId, context, entities} = request;
    // const {text, quickreplies} = response;
    // console.log('user said...', request.text);
    // console.log('sending...', JSON.stringify(response));
    // console.log('context',context);


  },
  detectLike({context, entities}){
  	console.log('in detect context', context, entities);
    return new Promise(function(resolve, reject) {
    	const character = entities && entities['charecters'] &&
	    Array.isArray(entities['charecters']) &&
	    entities['charecters'].length > 0 &&
	    entities['charecters'][0].value;
	    
      //const character = firstEntityValue(entities, 'charecters');
      if (character) {
        switch (character) {
          case 'Flying Dutchman':
            context.like = 'drink soles';
            context.msg = `${character} likes to dring soles`;
            break;
          case 'Plankton':
            context.like = 'steal the krabby patty secret formula';
            context.msg = `${character} likes to steal the krabby patty secret formula`;
            break;
          case 'Patrick':
            context.like = 'doing nothing';
            context.msg = `${character} likes doing nothing`;
            break;
          case 'Gary':
            context.like = 'going on a snail race';
            context.msg = `${character} likes going on a snail race`;
            break;
          case 'squidward':
            context.like = 'playing the Clarinet';
            context.msg = `${character} likes playing the Clarinet`;
            break;
          case 'spongebob':
            context.like = 'blowing bubbles'
            context.msg = `${character} likes blowing bubbles`;
            break;
          case 'Karen':
            context.like = 'telling Plankton what to do';
            context.msg = `${character} likes telling Plankton what to do`;
            break;
          case 'Sandy':
            context.like = 'doing Karate'
            context.msg = `${character} likes doing Karate`;
            break;
          case 'Mr. Krabs':
            context.like = 'counting his money';
            context.msg = `${character} likes counting his money`;
            break;
          default:
            context.msg = 'Mmmmm...I dont know this character';
            break;
          }

        //context.movie = movie_title;
      }
      else
        context.like = 'testing';
      //call the API here
      return resolve(context);
    });
  },
  shuffleCharacters({context, entities}){
  	return new Promise(function(resolve, reject) {
  		var characters = ['Spongebob', 'Flying Dutchman', 'Patrick Star', 'squidward', 'Sandy', 'Gary'];
  		var shuffleIndex = Math.floor(Math.random() * characters.length);
  		context.character = characters[shuffleIndex];
  		context.msg = `I like ${context.character}`
  		return resolve(context);
  	});
  },
  whyCharacter({context, entities}){
  	console.log('in why context', context);
  	return new Promise(function(resolve, reject) {
  		switch(context.character){
  			case 'Spongebob':
  				context.reason = 'because he is funny and silly';
  				break;
  			case 'Flying Dutchman':
  				context.reason = 'because he always help Spongebob';
  				break;
  			case  'Patrick Star':
  				context.reason = 'because he is a good friend';
  				break;
  			case 'squidward':
  				context.reason = 'because he plays the Clarient beautifully';
  				break;
  			case 'Sandy':
  				context.reason = 'because she makes the best nutty butter';
  				break;
  			case 'Gary':
  				context.reason = 'because he won the snail race!!';
  				break;
  			default:
  				context.reason = 'mmmmm....no special reason';
  				break;
			}
  		return resolve(context);
  	});
  },

  ['compute-end']({context}){
    return new Promise(function(resolve, reject) {
      context.endingPhrase = 'nice talking with you';
      return resolve(context);
    });
    
  }
  
};

module.exports = api


