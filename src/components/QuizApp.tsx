
import React, { useState, useEffect } from 'react';
import { Timer } from './Timer';
import { Question } from './Question';
import { Results } from './Results';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does 'overfitting' mean in machine learning?",
    options: [
      "The model performs well on training data but poorly on new data",
      "The model is too simple to capture patterns",
      "The model trains too quickly",
      "The model has too few parameters"
    ],
    correctAnswer: 0,
    explanation: "Overfitting occurs when a model learns the training data too well, including noise and outliers, making it perform poorly on new, unseen data."
  },
  {
    id: 2,
    question: "Which of the following is NOT a supervised learning algorithm?",
    options: ["Linear Regression", "K-Means Clustering", "Decision Trees", "Support Vector Machines"],
    correctAnswer: 1,
    explanation: "K-Means Clustering is an unsupervised learning algorithm used for grouping data without labeled examples."
  },
  {
    id: 3,
    question: "What is the primary purpose of a neural network's activation function?",
    options: [
      "To initialize weights",
      "To introduce non-linearity",
      "To reduce overfitting",
      "To normalize inputs"
    ],
    correctAnswer: 1,
    explanation: "Activation functions introduce non-linearity to neural networks, allowing them to learn complex patterns and relationships in data."
  },
  {
    id: 4,
    question: "What does 'gradient descent' optimize in machine learning?",
    options: ["Training speed", "Model accuracy", "Loss function", "Data preprocessing"],
    correctAnswer: 2,
    explanation: "Gradient descent is an optimization algorithm that minimizes the loss function by iteratively adjusting model parameters."
  },
  {
    id: 5,
    question: "Which metric is best for evaluating a classification model with imbalanced classes?",
    options: ["Accuracy", "F1-Score", "Mean Squared Error", "R-squared"],
    correctAnswer: 1,
    explanation: "F1-Score is the harmonic mean of precision and recall, making it ideal for imbalanced datasets where accuracy can be misleading."
  },
  {
    id: 6,
    question: "What is the main difference between AI, ML, and Deep Learning?",
    options: [
      "They are the same thing",
      "AI ⊃ ML ⊃ Deep Learning",
      "ML ⊃ AI ⊃ Deep Learning",
      "Deep Learning ⊃ ML ⊃ AI"
    ],
    correctAnswer: 1,
    explanation: "AI is the broadest field, ML is a subset of AI, and Deep Learning is a subset of ML that uses neural networks with multiple layers."
  },
  {
    id: 7,
    question: "What is 'regularization' used for in machine learning?",
    options: [
      "Speeding up training",
      "Preventing overfitting",
      "Increasing model complexity",
      "Data preprocessing"
    ],
    correctAnswer: 1,
    explanation: "Regularization techniques add penalties to the loss function to prevent overfitting by discouraging overly complex models."
  },
  {
    id: 8,
    question: "Which of these is a characteristic of unsupervised learning?",
    options: [
      "Uses labeled training data",
      "Predicts specific outcomes",
      "Finds hidden patterns in data",
      "Requires target variables"
    ],
    correctAnswer: 2,
    explanation: "Unsupervised learning finds hidden patterns, structures, or relationships in data without using labeled examples."
  },
  {
    id: 9,
    question: "What is the 'curse of dimensionality'?",
    options: [
      "Too many data points",
      "Performance degrades with too many features",
      "Models become too simple",
      "Training takes too long"
    ],
    correctAnswer: 1,
    explanation: "The curse of dimensionality refers to various phenomena that arise when analyzing data in high-dimensional spaces, often leading to sparse data and poor model performance."
  },
  {
    id: 10,
    question: "What is 'transfer learning' in deep learning?",
    options: [
      "Moving data between computers",
      "Using a pre-trained model for a new task",
      "Converting between different model types",
      "Sharing weights between layers"
    ],
    correctAnswer: 1,
    explanation: "Transfer learning involves using a pre-trained model as a starting point for a new, related task, leveraging previously learned features."
  }
];

export const QuizApp: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

  const shuffleArray = (array: QuizQuestion[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5); // Take only 5 random questions
  };

  const startQuiz = () => {
    const shuffled = shuffleArray(quizQuestions);
    setShuffledQuestions(shuffled);
    setUserAnswers(new Array(shuffled.length).fill(null));
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(60);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);

    if (answerIndex === shuffledQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setGameState('finished');
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(60);
    setShuffledQuestions([]);
    setUserAnswers([]);
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished');
    }
  }, [timeLeft, gameState]);

  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white mb-4">
              🤖 AI/ML Quiz Challenge
            </CardTitle>
            <p className="text-blue-100 text-lg">
              Test your knowledge of Artificial Intelligence and Machine Learning!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 text-blue-100">
              <p>📝 5 random questions</p>
              <p>⏱️ 60 seconds total</p>
              <p>🎯 Multiple choice format</p>
            </div>
            <Button 
              onClick={startQuiz}
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <Results 
        score={score} 
        totalQuestions={shuffledQuestions.length}
        questions={shuffledQuestions}
        userAnswers={userAnswers}
        onRestart={resetQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div className="text-white">
            <span className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</span>
            <span className="ml-4 text-blue-200">Score: {score}</span>
          </div>
          <Timer timeLeft={timeLeft} />
        </div>
        
        <Question
          question={shuffledQuestions[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          questionNumber={currentQuestionIndex + 1}
        />
      </div>
    </div>
  );
};
