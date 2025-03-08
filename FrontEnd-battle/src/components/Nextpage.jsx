import React, { useState, useContext } from "react";
import "../styles/nextpage.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Nextpage = () => {

    const { isLoggedIn } = useContext(AuthContext);
    const [answers, setAnswers] = useState({
        q1: "",
        q2: [],
        q3: "",
        q4: "",
        q5: []
    });

    const [results, setResults] = useState({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: ""
    });

    const [score, setScore] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            if (checked) {
                setAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [name]: [...prevAnswers[name], value]
                }));
            } else {
                setAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [name]: prevAnswers[name].filter((item) => item !== value)
                }));
            }
        } else {
            setAnswers({ ...answers, [name]: value });
        }
    };

    const checkAnswer = (questionNumber) => {
        const correctAnswers = {
            q1: "a",
            q2: ["a", "b", "c", "d"],
            q3: "b",
            q4: "b",
            q5: ["a"]
        };

        const userAnswer = answers[`q${questionNumber}`];
        const correctAnswer = correctAnswers[`q${questionNumber}`];

        if (
            (Array.isArray(userAnswer) &&
                userAnswer.length === correctAnswer.length &&
                userAnswer.every((item) => correctAnswer.includes(item))) ||
            userAnswer === correctAnswer
        ) {
            setResults((prevResults) => ({ ...prevResults, [`q${questionNumber}`]: "Correct!" }));
            return 1;
        } else {
            setResults((prevResults) => ({ ...prevResults, [`q${questionNumber}`]: "Wrong!" }));
            return 0;
        }
    };

    const handleSubmit = async () => {
        let totalScore = 0;
        totalScore += checkAnswer(1);
        totalScore += checkAnswer(2);
        totalScore += checkAnswer(3);
        totalScore += checkAnswer(4);
        totalScore += checkAnswer(5);

        setScore(totalScore);
        setIsSubmitted(true);

        try {
            const response = await fetch("http://localhost:8080/quizAttempted", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ score: totalScore }),
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error saving score:", error);
        }
    };

    return (
        <div className="supercontainer">
            <div className="quizscontainer">
                <h1>JavaScript Quiz</h1>
                <p style={{ color: "red", textAlign: "center", paddingBottom: "20px" }}>{isLoggedIn ? "" : "Please Login"}</p>

                <div className="question1">
                    <p className="qq1">1. What is the correct way to declare a variable in JavaScript?</p>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q1"
                            value="a" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        a) var myVariable
                    </label>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q1"
                            value="b" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        b) variable myVariable
                    </label>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q1"
                            value="c" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        c) let is myVariable
                    </label>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q1"
                            value="d" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        d) const myVariable
                    </label>
                    <p className="resq1">{results.q1}</p>
                </div>
                <div className="question2">
                    <p className="qq2">2. Which of the following are JavaScript data types?</p>
                    <label className="lain">
                        <input
                            type="checkbox"
                            name="q2"
                            value="a" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        a) Number
                    </label>
                    <label className="lain">
                        <input
                            type="checkbox"
                            name="q2"
                            value="b" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        b) String
                    </label>
                    <label className="lain">
                        <input
                            type="checkbox"
                            name="q2"
                            value="c" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        c) Boolean
                    </label>
                    <label className="lain">
                        <input
                            type="checkbox"
                            name="q2"
                            value="d" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        d) Object
                    </label>
                    <p className="resq2">{results.q2}</p>
                </div>
                <div className="question3">
                    <p className="qq3">3. Which keyword is used to declare a constant variable in JavaScript?</p>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q3"
                            value="a" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        a) let
                    </label>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q3"
                            value="b" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        b) const
                    </label>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q3"
                            value="c" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        c) var
                    </label>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q3"
                            value="d" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        d) def
                    </label>
                    <p className="resq3">{results.q3}</p>
                </div>
                <div className="question4">
                    <p className="qq4">4. What is the output of 2 + '2' in JavaScript?</p>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q4"
                            value="a" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        a) 4
                    </label>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q4"
                            value="b" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        b) "22"
                    </label>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q4"
                            value="c" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        c) 2"2"
                    </label>
                    <label className="lain">
                        <input
                            type="radio"
                            name="q4"
                            value="d" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        d) Error
                    </label>
                    <p className="resq4">{results.q4}</p>
                </div>
                <div className="question5">
                    <p className="qq5">5. Which function is used to remove the last element from an array in JavaScript?</p>
                    <label className="lain">
                        <input
                            type="checkbox"
                            name="q5"
                            value="a" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        a) pop()
                    </label>
                    <label className="lain">
                        <input
                            type="checkbox"
                            name="q5"
                            value="b" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        b) slice()
                    </label>
                    <label className="lain">
                        <input
                            type="checkbox"
                            name="q5"
                            value="c" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        c) splice()
                    </label>
                    <label className="lain">
                        <input
                            type="checkbox"
                            name="q5"
                            value="d" onChange={handleChange}
                            disabled={!isLoggedIn}
                        />
                        d) shift()
                    </label>
                    <p className="resq5">{results.q5}</p>
                </div>
                <button className="plssub" onClick={handleSubmit}>Submit All</button>
                {isSubmitted && (
                    <div className="score-container">
                        <h2>Your Score: {score}/5</h2>
                    </div>
                )}
                <Link to="/HTMLquiz">
                    <button className="NP">Previous Page</button>
                </Link>
            </div>
        </div>
    );
};

export default Nextpage;
