import React from 'react'
import Navbar from './Navbar'
import Dict from './DictSpeech'
import {fetchBotResponse, setSpeech} from '../reducers/index.jsx'
import {connect} from 'react-redux'




const App = ({fetchBotResponse, setSpeech, botText, speech}) => {
	console.log('got to app')

  return (
  	<div className="App">
      <Navbar />
    <div className="container">
    <div>
        <h1> TickTalk </h1>
        <div className="form-group">
        	<form className="col-sm-6" onSubmit={evt => {
        		evt.preventDefault()
        		fetchBotResponse(evt.target.user_message.value)

        	}}>
        		<div> 
        			<h5>Your Message</h5>
          			<input type="text" name="user_message" className="form-control"/>
        		</div>
        		<button type="submit" className="btn btn-default">send your message</button>
        		<div>
        			<h5>Your computer friend says:</h5>
        			<h5 id="bot_text">{botText}</h5> 
        		</div>
        	</form>
         </div>
         
      </div>
     </div>
     </div>
  )
}



const mapDispatchToProp = (dispatch) => {

    return{
        fetchBotResponse: (userText)=>{dispatch(fetchBotResponse(userText));},
        setSpeech: (speechState) => {dispatch(setSpeech(speechState))}

    }


}

const AppComponent = connect(
  (state) => ({ 
    botText: state.botText,
    speech: state.speech
     }),
  mapDispatchToProp)(App)


export default AppComponent


/*
<br></br>
         <div id="dict">
          <Dict />
         </div>
*/