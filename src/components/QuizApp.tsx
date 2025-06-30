import React, { useState, useEffect } from 'react';
import { Timer } from './Timer';
import { Question } from './Question';
import { Results } from './Results';
import { PlayerSetup } from './PlayerSetup';
import { Leaderboard } from './Leaderboard';
import { FeedbackWidget } from './FeedbackWidget';
import { ReadPapers } from './ReadPapers';
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
  },
  {
    id: 21,
    question: "What is the main advantage of using attention mechanisms in neural networks?",
    options: [
      "Faster training",
      "Better handling of long sequences and selective focus",
      "Reduced memory usage",
      "Simpler architecture"
    ],
    correctAnswer: 1,
    explanation: "Attention mechanisms allow models to selectively focus on relevant parts of the input, especially useful for long sequences."
  },
  {
    id: 22,
    question: "What is the purpose of batch normalization?",
    options: [
      "To normalize input data",
      "To stabilize training and accelerate convergence",
      "To reduce overfitting",
      "To increase model capacity"
    ],
    correctAnswer: 1,
    explanation: "Batch normalization normalizes layer inputs to stabilize training and allow higher learning rates."
  },
  {
    id: 23,
    question: "What is the difference between supervised and unsupervised learning?",
    options: [
      "Supervised uses labeled data, unsupervised doesn't",
      "Supervised is faster than unsupervised",
      "Unsupervised uses labeled data, supervised doesn't",
      "No difference"
    ],
    correctAnswer: 0,
    explanation: "Supervised learning uses labeled training data, while unsupervised learning finds patterns in unlabeled data."
  },
  {
    id: 24,
    question: "What is a hyperparameter in machine learning?",
    options: [
      "Parameters learned during training",
      "Configuration settings set before training",
      "Output predictions",
      "Input features"
    ],
    correctAnswer: 1,
    explanation: "Hyperparameters are configuration settings (like learning rate, batch size) set before training begins."
  },
  {
    id: 25,
    question: "What is the vanishing gradient problem?",
    options: [
      "Gradients become too large",
      "Gradients become very small in deep networks",
      "No gradients are calculated",
      "Gradients are unstable"
    ],
    correctAnswer: 1,
    explanation: "In deep networks, gradients can become exponentially small as they propagate backward, making early layers hard to train."
  },
  {
    id: 26,
    question: "What is the purpose of data augmentation?",
    options: [
      "To increase dataset size artificially",
      "To clean data",
      "To reduce training time",
      "To compress data"
    ],
    correctAnswer: 0,
    explanation: "Data augmentation creates variations of existing data to increase dataset size and improve model generalization."
  },
  {
    id: 27,
    question: "What is the bias-variance tradeoff?",
    options: [
      "Balance between model complexity and performance",
      "Balance between training and testing time",
      "Balance between accuracy and speed",
      "Balance between data size and model size"
    ],
    correctAnswer: 0,
    explanation: "The bias-variance tradeoff describes the balance between a model's ability to minimize bias and variance in predictions."
  },
  {
    id: 28,
    question: "What is a recurrent neural network (RNN)?",
    options: [
      "A network that processes sequences with memory",
      "A network with recursive connections",
      "A network that repeats training",
      "A network with multiple outputs"
    ],
    correctAnswer: 0,
    explanation: "RNNs are designed to process sequential data by maintaining hidden states that act as memory."
  },
  {
    id: 29,
    question: "What is the purpose of pooling layers in CNNs?",
    options: [
      "To increase feature maps",
      "To reduce spatial dimensions and computational load",
      "To add non-linearity",
      "To normalize features"
    ],
    correctAnswer: 1,
    explanation: "Pooling layers reduce spatial dimensions of feature maps, decreasing computational requirements and controlling overfitting."
  },
  {
    id: 30,
    question: "What is the difference between bagging and boosting?",
    options: [
      "Bagging trains models in parallel, boosting in sequence",
      "Bagging is faster than boosting",
      "Boosting trains models in parallel, bagging in sequence",
      "No difference"
    ],
    correctAnswer: 0,
    explanation: "Bagging trains multiple models independently in parallel, while boosting trains models sequentially, each learning from previous errors."
  },
  {
    id: 31,
    question: "What is a GAN (Generative Adversarial Network)?",
    options: [
      "A type of classification model",
      "Two networks competing to generate realistic data",
      "A regression algorithm",
      "A clustering method"
    ],
    correctAnswer: 1,
    explanation: "GANs consist of a generator and discriminator network that compete, with the generator learning to create realistic fake data."
  },
  {
    id: 32,
    question: "What is the purpose of the learning rate in gradient descent?",
    options: [
      "To control the speed of convergence",
      "To determine model accuracy",
      "To set the number of epochs",
      "To define the loss function"
    ],
    correctAnswer: 0,
    explanation: "Learning rate controls how big steps the optimizer takes when updating model parameters during training."
  },
  {
    id: 33,
    question: "What is feature scaling and why is it important?",
    options: [
      "Normalizing features to similar ranges for better performance",
      "Selecting the best features",
      "Creating new features",
      "Removing irrelevant features"
    ],
    correctAnswer: 0,
    explanation: "Feature scaling normalizes features to similar ranges, preventing features with larger scales from dominating the learning process."
  },
  {
    id: 34,
    question: "What is the purpose of early stopping?",
    options: [
      "To save training time",
      "To prevent overfitting by stopping when validation performance degrades",
      "To reduce model complexity",
      "To increase accuracy"
    ],
    correctAnswer: 1,
    explanation: "Early stopping prevents overfitting by monitoring validation performance and stopping training when it starts to degrade."
  },
  {
    id: 35,
    question: "What is the difference between precision and recall?",
    options: [
      "Precision is accuracy, recall is completeness",
      "Precision is speed, recall is accuracy",
      "Precision is completeness, recall is accuracy",
      "No difference"
    ],
    correctAnswer: 0,
    explanation: "Precision measures accuracy of positive predictions, while recall measures completeness (how many actual positives were found)."
  },
  {
    id: 36,
    question: "What is a confusion matrix?",
    options: [
      "A table showing prediction vs actual results",
      "A method to confuse models",
      "A type of neural network",
      "A data preprocessing technique"
    ],
    correctAnswer: 0,
    explanation: "A confusion matrix is a table that shows the performance of a classification model by comparing predicted vs actual labels."
  },
  {
    id: 37,
    question: "What is the curse of dimensionality?",
    options: [
      "Too many features leading to sparse data and poor performance",
      "Too few features",
      "Too much training data",
      "Too many models"
    ],
    correctAnswer: 0,
    explanation: "High-dimensional spaces become increasingly sparse, making it difficult to find meaningful patterns and requiring exponentially more data."
  },
  {
    id: 38,
    question: "What is the purpose of a validation set?",
    options: [
      "To tune hyperparameters and evaluate model during development",
      "To train the model",
      "To test final performance",
      "To store extra data"
    ],
    correctAnswer: 0,
    explanation: "Validation sets are used to tune hyperparameters and evaluate model performance during development, separate from final testing."
  },
  {
    id: 39,
    question: "What is the difference between online and batch learning?",
    options: [
      "Online learns from one example at a time, batch from all data",
      "Online is faster than batch",
      "Batch learns from one example, online from all data",
      "No difference"
    ],
    correctAnswer: 0,
    explanation: "Online learning updates the model incrementally with each new example, while batch learning uses the entire dataset."
  },
  {
    id: 40,
    question: "What is a decision boundary?",
    options: [
      "The line/surface separating different classes in feature space",
      "The edge of the dataset",
      "The maximum accuracy achievable",
      "The training completion point"
    ],
    correctAnswer: 0,
    explanation: "A decision boundary is the line or surface that separates different classes in the feature space of a classification model."
  },
  {
    id: 41,
    question: "What is the purpose of activation functions in neural networks?",
    options: [
      "To introduce non-linearity and enable learning complex patterns",
      "To initialize weights",
      "To reduce training time",
      "To prevent overfitting"
    ],
    correctAnswer: 0,
    explanation: "Activation functions introduce non-linearity, allowing neural networks to learn and represent complex, non-linear relationships."
  },
  {
    id: 42,
    question: "What is transfer learning?",
    options: [
      "Using pre-trained models for new, related tasks",
      "Moving data between systems",
      "Converting model formats",
      "Sharing models between teams"
    ],
    correctAnswer: 0,
    explanation: "Transfer learning leverages knowledge from pre-trained models on similar tasks, reducing training time and data requirements."
  },
  {
    id: 43,
    question: "What is the purpose of dropout in neural networks?",
    options: [
      "To prevent overfitting by randomly deactivating neurons",
      "To speed up training",
      "To reduce model size",
      "To improve accuracy"
    ],
    correctAnswer: 0,
    explanation: "Dropout randomly sets neurons to zero during training, preventing overfitting and improving generalization."
  },
  {
    id: 44,
    question: "What is the difference between classification and clustering?",
    options: [
      "Classification is supervised, clustering is unsupervised",
      "Classification is unsupervised, clustering is supervised",
      "Both are supervised",
      "Both are unsupervised"
    ],
    correctAnswer: 0,
    explanation: "Classification predicts known categories using labeled data (supervised), while clustering finds hidden groups in unlabeled data (unsupervised)."
  },
  {
    id: 45,
    question: "What is a neural network epoch?",
    options: [
      "One complete pass through the entire training dataset",
      "One forward pass",
      "One backward pass",
      "One batch of data"
    ],
    correctAnswer: 0,
    explanation: "An epoch represents one complete pass through the entire training dataset during the training process."
  },
  {
    id: 46,
    question: "What is the purpose of regularization techniques?",
    options: [
      "To prevent overfitting and improve generalization",
      "To speed up training",
      "To increase model complexity",
      "To reduce data requirements"
    ],
    correctAnswer: 0,
    explanation: "Regularization techniques add constraints or penalties to prevent overfitting and help models generalize better to new data."
  },
  {
    id: 47,
    question: "What is ensemble learning?",
    options: [
      "Combining multiple models to improve performance",
      "Training one large model",
      "Using multiple datasets",
      "Parallel training"
    ],
    correctAnswer: 0,
    explanation: "Ensemble learning combines predictions from multiple models to achieve better performance than any individual model."
  },
  {
    id: 48,
    question: "What is the purpose of feature engineering?",
    options: [
      "Creating and selecting relevant features to improve model performance",
      "Building neural networks",
      "Optimizing hardware",
      "Visualizing data"
    ],
    correctAnswer: 0,
    explanation: "Feature engineering involves creating, transforming, and selecting features that best represent the problem for machine learning models."
  },
  {
    id: 49,
    question: "What is gradient descent?",
    options: [
      "An optimization algorithm to minimize loss functions",
      "A type of neural network",
      "A data preprocessing technique",
      "A evaluation metric"
    ],
    correctAnswer: 0,
    explanation: "Gradient descent is an optimization algorithm that iteratively adjusts model parameters to minimize the loss function."
  },
  {
    id: 50,
    question: "What is the difference between supervised and reinforcement learning?",
    options: [
      "Supervised uses labeled data, reinforcement learns through rewards",
      "Supervised is faster than reinforcement",
      "Reinforcement uses labeled data, supervised learns through rewards",
      "No difference"
    ],
    correctAnswer: 0,
    explanation: "Supervised learning uses labeled examples, while reinforcement learning learns optimal actions through trial and error with rewards/penalties."
  },
  {
    id: 51,
    question: "What is a loss function?",
    options: [
      "A function that measures prediction errors",
      "A function that generates predictions",
      "A function that preprocesses data",
      "A function that visualizes results"
    ],
    correctAnswer: 0,
    explanation: "A loss function quantifies the difference between predicted and actual values, guiding the model's learning process."
  },
  {
    id: 52,
    question: "What is the purpose of train-test split?",
    options: [
      "To evaluate model performance on unseen data",
      "To speed up training",
      "To reduce data size",
      "To improve accuracy"
    ],
    correctAnswer: 0,
    explanation: "Train-test split separates data to train the model on one portion and evaluate its performance on unseen data."
  },
  {
    id: 53,
    question: "What is overfitting in machine learning?",
    options: [
      "Model performs well on training data but poorly on new data",
      "Model trains too quickly",
      "Model is too simple",
      "Model has too few parameters"
    ],
    correctAnswer: 0,
    explanation: "Overfitting occurs when a model learns training data too well, including noise, resulting in poor performance on new data."
  },
  {
    id: 54,
    question: "What is the purpose of cross-validation?",
    options: [
      "To assess model performance and reduce overfitting",
      "To increase training speed",
      "To preprocess data",
      "To visualize results"
    ],
    correctAnswer: 0,
    explanation: "Cross-validation evaluates model performance by training and testing on different data subsets, providing more reliable performance estimates."
  },
  {
    id: 55,
    question: "What is a convolutional layer in CNNs?",
    options: [
      "A layer that applies filters to detect local features",
      "A layer that reduces dimensions",
      "A layer that adds non-linearity",
      "A layer that normalizes data"
    ],
    correctAnswer: 0,
    explanation: "Convolutional layers apply learnable filters across input data to detect local patterns and features like edges and textures."
  },
  {
    id: 56,
    question: "What is the purpose of the softmax function?",
    options: [
      "To convert outputs into probability distributions",
      "To add non-linearity",
      "To reduce overfitting",
      "To speed up training"
    ],
    correctAnswer: 0,
    explanation: "Softmax converts a vector of real numbers into a probability distribution, commonly used in multi-class classification."
  },
  {
    id: 57,
    question: "What is dimensionality reduction?",
    options: [
      "Reducing the number of features while preserving information",
      "Reducing training time",
      "Reducing model complexity",
      "Reducing data size"
    ],
    correctAnswer: 0,
    explanation: "Dimensionality reduction techniques reduce the number of features while attempting to preserve the most important information."
  },
  {
    id: 58,
    question: "What is the purpose of batch size in neural networks?",
    options: [
      "Controls how many samples are processed before updating weights",
      "Sets the number of epochs",
      "Determines learning rate",
      "Defines network architecture"
    ],
    correctAnswer: 0,
    explanation: "Batch size determines how many training samples are processed together before the model's weights are updated."
  },
  {
    id: 59,
    question: "What is a autoencoder?",
    options: [
      "A neural network that learns to compress and reconstruct data",
      "A classification algorithm",
      "A regression model",
      "A clustering method"
    ],
    correctAnswer: 0,
    explanation: "An autoencoder is a neural network trained to compress input data into a lower-dimensional representation and then reconstruct it."
  },
  {
    id: 60,
    question: "What is the purpose of momentum in optimization?",
    options: [
      "To accelerate convergence and overcome local minima",
      "To reduce learning rate",
      "To increase batch size",
      "To add regularization"
    ],
    correctAnswer: 0,
    explanation: "Momentum helps optimization by accumulating gradients from previous steps, allowing faster convergence and better navigation of the loss landscape."
  }
];

