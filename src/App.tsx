/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import './css/tailwind.css'

import { Condemned } from './components/condemned'
import { Gallows } from './components/gallows'
import { ShowMessage } from './components/show-message'

const App: React.FC = () => {
  const inputLetterRef = useRef<HTMLInputElement>(null)

  const [wordState, setWordState] = useState<string[]>([])
  const [discoveredLetters, setDiscoveredLetters] = useState<string[]>([])
  const [wrongLetters, setWrongLetters] = useState<string[]>([])
  const [isEnd, setIsEnd] = useState(false)
  const [msg, setMsg] = useState<{ msg: string; type: string } | null>(null)

  const sanitizeWorld = (values: string[]): string[] => {
    return values
      .filter((item) => item !== ' ')
      .map((word) => word.toUpperCase())
  }

  const resetGame = (): void => {
    setWrongLetters([])
    setWordState([])
    setDiscoveredLetters([])
    setIsEnd(false)
  }

  const gameOver = (win: boolean, resetFunction: () => void): void => {
    setIsEnd(true)
    win
      ? setMsg({ msg: 'Congratulations you win!', type: 'win' })
      : setMsg({ msg: 'You died', type: 'lost' })
    setTimeout(() => resetFunction(), 1000)
  }

  useEffect(() => {
    if (wrongLetters.length >= 6) {
      gameOver(false, resetGame)
    }
  }, [wrongLetters])

  const checkWin = (): boolean => {
    const discoveredLettersCount = sanitizeWorld(wordState).map((letter) =>
      sanitizeWorld(discoveredLetters).includes(letter)
    )
    const missingLetter = discoveredLettersCount.includes(false)
    return !!(!missingLetter && discoveredLetters.length > 0)
  }

  useEffect(() => {
    const isWin = checkWin()
    !!isWin && gameOver(true, resetGame)
  }, [checkWin, discoveredLetters])

  const checkAlreadyTyped = (
    value: string,
    wrongs: string[],
    discovered: string[]
  ): boolean => {
    if (value !== ' ') {
      return wrongs.includes(value) ? true : !!discovered.includes(value)
    }
    return false
  }

  const error = (value: string): void => {
    if (value !== ' ') {
      setWrongLetters((old) => [...old, value])
    }
  }

  const success = (value: string): void => {
    if (value !== ' ') {
      setDiscoveredLetters((old) => [...old, value])
    }
  }

  const initRound = (): void => {
    const word = prompt('What is your word?')?.toUpperCase()

    const formatedWord = word?.split('')
    !word || word === ' '
      ? setMsg({ msg: 'you need to choose a word', type: 'warning' })
      : setWordState(formatedWord!)
    console.log(formatedWord)
  }

  const compareString = (e: React.FormEvent): void => {
    e.preventDefault()

    const inputLetter = inputLetterRef.current!.value.toUpperCase()

    if (
      inputLetter === undefined ||
      inputLetter === null ||
      inputLetter === ''
    ) {
      inputLetterRef.current!.value = ''
      return
    }

    const alreadyTyped = checkAlreadyTyped(
      inputLetter,
      wrongLetters,
      discoveredLetters
    )

    if (alreadyTyped) {
      setMsg({ msg: 'Wrong letter', type: 'warning' })
    } else {
      sanitizeWorld(wordState).includes(inputLetter)
        ? success(inputLetter)
        : error(inputLetter)
    }

    inputLetterRef.current!.value = ''
  }

  const tryWord = (): void => {
    const word = prompt('what is the word?')
    if (word === wordState.join('')) {
      gameOver(true, resetGame)
    }
  }

  return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col items-center justify-center">
      {!!msg && (
        <ShowMessage msg={msg.msg} type={msg.type} setStateFn={setMsg} />
      )}
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
        <div className="min-w-96 h-96 p-11 border-2 border-blue-700 flex items-center justify-center flex-col">
          <Gallows>
            <Condemned
              endGame={isEnd}
              win={checkWin()}
              errorsCount={wrongLetters.length}
            />
          </Gallows>
          <div className="w-full flex justify-center gap-5 items-center h-24">
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
              )
            })}
          </div>
        </div>
      </div>
      <div className="gap-4 pt-6 flex justify-between items-center w-60">
        <button
          className="p-2 bg-blue-400 rounded-xl flex items-center"
          onClick={wordState.length ? () => resetGame() : () => initRound()}
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
                placeholder="-"
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
  )
}

export default App
