"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isPassed) {
    return (
      <div className="text-center py-4 px-6 bg-rose-50/70 border border-rose-200 rounded-2xl max-w-sm mx-auto">
        <p className="text-rose-800 font-medium">Acara bahagia telah berlangsung.</p>
        <p className="text-xs text-rose-600 mt-1">Terima kasih atas segala doa restu Anda.</p>
      </div>
    );
  }

  const items = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4 my-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center w-16 h-18 sm:w-20 sm:h-22 bg-white/90 backdrop-blur-md border border-rose-100 shadow-md rounded-2xl p-2.5 transition-transform hover:scale-105"
        >
          <span className="text-2xl sm:text-3xl font-bold font-serif text-rose-950">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-rose-800/70 font-medium mt-0.5">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

