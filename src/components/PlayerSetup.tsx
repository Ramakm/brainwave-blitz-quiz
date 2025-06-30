import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Timer, Trophy, BookOpen, Linkedin, Instagram, Github, Coffee, ExternalLink, Twitter } from 'lucide-react';

interface PlayerSetupProps {
  onStartQuiz: (name: string, quizType: 'quick' | 'extended') => void;
  onShowLeaderboard: () => void;
  onShowPapers: () => void;
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartQuiz, onShowLeaderboard, onShowPapers }) => {
  const [playerName, setPlayerName] = useState<string>('');

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ramakrushna-mohapatra/',
      icon: <Linkedin size={20} />,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ramakrushna.mohapatra/',
      icon: <Instagram size={20} />,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ramakrushnamohapatra',
      icon: <Github size={20} />,
    },
    {
      name: 'Topmate',
      url: 'https://topmate.io/ramakrushna_mohapatra',
      icon: <Coffee size={20} />,
    },
    {
      name: 'X',
      url: 'https://x.com/techwith_ram',
      icon: <Twitter size={20} />, // Using Twitter icon to represent X
    },
  ];

  const handleStartQuiz = (quizType: 'quick' | 'extended') => {
    if (playerName.trim()) {
      onStartQuiz(playerName.trim(), quizType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4 font-inter relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-emerald-500 animate-float`}
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white font-poppins mb-4 animate-fade-in">
            AI & ML Interview Quiz Prep
          </h1>
          <p className="text-emerald-200 text-xl animate-fade-in">
            Test your knowledge of Artificial Intelligence and Machine Learning
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white font-poppins mb-2">
              🧠 AI & ML Quiz Challenge
            </CardTitle>
            <p className="text-emerald-200 text-lg">
              Test your knowledge of Artificial Intelligence and Machine Learning
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Enter your name to start"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 text-lg py-3"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={() => handleStartQuiz('quick')}
                disabled={!playerName.trim()}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 text-lg font-semibold font-poppins transition-all duration-300 transform hover:scale-105"
              >
                <Timer className="mr-2" size={24} />
                ⚡ Quick Quiz (60s, 20 Questions)
              </Button>

              <Button
                onClick={() => handleStartQuiz('extended')}
                disabled={!playerName.trim()}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white py-4 text-lg font-semibold font-poppins transition-all duration-300 transform hover:scale-105"
              >
                <Trophy className="mr-2" size={24} />
                🎯 Extended Quiz (5min, 60 Questions)
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Button
                onClick={onShowLeaderboard}
                variant="outline"
                className="border-white/30 bg-emerald-400 text-white hover:bg-white/10 py-3 font-semibold font-poppins transition-all duration-300"
              >
                <Trophy className="mr-2" size={20} />
                View Leaderboard
              </Button>

              <Button
                onClick={onShowPapers}
                variant="outline"
                className="border-white/30 text-white bg-emerald-400 hover:bg-black/10 py-3 font-semibold font-poppins transition-all duration-300"
              >
                <BookOpen className="mr-2" size={20} />
                Read Papers
              </Button>

              <Button
                onClick={() => window.open('https://topmate.io/ramakrushna_mohapatra', '_blank')}
                variant="outline"
                className="border-white/30 bg-emerald-400 text-white hover:bg-white/10 py-3 font-semibold font-poppins transition-all duration-300"
              >
                <ExternalLink className="mr-2" size={20} />
                Get Guidance
              </Button>
            </div>

            {/* Social Links Section */}
            <div className="flex justify-center space-x-6 mt-8 animate-fade-in">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-200 transition-colors duration-200"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Developer Credit */}
            <p className="text-center text-white/60 mt-4 animate-fade-in">
              Developed by Ramakrushna Mohapatra
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
