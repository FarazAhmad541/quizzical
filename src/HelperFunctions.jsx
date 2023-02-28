import { nanoid } from "nanoid";

function DecodeHtml(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

//Takes and array of answers as an argument and returns a new array of shuffled answers
function ShuffleAnswers(answerList) {
    for (let i = answerList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerList[i], answerList[j]] = [answerList[j], answerList[i]];
    }
    return answerList
}


//Takes a question Element as argument and merges the correct and incorrect answers
function GetAnswersArray(item) {
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

export {DecodeHtml, ShuffleAnswers, GetAnswersArray}