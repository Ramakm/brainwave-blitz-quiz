
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Linkedin, Instagram, Github, Mail } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4 font-inter relative overflow-hidden">
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-cube absolute top-20 left-10 w-12 h-12 bg-emerald-400/20 backdrop-blur-sm border border-emerald-300/30 rounded-lg transform rotate-45 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="floating-sphere absolute top-32 right-20 w-16 h-16 bg-teal-400/20 backdrop-blur-sm border border-teal-300/30 rounded-full animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        <div className="floating-pyramid absolute bottom-40 left-20 w-14 h-14 bg-cyan-400/20 backdrop-blur-sm border border-cyan-300/30 transform rotate-12 animate-[spin_20s_linear_infinite] clip-path-triangle"></div>
        <div className="floating-diamond absolute bottom-20 right-32 w-10 h-10 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 transform rotate-45 animate-[bounce_4s_ease-in-out_infinite]"></div>
        <div className="floating-hexagon absolute top-1/2 left-5 w-12 h-12 bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 animate-[pulse_3s_ease-in-out_infinite]" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
        <div className="floating-octagon absolute top-1/3 right-10 w-8 h-8 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 animate-[float_7s_ease-in-out_infinite]" style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'}}></div>
      </div>

      <Card className="w-full max-w-md text-center bg-white/10 backdrop-blur-lg border-white/20 relative z-10 animate-scale-in">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-white mb-4 font-poppins animate-fade-in">
            🤖 AI/ML Quiz Challenge
          </CardTitle>
          <p className="text-emerald-100 text-lg animate-fade-in">
            Test your knowledge of Artificial Intelligence and Machine Learning!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-lg font-poppins">Choose Quiz Type:</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedQuizType('quick')}
                  className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
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
                  className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
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
          
          <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
            <div>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 font-medium hover:bg-white/15 transition-all"
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
            className="w-full py-2 text-white border-white/50 hover:bg-white/10 font-medium bg-white/5 hover:scale-105 transition-all"
          >
            🏆 View Leaderboard
          </Button>

          <div className="mt-8 pt-4 border-t border-white/20 animate-fade-in">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/ramakrushnamohapatra/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 transition-colors hover:scale-110 transform"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/techwith.ram/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 transition-colors hover:scale-110 transform"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://github.com/Ramakm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 transition-colors hover:scale-110 transform"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://x.com/techwith_ram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 transition-colors hover:scale-110 transform"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
              
              <div className="flex flex-col items-center space-y-2 text-sm">
                <a 
                  href="https://topmate.io/ramakrushna_mohapatra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 font-medium underline transition-colors hover:scale-105 transform"
                >
                  📚 Get 1:1 Guidance
                </a>
                <a 
                  href="https://coff.ee/Ramakrushna" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 font-medium underline transition-colors hover:scale-105 transform"
                >
                  ☕ Buy me a coffee
                </a>
              </div>
              
              <p className="text-white/60 text-sm text-center">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
