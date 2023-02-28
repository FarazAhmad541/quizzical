import { DecodeHtml } from "./HelperFunctions"
import AnswerElement from "./AnswerElement"


//Takes the "options" i.e answers, prop passed to it and returns a div 
//with the question heading and all the options i.e answers
export default function QuestionElement(props) {
    const answerElements = props.options.map(option => (
        <AnswerElement
            key={option.id}
            option={option}
            correctAnswer={props.correctAnswer}
            questionId={props.id}
        />
    ))

    return (
        <div className="question-element">
            <h2 className="question-heading">{DecodeHtml(props.question)}</h2>
            <div className="answer-element">
                {answerElements}
            </div>
        </div>
    )
}