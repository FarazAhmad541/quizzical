import QuestionElement from "./QuestionElement"
import { useContext } from "react"
import { Context } from "./Context"


//maps over the questions data in "Context" Component and returns a "QuestionElement" for every item in "questions" Array
export default function Questions() {
    const { questions } = useContext(Context)

    const questionElements = questions.map(item => {
        const { question, correctAnswer, options, id } = item
        return <QuestionElement
            key={id}
            id={id}
            question={question}
            options={options}
            correctAnswer={correctAnswer}
        />
    })

    return (
        <>
            {questionElements}
        </>
    )
}