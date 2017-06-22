
import axios from 'axios'
var synth = window.speechSynthesis;

/* ------------------ speech functions --------------- */
function speak(message){
  var utterThis = new SpeechSynthesisUtterance(message);
  utterThis.pitch = 0.9;
  utterThis.rate = 1;
  synth.speak(utterThis);
}


/* ------------------ actions ------------------------ */
//const SET_USER_TEXT = 'SET_USER_TEXT'
const SET_BOT_TEST = 'SET_BOT_TEST'
const SET_SPEECH_ON = 'SET_SPEECH_ON'
const SET_SPEECH_OFF = 'SET_SPEECH_OFF'


/* ------------------ action creators ---------------- */
export const setBotText = (txt) => ({ type: SET_BOT_TEST, txt })
export const setSpeechOn = (speechState) => ({ type: SET_SPEECH_ON, speechState})
export const setSpeechOff = (speechState) => ({type: SET_SPEECH_OFF, speechState})



const initialState = {
	userText: '',
	botText: '',
	speech: false
}


const rootReducer = function(state = initialState, action) {
  switch(action.type) {
  	case SET_BOT_TEST:
  		return Object.assign({}, state, {botText: action.txt})
  	case SET_SPEECH_ON:
  		return Object.assign({}, state, {speech: action.speechState})
  	case SET_SPEECH_OFF:
  		return Object.assign({}, state, {speech: action.speechState})

	default: return state
  }
};

/* ------------------ dispatchers ------------------- */
export const fetchBotResponse = (userTxt) => 
	dispatch => {
		console.log('in fetch user text', userTxt)
		axios.get(`/api/${userTxt}`, {
			userText: userTxt,
		})
		.then( res => {
			console.log('in fetch res', res)
			// if(res.data.like)
			// 	return dispatch(setBotText(res.data.like))
			// else
			// 	return dispatch(setBotText(res.data.msg))
			speak(res.data.msg);
			return dispatch(setBotText(res.data.msg));

		})
		.catch(err => console.error('fail to get BOT response', err))
}

export const setSpeech = (speechState) => {
	dispatch => {
		console.log('in Set speech', speechState)
		if(speechState == true)
		return dispatch(setSpeechOn(speechState))
	else
		return dispatch(setSpeechOff(speechState))

	}
	
}

export default rootReducer
