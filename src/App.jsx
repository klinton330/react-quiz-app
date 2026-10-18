import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import questionData from './assets/questions.json'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore]=useState(0);
  const [showScore,setShowScore]=useState(false)
  const [timer,setTimer]=useState(10)

  const handleRestartQuiz=()=>{
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
  }
// React runs the effect because the component has rendered for the first time.
// If the score screen is displayed, stop the effect.
// If the timer reaches 0, move to the next question and reset the timer to 10 seconds.
// If it is the last question, display the final score.
// Otherwise, decrease the timer every second using setInterval.
// Clear the previous interval during cleanup to prevent multiple timers
 useEffect(() => {
  if (showScore) return;

  if (timer === 0) {
    if (currentQuestion < questionData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }

    return;
  }

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer, showScore, currentQuestion, questionData.length]);

  const handleAnswerClick= (selectedOption)=>{
    if(selectedOption===questionData[currentQuestion].correctOptions){
      setScore((prevScore)=>prevScore+1)
    }
    if(currentQuestion<questionData.length-1){
      setCurrentQuestion((currentQuestion)=>(currentQuestion+1))
      setTimer(10)
    }
    else{
      setShowScore(true)
    }
  }
  return (
    <>
      <div className="quiz-app">
        <h1>Velachi Quiz Competition</h1>
        {showScore? (
        <div className="score-section">
           <h3>Test has been Completed!!</h3>
          <h2>Your Score {score}/{questionData.length}</h2> 
          <button onClick={handleRestartQuiz}>Restart</button>
        </div>): (
        <div className="question-section">
          <h2>Question {currentQuestion+1}</h2>
          <p>{questionData[currentQuestion].question}</p>
          <div className="options">
            {questionData[currentQuestion].options.map((option,index)=>(
              <button key={index} onClick={()=>handleAnswerClick(option)}>{option}</button>
            ))}
          </div>
          <div className="timer">
            Time Left: <span>{timer}s</span> 
          </div>
        </div>
        )}
         <p className="copyright">
        Designed and Developed by <span>Velachi</span>
      </p>
      </div>
        
    </>
  )
}

export default App
