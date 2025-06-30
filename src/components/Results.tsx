
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
  userAnswers: (number | null)[];
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onRestart
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreEmoji = () => {
    if (percentage >= 80) return "🏆";
    if (percentage >= 60) return "🎉";
    if (percentage >= 40) return "👍";
    return "📚";
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent! You're an AI/ML expert!";
    if (percentage >= 60) return "Great job! You have solid knowledge!";
    if (percentage >= 40) return "Good effort! Keep learning!";
    return "Keep studying! You'll improve with practice!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-white mb-4">
              Quiz Complete! {getScoreEmoji()}
            </CardTitle>
            <div className="text-6xl font-bold text-white mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-2xl text-blue-200 mb-4">
              {percentage}%
            </div>
            <p className="text-xl text-blue-100">
              {getScoreMessage()}
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={onRestart}
              className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-xl">Review Your Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border-b border-white/20 pb-4">
                  <h3 className="text-white font-semibold mb-3">
                    {index + 1}. {question.question}
                  </h3>
                  
                  <div className="space-y-2 mb-3">
                    {question.options.map((option, optionIndex) => {
                      const isUserAnswer = userAnswer === optionIndex;
                      const isCorrectAnswer = optionIndex === question.correctAnswer;
                      
                      let optionClass = "p-2 rounded text-sm ";
                      if (isCorrectAnswer) {
                        optionClass += "bg-green-500/20 text-green-100 border border-green-400";
                      } else if (isUserAnswer && !isCorrect) {
                        optionClass += "bg-red-500/20 text-red-100 border border-red-400";
                      } else {
                        optionClass += "text-gray-300";
                      }
                      
                      return (
                        <div key={optionIndex} className={optionClass}>
                          <span className="font-semibold mr-2">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          {option}
                          {isCorrectAnswer && <span className="float-right text-green-400">✓ Correct</span>}
                          {isUserAnswer && !isCorrect && <span className="float-right text-red-400">Your answer</span>}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded p-3">
                    <p className="text-blue-100 text-sm">
                      <span className="font-semibold">Explanation:</span> {question.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
