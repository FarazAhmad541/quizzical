import React, { useState } from "react";
import { GetAnswersArray } from "./HelperFunctions";
import { nanoid } from "nanoid";

const Context = React.createContext()

function ContextProvider({ children }) {
    const [questions, setQuestions] = useState([])
    const [quizEnded, setQuizEnded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [formData, setFormData] = useState({
        category: null,
        noOfQuestion: null,
        difficulty: null
    })

    //Function to fetch data from API and set the "questions" data in state
    async function fetchData() {

        const category = formData.category || 9
        const noOfQuestion = formData.noOfQuestion || 5
        const difficulty = formData.difficulty || "medium"

        const url = `https://opentdb.com/api.php?` +
            `&amount=${noOfQuestion}` +
            `&category=${category}` +
            `&difficulty=${difficulty}` +
            `&type=multiple`
            
        const res = await fetch(url)
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


    //Starts the quiz when "Start Quiz" button is clicked
    function startQuiz() {
        setIsLoading(true)
        fetchData()
        setQuizEnded(false)
    }

    //map() over the "questions" state and toggles the "isSelected" property to "true" or "false" 
    //of the respective answer Element
    function toggleSelect(questionID, answerId) {
        if (!quizEnded) {
            const newState = questions.map(question => {

                const newAnswersArray = question.options.map(ans => {
                    return ans.id === answerId
                        ? { ...ans, isSelected: !ans.isSelected }
                        : { ...ans, isSelected: false }
                })

                return question.id === questionID
                    ? {
                        ...question,
                        options: newAnswersArray
                    }
                    : question
            })
            setQuestions(newState)
            setIsLoading(false)
        }
    }

    //Checks the number of Correct Answers and sets the number of correct answers to "count" poperty in the state
    function CheckAnswers(data) {
        let correctAnswers = 0
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
            if (selected_Answers.includes(item)) correctAnswers++
        })
        setCount(correctAnswers)
    }

    //Ends the quiz and checks for number of correct answers
    function endQuiz() {
        setQuizEnded(true)
        CheckAnswers(questions)
    }

    //Restarts the quizz
    function restartQuiz() {
        setQuizEnded(false)
        setQuestions([])
    }


    return (
        <Context.Provider value={
            {
                questions,
                quizEnded,
                isLoading,
                count,
                formData,
                startQuiz,
                toggleSelect,
                endQuiz,
                CheckAnswers,
                restartQuiz,
                setFormData
            }
        }>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }