/* eslint-disable react/jsx-key */
"use client";

import {useState, MouseEvent, JSX} from 'react';
import {FaGithub, FaLanguage, FaLeftLong, FaRightLong, FaUpLong} from 'react-icons/fa6';

type Direction = 'left' | 'right' | 'straight';
type Language = 'nl' | 'en';
type Words = Direction;
const dictionaries = new Map<Language, Map<Words, string>>([
  ['en', new Map<Direction, string>([
    ['left', 'left'],
    ['right', 'right'],
    ['straight', 'straight ahead'],
  ])],
  ['nl', new Map<Direction, string>([
    ['left', 'links'],
    ['right', 'rechts'],
    ['straight', 'rechtdoor'],
  ])],
]);

const icons = new Map<Direction, JSX.Element>([
  ['left', <FaLeftLong />],
  ['right', <FaRightLong />],
  ['straight', <FaUpLong />],
])

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const dictionary = dictionaries.get(language)!;
  const [direction, setDirection] = useState<Direction | undefined>('left');
  const [colorIndex, setColorIndex] = useState(0);

  const numberOfColors = 5;
  const backgroundColor = direction === undefined ? 'bg-gray-600' : ['bg-green-700', 'bg-blue-700', 'bg-red-700', 'bg-purple-700', 'bg-orange-700'][colorIndex];
  const secondaryTextColor = direction === undefined ? 'text-white' : ['text-green-300', 'text-blue-300', 'text-red-300', 'text-purple-300', 'text-orange-300'][colorIndex];

  return (
    <main
      className={`flex min-h-screen flex-col transition-colors duration-500 items-center py-8 lg:py-12 ${backgroundColor}`}
      onClick={(e: MouseEvent) => {
        if (!e.defaultPrevented && direction !== undefined) {
          setDirection(undefined);
          setTimeout(() => {
            setColorIndex((colorIndex + 1) % numberOfColors);
            const value = Math.random();
            let next: Direction = 'straight';
            if (value < 0.25) {
              next = 'left';
            } else if (value < 0.5) {
              next = 'right';
            }
            setDirection(next);
          }, 500);
        }
      }}
    >
      <div className='flex w-full justify-between px-8 lg:px-20 text-xl lg:text-2xl'>
        <h1 className={`${secondaryTextColor} transition-colors duration-500 font-bold`}>detour</h1>
        <div className='flex gap-4'>
          <FaLanguage className={`${secondaryTextColor} transition-colors duration-500`} onClick={(e: MouseEvent) => {
            setLanguage(language === 'nl' ? 'en' : 'nl');
            e.preventDefault();
          }} />
          <a href='https://github.com/simonkarman/detour' className={`${secondaryTextColor} transition-colors duration-500`}><FaGithub /></a>
        </div>
      </div>
      <div className='grow flex flex-col justify-center'>
        {direction && <div className='flex flex-col items-center gap-12 lg:gap-16'>
          <p className={`${secondaryTextColor} text-8xl lg:text-8xl font-bold text-center`}>{icons.get(direction)}</p>
          <h1 className='text-6xl lg:text-8xl font-bold text-white text-center'>{dictionary.get(direction)}</h1>
        </div>}
        {!direction && <svg className="animate-spin h-32 w-32 lg:h-48 lg:w-48 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>}
      </div>
    </main>
  )
}
