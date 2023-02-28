import { useContext } from 'react'
import { IntroComponent } from './IntroCompoent'
import Questions from './Questions'
import { Context } from './Context'
import { BounceLoader } from 'react-spinners'
import './App.css'

function App() {
  const {
    questions,
    endQuiz,
    restartQuiz,
    isLoading,
    quizEnded,
    count
  } = useContext(Context)

  console.log("app")

  return (
    <>
      <img src="\blobs (1).svg" alt="" className='blob-1' />
      <img src="\blobs.svg" alt="" className='blob-2' />
      {

        //If data is being fetched renders the "BounceLoader" Component otherwise renders the App
        !isLoading
          ?
          <main className='main-container'>
            {

              //if there is no question data in the state then "IntroComponent" Element is rendered
              //if data is present then displays the "Questions" Element
              questions.length === 0
                ? <IntroComponent />
                : <>
                  <Questions/>
                  {
                    //If the quiz has ended then results are displayed if not then "Check Answers" button is rendered
                    quizEnded
                      ?
                      <div className='result-container'>
                        <p className="result-text">You answered {count} / {questions.length} questions correctly.</p>
                        <button className="start-btn" onClick={restartQuiz}>Restart Quiz</button>
                      </div>
                      :
                      <button className="check-answers" onClick={endQuiz}>Check Answers</button>
                  }
                </>
            }
          </main>
          :
          <BounceLoader
            color="#4D5B9E"
            cssOverride={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)"
            }}
            size={75}
            speedMultiplier={1}
          />

      }
    </>
  )
}

export default App
