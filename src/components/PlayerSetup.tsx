
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PlayerSetupProps {
  onStartQuiz: (name: string) => void;
  onShowLeaderboard: () => void;
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartQuiz, onShowLeaderboard }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStartQuiz(name.trim());
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
          <div className="space-y-3 text-emerald-100">
            <p>📝 20 random questions</p>
            <p>⏱️ 60 seconds total</p>
            <p>🎯 Multiple choice format</p>
            <p>🏆 Compete on the leaderboard</p>
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
            className="w-full py-2 text-white border-white/30 hover:bg-white/10 font-medium"
          >
            View Leaderboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
