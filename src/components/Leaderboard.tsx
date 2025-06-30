
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LeaderboardEntry {
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timestamp: string;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  onBack: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard, onBack }) => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getRankEmoji = (index: number) => {
    switch (index) {
      case 0: return "🥇";
      case 1: return "🥈";
      case 2: return "🥉";
      default: return `${index + 1}.`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4 font-inter">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white mb-4 font-poppins">
              🏆 Leaderboard
            </CardTitle>
            <p className="text-emerald-100">
              Top performers in the AI/ML Quiz Challenge
            </p>
          </CardHeader>
          <CardContent>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white/70 text-lg">No scores yet!</p>
                <p className="text-white/50">Be the first to take the quiz.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div
                    key={`${entry.name}-${entry.timestamp}`}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      index === 0 
                        ? 'bg-yellow-500/20 border-yellow-400/50' 
                        : index === 1 
                        ? 'bg-gray-400/20 border-gray-300/50'
                        : index === 2
                        ? 'bg-amber-600/20 border-amber-500/50'
                        : 'bg-white/5 border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">
                        {getRankEmoji(index)}
                      </span>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {entry.name}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {formatDate(entry.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-xl">
                        {entry.percentage}%
                      </div>
                      <div className="text-white/70 text-sm">
                        {entry.score}/{entry.totalQuestions}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8 text-center">
              <Button
                onClick={onBack}
                className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 font-poppins"
              >
                Back to Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
