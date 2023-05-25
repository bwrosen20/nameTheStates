import '../App.css';
import React, {useEffect, useState} from 'react'
import State from './State'

function App() {

  const stateArray=['alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','new hampshire','new jersey','new mexico','new york','north carolina','north dakota','ohio','oklahoma','oregon','pennsylvania','rhode island','south carolina','south dakota','tennessee','texas','utah','vermont','virginia','washington','west virginia','wisconsin','wyoming']
 
 
  const [input,setInput]=useState("")
  const [states,setStates]=useState([])
  const [timeRemaining,setTimeRemaining]=useState(10)
  const [count,setCount]=useState(false)
  const [finished,setFinished]=useState(false)
  


   useEffect(()=>{

    if (timeRemaining===0 || states.length===50){
      endTimer()
    } 
    const timer=setTimeout(()=>{
  
      if (count){
        setTimeRemaining(prev=>prev-1)
      }

      return function (){
        clearTimeout(timer)
      }
  
    },1000)

   },[timeRemaining,count])


  function startTimer(){
    setCount(true)
    
  }
  
  function endTimer(){
    setCount(false)
    setFinished(true)
  }

  function handleChange(event){
    setInput(event.target.value)
  }

  function addState(event){
    event.preventDefault()
    if (stateArray.includes(input.toLowerCase())&&(states.includes(input)==false)){
      setStates([...states,input])
      setInput("")
    }
  }

  const missedStates=stateArray.filter((state)=>{
    return (states.includes(state)==false)
})

  return (

    <span>
      {finished ? 
      <div className="app">
      {missedStates.length>0 ? 
      <div><h1>You missed {missedStates.length} state{missedStates.length===1 ? null : "s"}</h1>{missedStates.map((state)=><State state={state}/>)} 
      </div>: <h1>Wooooo!!!!! You did it!!!</h1>}
  </div>:
    <div> 
      <div className="app">
      <h1>{50-states.length} State{states.length!==49 ? "s" : null} Left!</h1>
      {count ?
      <form onSubmit={addState}>
        <input 
        type="text"
        autoFocus
        value={input}
        onChange={handleChange}
        placeholder="Type Here"
        ></input>
        <button>Submit</button>
       </form>:
        <button onClick={startTimer}>Start</button> }
       
       <h1>{Math.trunc(timeRemaining/60)}:{timeRemaining%60<10 ? "0" : null}{(timeRemaining%60)}</h1>
        </div>
      <div className="stateContainer">
        {states.map((state)=><State state={state}/>)}
      </div>
    </div>
    
}
    </span>
  )
}

export default App;



//const stateArray=['alabam','alask','arizon','arkansa','californi','colorad','connecticu','delawar','florid','georgi','hawai','idah','illinoi','indian','iow','kansa','kentuck','louisian','main','marylan','massachusett','michiga','minnesot','mississipp','missour','montan','nebrask','nevad','new hampshir','new jerse','new mexic','new yor','north carolin','north dakot','ohi','oklahom','orego','pennsylvani','rhode islan','south Carolin','south Dakot','tennesse','texa','uta','vermon','virgini','washingto','west virgini','wisconsi','wyomin']