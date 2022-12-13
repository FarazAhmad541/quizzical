import Question from './components/Question'
import './App.css'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import GetAnswersArray from './components/GetAnswersArray'
import { BounceLoader } from 'react-spinners'

function App() {
  const [questions, setQuestions] = useState([])
  const [quizEnded, setQuizEnded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  //Function to fetch the data from API and assign it to the "question" state
  async function fetchData() {
    const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple')
    const data = await res.json()
    const questionsData = data.results.map(item => {
      const { question, correct_answer } = item
      return {
        id: nanoid(),
        question: question,
        options: GetAnswersArray(item),
        correctAnswer: correct_answer
      }
    })
    setQuestions(() => questionsData)
    setIsLoading(false)
  }

  function startQuiz(){
    setIsLoading(true)
    fetchData()
  }

  //Function to select answers
  function toggleSelect(updatedQuestion) {
    const newState = questions.map(question => {
      return question.id === updatedQuestion.id ? updatedQuestion : question
    })
    setQuestions(newState)
  }

  //Function to Compare Selected Answers with Correct Answers
  function CheckAnswers(data) {
    let count = 0
    let correct_Answers = []
    let selected_Answers = []

    data.map(question => {
      correct_Answers.push(question.correctAnswer)
      question.options.map(option => {
        if (option.isSelected) {
          selected_Answers.push(option.answer)
        }
      })

    })
    correct_Answers.map(item => {
      if (selected_Answers.includes(item)) count++
    })
    return `You answered ${count}/${data.length} questions correctly`
  }



  //Function to Restart Quiz
  function restartQuiz() {
    setQuizEnded(false)
    setIsLoading(true)
    fetchData()
  }

  //Maps over the current state and creates an Array of Elements i.e. Questions
  const questionElements = questions.map(item => {
    const { question, correctAnswer, options, id } = item
    return <Question
      key={id}
      id={id}
      quizEnded={quizEnded}
      question={question}
      options={options}
      correctAnswer={correctAnswer}
      toggleSelect={toggleSelect}
    />
  })

  return (
    <>
      <img src="blobs (1).svg" alt="" className='blob-1' />
      <img src="blobs.svg" alt="" className='blob-2' />
      {
        questions.length === 0
          ?
          <div className="intro-container">
            <h1 className="intro-heading">Quizzical</h1>
            <p className="intro-text">Test Your Knowledge</p>
            <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
          </div>
          :
          !isLoading
            ?
            <main className="main-container">
              {questionElements}
              {
                quizEnded
                  ?
                  <div className='result-container'>
                    <p className="result-text">{CheckAnswers(questions)}</p>
                    <button className="start-btn" onClick={restartQuiz}>Restart Quiz</button>
                  </div>
                  : <button className="check-answers" onClick={() => setQuizEnded(true)}>Check Answers</button>
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
