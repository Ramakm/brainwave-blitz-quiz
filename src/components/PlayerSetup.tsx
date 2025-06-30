
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PlayerSetupProps {
  onStartQuiz: (name: string, quizType: 'quick' | 'extended') => void;
  onShowLeaderboard: () => void;
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartQuiz, onShowLeaderboard }) => {
  const [name, setName] = useState('');
  const [selectedQuizType, setSelectedQuizType] = useState<'quick' | 'extended'>('quick');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStartQuiz(name.trim(), selectedQuizType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4 font-inter">
      <Card className="w-full max-w-md text-center bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-white mb-4 font-poppins">
            🤖 AI/ML Quiz Challenge
          </CardTitle>
          <p className="text-emerald-100 text-lg">
            Test your knowledge of Artificial Intelligence and Machine Learning!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-lg font-poppins">Choose Quiz Type:</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedQuizType('quick')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedQuizType === 'quick'
                      ? 'bg-emerald-500/30 border-emerald-400 text-white'
                      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold">⚡ Quick Quiz</div>
                  <div className="text-sm">60 seconds</div>
                  <div className="text-sm">20 questions</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedQuizType('extended')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedQuizType === 'extended'
                      ? 'bg-emerald-500/30 border-emerald-400 text-white'
                      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold">🎯 Extended Quiz</div>
                  <div className="text-sm">5 minutes</div>
                  <div className="text-sm">20 questions</div>
                </button>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 font-medium"
                required
              />
            </div>
            <Button 
              type="submit"
              disabled={!name.trim()}
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 font-poppins"
            >
              Start Quiz
            </Button>
          </form>
          
          <Button
            onClick={onShowLeaderboard}
            variant="outline"
            className="w-full py-2 text-white border-white/30 hover:bg-white/10 font-medium bg-white/5"
          >
            🏆 View Leaderboard
          </Button>

          <div className="mt-8 pt-4 border-t border-white/20">
            <p className="text-white/60 text-sm">
              Developed by{' '}
              <a 
                href="https://x.com/techwith_ram" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-300 hover:text-emerald-200 font-medium underline transition-colors"
              >
                Ramkrushna
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