export const QuizApp: React.FC = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished' | 'leaderboard' | 'papers'>('setup');
  const [playerName, setPlayerName] = useState<string>('');
  const [quizType, setQuizType] = useState<'quick' | 'extended'>('quick');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Updated function to shuffle both questions and answers with proper question count
  const shuffleQuestions = (questions: QuizQuestion[]) => {
    const shuffled = [...questions];
    // Shuffle the questions array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Shuffle the options within each question and update correct answer index
    const questionsWithShuffledOptions = shuffled.map(question => {
      const correctOption = question.options[question.correctAnswer];
      const shuffledOptions = [...question.options];
      
      // Fisher-Yates shuffle for options
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      
      // Find new index of correct answer
      const newCorrectAnswer = shuffledOptions.findIndex(option => option === correctOption);
      
      return {
        ...question,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswer
      };
    });
    
    // Return 20 questions for quick quiz, 60 for extended
    return questionsWithShuffledOptions.slice(0, 60);
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
    const shuffled = shuffleQuestions(quizQuestions);
    const questionCount = selectedQuizType === 'quick' ? 20 : 60;
    const quizQuestions = shuffled.slice(0, questionCount);
    
    setShuffledQuestions(quizQuestions);
    setUserAnswers(new Array(quizQuestions.length).fill(null));
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

  const showPapers = () => {
    setGameState('papers');
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
    return (
      <>
        <PlayerSetup onStartQuiz={startQuiz} onShowLeaderboard={showLeaderboard} onShowPapers={showPapers} />
        <FeedbackWidget />
      </>
    );
  }

  if (gameState === 'leaderboard') {
    return (
      <>
        <Leaderboard leaderboard={leaderboard} onBack={() => setGameState('setup')} />
        <FeedbackWidget />
      </>
    );
  }

  if (gameState === 'papers') {
    return (
      <>
        <ReadPapers onBack={() => setGameState('setup')} />
        <FeedbackWidget />
      </>
    );
  }

  if (gameState === 'finished') {
    return (
      <>
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
        <FeedbackWidget />
      </>
    );
  }

  const getQuizTypeLabel = () => {
    return quizType === 'quick' ? '⚡ Quick Quiz' : '🎯 Extended Quiz';
  };

  return (
    <>
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
      <FeedbackWidget />
    </>
  );
};
