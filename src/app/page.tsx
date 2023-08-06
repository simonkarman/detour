"use client";

import {useState} from 'react';

type Direction = 'left' | 'right' | 'straight';
const languages: { [language: string]: Map<Direction, string> } = {
  'nl': new Map<Direction, string>([
    ['left', 'links'],
    ['right', 'rechts'],
    ['straight', 'rechtdoor'],
  ]),
}

export default function Home() {
  const language = languages['nl'];
  const [direction, setDirection] = useState<Direction | undefined>('left');
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['bg-green-600', 'bg-blue-600', 'bg-red-600', 'bg-purple-600', 'bg-orange-600']
  return (
    <main
      className={`flex min-h-screen flex-col transition-colors items-center justify-between p-24 ${direction === undefined ? 'bg-gray-600' : colors[colorIndex]}`}
      onClick={() => {
        if (direction !== undefined) {
          setDirection(undefined);
          setTimeout(() => {
            setColorIndex((colorIndex + 1) % colors.length);
            const value = Math.random();
            let next: Direction = 'straight';
            if (value < 0.25) {
              next = 'left';
            } else if (value < 0.5) {
              next = 'right';
            }
            setDirection(next);
          }, 300);
        }
      }}
    >
      {direction && <h1 className='text-8xl font-bold text-white'>{language.get(direction)}</h1>}
      {!direction && <svg className="animate-spin h-32 w-32 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>}
    </main>
  )
}
