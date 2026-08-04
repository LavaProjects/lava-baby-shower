import React from 'react';
import { TbBallFootball, TbBabyBottle } from 'react-icons/tb';

const CONFETTI_ITEMS = [
  // Top area
  { type: 'ball', top: '3%', left: '3%', size: 'w-10 h-10', color: '#0284c7', delay: '0s', dur: '6s', rot: 'rotate-12' },
  { type: 'ball', top: '8%', right: '4%', size: 'w-12 h-12', color: '#db2777', delay: '1.2s', dur: '7s', rot: '-rotate-12' },
  { type: 'bottle', top: '16%', left: '4%', size: 'w-11 h-11', color: '#f472b6', delay: '0.8s', dur: '6.5s', rot: 'rotate-45' },
  { type: 'bottle', top: '24%', right: '5%', size: 'w-10 h-10', color: '#38bdf8', delay: '2s', dur: '5.5s', rot: '-rotate-45' },

  // Mid area
  { type: 'bottle', top: '33%', left: '3%', size: 'w-12 h-12', color: '#ec4899', delay: '1.5s', dur: '7.5s', rot: 'rotate-12' },
  { type: 'ball', top: '42%', right: '3%', size: 'w-14 h-14', color: '#0284c7', delay: '0.4s', dur: '6.2s', rot: '-rotate-12' },
  { type: 'ball', top: '50%', left: '5%', size: 'w-9 h-9', color: '#38bdf8', delay: '2.5s', dur: '8s', rot: 'rotate-45' },
  { type: 'bottle', top: '58%', right: '4%', size: 'w-11 h-11', color: '#db2777', delay: '1s', dur: '6.8s', rot: '-rotate-45' },

  // Lower area
  { type: 'ball', top: '67%', left: '4%', size: 'w-12 h-12', color: '#f472b6', delay: '1.8s', dur: '7.2s', rot: 'rotate-12' },
  { type: 'bottle', top: '75%', right: '5%', size: 'w-10 h-10', color: '#0284c7', delay: '0.6s', dur: '5.8s', rot: '-rotate-12' },
  { type: 'bottle', top: '84%', left: '3%', size: 'w-11 h-11', color: '#38bdf8', delay: '2.2s', dur: '6.6s', rot: 'rotate-45' },
  { type: 'ball', top: '91%', right: '4%', size: 'w-12 h-12', color: '#ec4899', delay: '1.1s', dur: '7.4s', rot: '-rotate-45' },
];

export function SoccerConfettiBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {CONFETTI_ITEMS.map((item, idx) => {
        const IconComponent = item.type === 'ball' ? TbBallFootball : TbBabyBottle;
        return (
          <div
            key={idx}
            className={`absolute ${item.size} ${item.rot} opacity-40 animate-float drop-shadow-md`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animationDelay: item.delay,
              animationDuration: item.dur
            }}
          >
            <IconComponent className="w-full h-full" style={{ color: item.color }} />
          </div>
        );
      })}
    </div>
  );
}
