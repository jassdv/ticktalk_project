import React from 'react'
import Navbar from './Navbar'
import {fetchBotResponse} from '../reducers/index.jsx'
import {connect} from 'react-redux'




const App = ({fetchBotResponse, botText}) => {
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
        			<h5>{botText}</h5> 
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
        fetchBotResponse: (userText)=>{dispatch(fetchBotResponse(userText));}
    }


}

const AppComponent = connect(
  (state) => ({ botText: state.botText }),
  mapDispatchToProp)(App)


export default AppComponent


/*
<Navbar />
      <div id="body">
        {children}
      </div>

       <div>
        <h1> TickTalk </h1>
      </div>
*/