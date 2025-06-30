
import React from 'react';
import { Card } from '@/components/ui/card';

interface TimerProps {
  timeLeft: number;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}:${remainingSeconds.toString().padStart(2, '0')}` : `${seconds}s`;
  };

  const getMaxTime = (timeLeft: number) => {
    return timeLeft > 60 ? 300 : 60;
  };

  const maxTime = getMaxTime(timeLeft);
  const percentage = (timeLeft / maxTime) * 100;
  const isUrgent = timeLeft <= 10;

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-4">
      <div className="flex items-center space-x-3">
        <div className="text-white font-bold text-xl font-poppins">
          {formatTime(timeLeft)}
        </div>
        <div className="w-32 h-2 bg-gray-600 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              isUrgent ? 'bg-red-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </Card>
  );
};
