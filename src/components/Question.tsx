
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  };
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  questionNumber: number;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-xl font-poppins">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = selectedAnswer !== null && index === question.correctAnswer;
            const isWrong = selectedAnswer !== null && selectedAnswer === index && index !== question.correctAnswer;
            
            let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-medium ";
            
            if (selectedAnswer === null) {
              buttonClass += "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transform hover:scale-[1.02]";
            } else if (isCorrect) {
              buttonClass += "bg-emerald-500/20 border-emerald-400 text-emerald-100";
            } else if (isWrong) {
              buttonClass += "bg-red-500/20 border-red-400 text-red-100";
            } else {
              buttonClass += "bg-white/5 border-white/20 text-gray-300";
            }

            return (
              <Button
                key={index}
                onClick={() => selectedAnswer === null && onAnswerSelect(index)}
                className={buttonClass}
                disabled={selectedAnswer !== null}
                variant="outline"
              >
                <span className="flex items-center">
                  <span className="mr-3 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                  {selectedAnswer !== null && isCorrect && (
                    <span className="ml-auto text-emerald-400">✓</span>
                  )}
                  {selectedAnswer !== null && isWrong && (
                    <span className="ml-auto text-red-400">✗</span>
                  )}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
