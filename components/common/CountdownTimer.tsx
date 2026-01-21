'use client';

import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/lib/utils';

interface CountdownTimerProps {
  endDate: string;
  className?: string;
}

export default function CountdownTimer({ endDate, className = '' }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeRemaining) {
    return <span className={className}>Auction ended</span>;
  }

  const { days, hours, minutes, seconds } = timeRemaining;

  if (days > 0) {
    return (
      <span className={className} data-testid="countdown-timer">
        {days}d {hours}h {minutes}m
      </span>
    );
  }

  return (
    <span className={className} data-testid="countdown-timer">
      {hours}h {minutes}m {seconds}s
    </span>
  );
}
