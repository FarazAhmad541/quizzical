import { useContext } from "react"
import { DecodeHtml } from "./HelperFunctions"
import { Context } from "./Context"

export default function AnswerElement(props) {
    const { toggleSelect, quizEnded } = useContext(Context)
    const { option, correctAnswer } = props

    //Checks for correct answers & returns a classname accordingly to display reletive styles
    function getClassName() {
        let className = ''
        if (option.isSelected && option.answer != correctAnswer) {
            className = "answer-wrong"
        } else if (option.answer === correctAnswer) {
            className = "answer-selected"
        } else {
            className = "answer-notSelected"
        }
        return className
    }

    //Conditionally renders the correct styles i.e. answers is selected or not
    const styles = {
        backgroundColor: props.option.isSelected ? "#D6DBF5" : "#F5F7FB",
        border: props.option.isSelected ? "1.5px solid #D6DBF5" : "1.5px solid #4D5B9E"
    }

    return (
        <>
            {
                //If quiz has ended checks for 'quizEnded' state from "Context" and renders
                //the proper "answer" 
                quizEnded
                    ? <p className={getClassName()}>
                        {DecodeHtml(props.option.answer)}
                    </p>
                    : <p
                        className={"answer"}
                        style={styles}
                        onClick={() => toggleSelect(props.questionId, props.option.id)}
                    >
                        {DecodeHtml(props.option.answer)}
                    </p>
            }
        </>
    )
}