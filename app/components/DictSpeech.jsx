import React, { PropTypes, Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import {fetchBotResponse} from '../reducers/index.jsx'
import { connect } from 'react-redux'


// this came with the component
const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Dictaphone extends Component {
  constructor(props){
    super(props)
    this.fetchBotResponse = props.fetchBotResponse
  }
  
  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props
    console.log('in Dict browser support:', this.props)
    if (!browserSupportsSpeechRecognition) {
      return null
    }
    return (
      <div>
        <button className="btn btn-default" onClick={resetTranscript}>Reset</button>
        <span>{transcript}</span>
      {/* this transcript is the transcrapied speech rendered on the page. Below is a Stop button. When clicked it classs the clickHandler which sends the text to fetchTExt and then to google and then we get the scores*/}
        <button className="btn btn-default" onClick={() => this.fetchBotResponse(`${transcript}`)}>send</button>
      </div>
    )
  }
}
Dictaphone.propTypes = propTypes

// const mapStateToProp = () => {

//     return{
//         transcript: PropTypes.string,
//         resetTranscript: PropTypes.func,
//         browserSupportsSpeechRecognition: PropTypes.bool
//     }


// }

const mapStateToProps = ({propTypes}) => ({propTypes})

const mapDispatchToProp = (dispatch) => {

    return{
        fetchBotResponse: (userText)=>{dispatch(fetchBotResponse(userText));}
    }


}

const Dict = connect(
  mapStateToProps,
  mapDispatchToProp)(SpeechRecognition(Dictaphone))


export default Dict




/*
clickHandler(sentence){
   console.log(sentence)
   const text = {
            content: sentence.transcript   //transcribed text is an object - sentence.transcript is a string
        }
    this.props.fetchText(text)
  }
*/



