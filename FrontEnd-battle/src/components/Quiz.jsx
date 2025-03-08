import React, { useState, useContext } from "react";
import "../styles/Quiz.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

const Quiz = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [answers, setAnswers] = useState({
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
    });

    const [results, setResults] = useState({
        result1: "",
        result2: "",
        result3: "",
        result4: "",
        result5: "",
    });

    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const correctAnswers = {
        question1: "<input></input>",
        question2: "<a></a>",
        question3: "<img></img>",
        question4: "<form></form>",
        question5: "<button></button>",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers({ ...answers, [name]: value });
    };

    const showAnswer = (questionNumber) => {
        const answerText = `The correct answer is ${correctAnswers[`question${questionNumber}`]}.`;
        alert(answerText);
    };

    const checkAnswer = (questionNumber) => {
        const userAnswer = answers[`question${questionNumber}`];
        const correctAnswer = correctAnswers[`question${questionNumber}`];

        setResults(prevResults => ({
            ...prevResults,
            [`result${questionNumber}`]: userAnswer === correctAnswer ? `Question ${questionNumber}: Correct!` : `Question ${questionNumber}: Wrong!`,
        }));
    };

    const handleSubmit = () => {
        let calculatedScore = 0;

        for (let i = 1; i <= 5; i++) {
            if (answers[`question${i}`] === correctAnswers[`question${i}`]) {
                calculatedScore++;
            }
        }

        setScore(calculatedScore);
        setSubmitted(true);

        // Send score to backend
        axios.post("http://localhost:8080/quizAttempted", { score: calculatedScore })
            .then(response => {
                console.log('Score saved:', response.data);
            })
            .catch(error => {
                console.error('Error saving score:', error);
            });
    };

    return (
        <div className="maincontainer">
            <div className="quiz-container">
                <h1>HTML QUIZ</h1>
                <p style={{ color: "red", textAlign: "center", paddingBottom: "20px" }}>{isLoggedIn ? "" : "Please Login"}</p>
                {Array.from({ length: 5 }, (_, i) => (
                    <div key={i + 1} className="question">
                        <label htmlFor={`question${i + 1}`}>
                            {`What HTML tag is used to ${['define input fields', 'create links', 'display an image', 'create a form', 'display a button'][i]}?`}
                        </label>
                        <input
                            disabled={!isLoggedIn}
                            type="text"
                            id={`question${i + 1}`}
                            name={`question${i + 1}`}
                            value={answers[`question${i + 1}`]}
                            onChange={handleChange}
                        />
                        <button onClick={() => showAnswer(i + 1)} disabled={!isLoggedIn} className="btt-1">
                            Show Answer
                        </button>
                        <button onClick={() => checkAnswer(i + 1)} disabled={!isLoggedIn} className="btt-2">
                            Submit
                        </button>
                        <p>{results[`result${i + 1}`]}</p>
                    </div>
                ))}
                {!submitted ? (
                    <button onClick={handleSubmit} className="plssub">Submit Quiz</button>
                ) : (
                    <p>Your overall score is: {score} / 5</p>
                )}
                <Link to="/nextpage"><button style={{ cursor: "pointer" }} className="NP">Next Page</button></Link>
            </div>
        </div >
    );
};

export default Quiz;