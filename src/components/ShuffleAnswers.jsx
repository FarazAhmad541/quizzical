export default function ShuffleAnswers(answerList) {
    for (let i = answerList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerList[i], answerList[j]] = [answerList[j], answerList[i]];
    }
    return answerList
}