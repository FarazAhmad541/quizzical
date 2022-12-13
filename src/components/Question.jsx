import DecodeHtml from "./DecodeHtml";

export default function Question(props) {
    function toggle(id) {
        if (!props.quizEnded) {
            const newAnswersArray = props.options.map(ans => {
                return ans.id === id ? { ...ans, isSelected: !ans.isSelected } : { ...ans, isSelected: false }
            })

            function newQuestion() {
                return {
                    ...props,
                    options: newAnswersArray
                }
            }
            return props.toggleSelect(newQuestion())
        }
    }

    const questionString = DecodeHtml(props.question)
    const answerElements = props.options.map(answer => {

        function compareAnswers() {
            let className = ''
            if (answer.isSelected && answer.answer != props.correctAnswer) {
                className = "answer-wrong"
            } else if (answer.answer === props.correctAnswer) {
                className = "answer-selected"
            } else {
                className = "answer-notSelected"
            }
            return className
        }

        const styles = {
            backgroundColor: answer.isSelected ? "#D6DBF5" : "#F5F7FB",
            border: answer.isSelected ? "1.5px solid #D6DBF5" : "1.5px solid #4D5B9E"
        }
        return props.quizEnded ?
            <p className={compareAnswers()}
                onClick={() => toggle(answer.id)}
                key={answer.id}
            >
                {DecodeHtml(answer.answer)}
            </p>
            :
            <p className="answer" style={styles}
                onClick={() => toggle(answer.id)}
                key={answer.id}
            >
                {DecodeHtml(answer.answer)}
            </p>
    })

    return (
        <div className="question-element">
            <h2 className="question-heading">{questionString}</h2>
            <div className="answer-element">
                {answerElements}
            </div>
        </div>
    )
}