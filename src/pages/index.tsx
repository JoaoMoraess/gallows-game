/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */

import React, { useEffect, useRef, useState } from 'react';

import { Condemned } from '../components/condemned';
import { Gallows } from '../components/gallows';

const Index = () => {
  const inputLetterRef = useRef<HTMLInputElement>(null);
  const [wordState, setWordState] = useState<string[]>([]);
  const [discoveredLetters, setDiscoveredLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);

  const removeSpaces = (values: string[]) => {
    return values.filter((item) => item !== ' ');
  };

  const resetGame = () => {
    setWrongLetters([]);
    setWordState([]);
    setDiscoveredLetters([]);
  };

  const gameOver = (win: boolean) => {
    win ? alert('Congratulation, you win!') : alert('You died!');
    resetGame();
  };

  useEffect(() => {
    if (wrongLetters.length >= 6) {
      gameOver(false);
    }
  }, [wrongLetters]);

  useEffect(() => {
    const discoveredLettersCount = removeSpaces(wordState).map((letter) =>
      removeSpaces(discoveredLetters).includes(letter)
    );
    const missingLetter = discoveredLettersCount.includes(false);

    if (missingLetter === false && discoveredLetters.length > 0) {
      gameOver(true);
    }
  }, [discoveredLetters]);

  const checkAlreadyTyped = (value: string): boolean | undefined => {
    if (value !== ' ') {
      return wrongLetters.includes(value)
        ? true
        : !!discoveredLetters.includes(value);
    }
  };

  const error = (value: string) => {
    if (value !== ' ') {
      setWrongLetters((old) => [...old, value]);
    }
  };

  const success = (value: string) => {
    if (value !== ' ') {
      setDiscoveredLetters((old) => [...old, value]);
    }
  };

  const initGame = () => {
    const word = prompt('What is your word?');
    const formatedWord = word?.split('');
    word ? setWordState(formatedWord!) : alert('you need to choose a word');
  };

  const compareString = (e: React.FormEvent) => {
    e.preventDefault();

    const inputLetter = inputLetterRef.current!.value;

    if (
      inputLetter === undefined ||
      inputLetter === null ||
      inputLetter === ''
    ) {
      inputLetterRef.current!.value = '';
      return;
    }

    const alreadyTyped = checkAlreadyTyped(inputLetter);

    if (alreadyTyped) {
      alert('already typed letter');
    } else {
      removeSpaces(wordState).includes(inputLetter)
        ? success(inputLetter)
        : error(inputLetter);
    }

    inputLetterRef.current!.value = '';
  };

  const tryWord = () => {
    const word = prompt('what is the word?');
    if (word === wordState.join('')) {
      gameOver(true);
    }
  };

  return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl text-blue-400">Gallows game</h1>
      <div className="flex flex-row gap-4">
        <div className="w-20 h-96 border-2 border-blue-500 flex flex-col items-center">
          <h3 className="text-red-500">Errors: {wrongLetters.length}</h3>
          <div className="w-full pt-10 overflow-auto flex flex-col items-center justify-around gap-2">
            {wrongLetters.map((letter, index) => (
              <h2 className="text-2xl text-gray-700" key={`${letter}-${index}`}>
                {letter}
              </h2>
            ))}
          </div>
        </div>
        <div className="w-96 h-96 p-9 border-2 border-blue-700 flex items-center justify-center flex-col">
          <Gallows>
            <Condemned errorsCount={wrongLetters.length} />
          </Gallows>
          <div className="w-full flex justify-around items-center h-24">
            {wordState.map((letter: string, index: number) => {
              return letter !== ' ' ? (
                <h3
                  key={`${letter}-${index}`}
                  className="border-b-2 border-gray-700 p-1"
                >
                  {discoveredLetters.includes(letter) && letter}
                </h3>
              ) : (
                <div className="w-3"> </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="gap-4 pt-6 flex justify-between items-center w-60">
        <button
          className="p-2 bg-blue-400 rounded-xl flex items-center"
          onClick={wordState.length ? () => resetGame() : () => initGame()}
        >
          {wordState.length ? 'restart' : 'start'}
        </button>
        <button
          className="p-2 bg-blue-400 rounded-xl flex items-center"
          onClick={wordState.length ? () => tryWord() : () => null}
        >
          try
        </button>
        <form className="flex w-28" onSubmit={(e) => compareString(e)}>
          {wordState.length > 0 && (
            <>
              <input
                autoFocus
                ref={inputLetterRef}
                maxLength={1}
                type="text"
                className="text-center text-2xl p-4 w-16 h-14 border-2 border-blue-600 rounded-l-lg"
              />
              <button
                className="p-1 bg-blue-600 w-10 rounded-r-xl"
                type="submit"
              >
                Ok 👍
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Index;
