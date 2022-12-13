import ShuffleAnswers from "./ShuffleAnswers"
import { nanoid } from "nanoid"

export default function GetAnswersArray(item) {
  const answersArray = [...item.incorrect_answers, item.correct_answer]
  const answers = answersArray.map(answer => {
    return {
      id: nanoid(),
      isSelected: false,
      answer: answer
    }
  })

  return ShuffleAnswers(answers)
}