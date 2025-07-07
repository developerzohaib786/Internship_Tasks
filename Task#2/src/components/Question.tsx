'use client';
import React, { useEffect,useState } from 'react'
import { Button } from './ui/button';

interface QuestionProps {
  question: {
    question: string;
    options: string[];
    correctOption: string;
    timeLimit: number; 
  };
  onAnswer: (answer: string) => void;
  onTimeout: () => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer, onTimeout }) => {
    const [timeleft,setTimeleft] = useState(question.timeLimit);
    
    useEffect(() => {
    setTimeleft(question.timeLimit); //it will reset the timer when the question changes
    }, [question]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeleft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [question, onTimeout]);

  return (
    <div className='bg-smoke-50 p-6 rounded-lg shadow-md w-full max-w-md'>
      <h2 className='text-lg font-semibold mb-4'>{question.question}</h2>
        {question.options.map((option, index) => (
            <Button
              key={index}
              className='bg-white border-2 text-blue-800 m-2 px-4 py-2 rounded'
              onClick={() => onAnswer(option)}
            >
              {option}
            </Button>
        ))}
        <div className='mt-4 text-sm text-gray-600'>
          <p className=''>Time left: {timeleft} seconds</p>
        </div>
    </div>
  )
}


export default Question
