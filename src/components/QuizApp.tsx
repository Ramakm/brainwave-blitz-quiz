import React, { useState, useEffect } from 'react';
import { Timer } from './Timer';
import { Question } from './Question';
import { Results } from './Results';
import { PlayerSetup } from './PlayerSetup';
import { Leaderboard } from './Leaderboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timestamp: string;
  quizType: 'quick' | 'extended';
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
  },
  {
    id: 11,
    question: "What is backpropagation in neural networks?",
    options: [
      "Forward pass through the network",
      "Algorithm to update weights by propagating errors backward",
      "Data preprocessing technique",
      "Method to initialize weights"
    ],
    correctAnswer: 1,
    explanation: "Backpropagation is an algorithm that calculates gradients by propagating errors backward through the network to update weights."
  },
  {
    id: 12,
    question: "What is the purpose of cross-validation?",
    options: [
      "To speed up training",
      "To assess model performance and generalization",
      "To clean data",
      "To visualize results"
    ],
    correctAnswer: 1,
    explanation: "Cross-validation helps assess how well a model generalizes by testing it on different subsets of data."
  },
  {
    id: 13,
    question: "What is the difference between classification and regression?",
    options: [
      "No difference",
      "Classification predicts categories, regression predicts continuous values",
      "Regression predicts categories, classification predicts continuous values",
      "Both predict categories"
    ],
    correctAnswer: 1,
    explanation: "Classification predicts discrete categories or classes, while regression predicts continuous numerical values."
  },
  {
    id: 14,
    question: "What is feature engineering?",
    options: [
      "Building neural networks",
      "Creating or transforming features to improve model performance",
      "Hardware optimization",
      "Data visualization"
    ],
    correctAnswer: 1,
    explanation: "Feature engineering involves creating, selecting, or transforming input features to improve machine learning model performance."
  },
  {
    id: 15,
    question: "What is ensemble learning?",
    options: [
      "Using a single powerful model",
      "Combining multiple models to improve predictions",
      "Training on multiple datasets",
      "Using multiple algorithms sequentially"
    ],
    correctAnswer: 1,
    explanation: "Ensemble learning combines predictions from multiple models to achieve better performance than individual models."
  },
  {
    id: 16,
    question: "What is the vanishing gradient problem?",
    options: [
      "Gradients become too large",
      "Gradients become very small in deep networks",
      "No gradients are calculated",
      "Gradients are calculated incorrectly"
    ],
    correctAnswer: 1,
    explanation: "The vanishing gradient problem occurs when gradients become very small in deep networks, making it difficult to train early layers."
  },
  {
    id: 17,
    question: "What is reinforcement learning?",
    options: [
      "Learning from labeled examples",
      "Learning through interaction with an environment via rewards",
      "Learning without any data",
      "Learning by copying other models"
    ],
    correctAnswer: 1,
    explanation: "Reinforcement learning involves an agent learning optimal actions through trial and error, receiving rewards or penalties from the environment."
  },
  {
    id: 18,
    question: "What is the purpose of dropout in neural networks?",
    options: [
      "To speed up training",
      "To prevent overfitting by randomly removing neurons",
      "To add more layers",
      "To initialize weights"
    ],
    correctAnswer: 1,
    explanation: "Dropout randomly sets some neurons to zero during training to prevent overfitting and improve generalization."
  },
  {
    id: 19,
    question: "What is a convolutional neural network (CNN) primarily used for?",
    options: [
      "Text processing",
      "Image recognition and computer vision",
      "Time series analysis",
      "Speech recognition only"
    ],
    correctAnswer: 1,
    explanation: "CNNs are primarily designed for image recognition and computer vision tasks, using convolutional layers to detect local features."
  },
  {
    id: 20,
    question: "What is natural language processing (NLP)?",
    options: [
      "Processing images",
      "Field of AI focused on interaction between computers and human language",
      "Network optimization",
      "Data compression"
    ],
    correctAnswer: 1,
    explanation: "NLP is a field of AI that focuses on enabling computers to understand, interpret, and generate human language."
  }
];

export const QuizApp: React.FC = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished' | 'leaderboard'>('setup');
  const [playerName, setPlayerName] = useState<string>('');
  const [quizType, setQuizType] = useState<'quick' | 'extended'>('quick');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const shuffleArray = (array: QuizQuestion[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 20);
  };

  const loadLeaderboard = () => {
    const saved = localStorage.getItem('quiz-leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  };

  const saveToLeaderboard = (entry: LeaderboardEntry) => {
    const updated = [...leaderboard, entry].sort((a, b) => b.percentage - a.percentage).slice(0, 20);
    setLeaderboard(updated);
    localStorage.setItem('quiz-leaderboard', JSON.stringify(updated));
  };

  const startQuiz = (name: string, selectedQuizType: 'quick' | 'extended') => {
    const shuffled = shuffleArray(quizQuestions);
    setShuffledQuestions(shuffled);
    setUserAnswers(new Array(shuffled.length).fill(null));
    setPlayerName(name);
    setQuizType(selectedQuizType);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(selectedQuizType === 'quick' ? 60 : 300);
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

    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        finishQuiz();
      }
    }, 1000);
  };

  const finishQuiz = () => {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    const entry: LeaderboardEntry = {
      name: playerName,
      score,
      totalQuestions: shuffledQuestions.length,
      percentage,
      timestamp: new Date().toISOString(),
      quizType
    };
    saveToLeaderboard(entry);
    setGameState('finished');
  };

  const resetQuiz = () => {
    setGameState('setup');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(60);
    setShuffledQuestions([]);
    setUserAnswers([]);
    setPlayerName('');
    setQuizType('quick');
  };

  const showLeaderboard = () => {
    setGameState('leaderboard');
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      finishQuiz();
    }
  }, [timeLeft, gameState]);

  if (gameState === 'setup') {
    return <PlayerSetup onStartQuiz={startQuiz} onShowLeaderboard={showLeaderboard} />;
  }

  if (gameState === 'leaderboard') {
    return <Leaderboard leaderboard={leaderboard} onBack={() => setGameState('setup')} />;
  }

  if (gameState === 'finished') {
    return (
      <Results 
        score={score} 
        totalQuestions={shuffledQuestions.length}
        questions={shuffledQuestions}
        userAnswers={userAnswers}
        playerName={playerName}
        quizType={quizType}
        onRestart={resetQuiz}
        onShowLeaderboard={showLeaderboard}
      />
    );
  }

  const getQuizTypeLabel = () => {
    return quizType === 'quick' ? '⚡ Quick Quiz' : '🎯 Extended Quiz';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4 font-inter">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div className="text-white">
            <div className="text-lg font-semibold">{getQuizTypeLabel()}</div>
            <span className="text-base">Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</span>
            <span className="ml-4 text-emerald-200">Score: {score}</span>
            <span className="ml-4 text-emerald-200">Player: {playerName}</span>
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
