
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


/* ------------------ action creators ---------------- */
export const setBotText = (txt) => ({ type: SET_BOT_TEST, txt })



const initialState = {
	userText: '',
	botText: ''
}


const rootReducer = function(state = initialState, action) {
  switch(action.type) {
  	case SET_BOT_TEST:
  		return Object.assign({}, state, {botText: action.txt})
	default: return state
  }
};

/* ------------------ dispatchers ------------------- */
export const fetchBotResponse = (userTxt) => 
	dispatch => {
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

export default rootReducer
