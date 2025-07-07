'use client'
import React, { useState } from 'react'
import { Button } from './ui/button';
import question from '../data/data';
import Question from './Question'; 

const Quiz = () => {

 const [quizStarted, setQuizStarted] = useState(false);
 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
 const [score, setScore] = useState(0);
 const [quizCompleted, setQuizCompleted] = useState(false);
 const [answered, setAnswered] = useState(0);

    const startQuiz = () => {
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizCompleted(false);
        setAnswered(0);
    };

    const handleAnswer = (answer: string) => {
        if (answer === question[currentQuestionIndex].correctOption) {
            setScore(score + 1);
        }
        setAnswered(answered + 1);

        if (currentQuestionIndex < question.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleTimeout = () => {
        if (currentQuestionIndex < question.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    if(!quizStarted){
    return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Quiz!</h1>
      <Button onClick={startQuiz} className="bg-blue-500 text-white px-4 py-2 rounded">
        Start Quiz
      </Button>
    </div>
    )
 }

 if(quizCompleted){
    return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
      <p className="text-lg mb-4">Your score: {score} out of {question.length}</p>
      <Button onClick={startQuiz} className="bg-blue-500 text-white px-4 py-2 rounded">
        Restart Quiz
      </Button>
    </div>
    )
 }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold mb-4">Quiz application!</h1>
     <Question question={question[currentQuestionIndex]} onAnswer={handleAnswer} onTimeout={handleTimeout}/>
     <p className='mt-4 text-center'>
        Question {currentQuestionIndex + 1} of {question.length}
     </p>
    </div>
  )
}

export default Quiz
