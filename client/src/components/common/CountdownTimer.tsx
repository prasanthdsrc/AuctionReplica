import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(endDate: string): TimeLeft | null {
  const difference = new Date(endDate).getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function CountdownTimer({ endDate, className = '', size = 'md' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calculateTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) {
    return (
      <div className={`text-destructive font-semibold ${className}`} data-testid="countdown-ended">
        Auction Ended
      </div>
    );
  }

  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-2',
    lg: 'text-base gap-3',
  };

  const boxClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
  };

  const labelClasses = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]} ${className}`} data-testid="countdown-timer">
      <div className="text-center">
        <div className={`${boxClasses[size]} bg-foreground text-background rounded-md flex items-center justify-center font-bold`}>
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <span className={`${labelClasses[size]} text-muted-foreground uppercase mt-1 block`}>Days</span>
      </div>
      <span className="text-muted-foreground font-bold">:</span>
      <div className="text-center">
        <div className={`${boxClasses[size]} bg-foreground text-background rounded-md flex items-center justify-center font-bold`}>
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className={`${labelClasses[size]} text-muted-foreground uppercase mt-1 block`}>Hours</span>
      </div>
      <span className="text-muted-foreground font-bold">:</span>
      <div className="text-center">
        <div className={`${boxClasses[size]} bg-foreground text-background rounded-md flex items-center justify-center font-bold`}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className={`${labelClasses[size]} text-muted-foreground uppercase mt-1 block`}>Mins</span>
      </div>
      <span className="text-muted-foreground font-bold">:</span>
      <div className="text-center">
        <div className={`${boxClasses[size]} bg-primary text-primary-foreground rounded-md flex items-center justify-center font-bold`}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <span className={`${labelClasses[size]} text-muted-foreground uppercase mt-1 block`}>Secs</span>
      </div>
    </div>
  );
}
