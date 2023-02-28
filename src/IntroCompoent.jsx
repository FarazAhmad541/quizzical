import React from "react";
import { useContext } from "react";
import SelectForm from "./SelectForm";
import { Context } from "./Context";

function IntroComponent() {
    const {startQuiz} = useContext(Context)
    return (
        <>
            <div className="intro-container">
                <h1 className="intro-heading">Quizzical</h1>
                <p className="intro-text">Test Your Knowledge</p>
                <SelectForm />
                <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
            </div>
        </>
    )
}

export {IntroComponent}