import React from "react";
import clsx from "clsx";
import { languages } from "./languages";
import { getFarewellText, getRandomWord } from "./utils.js";

export default function Hangman() {
    const [currentWord, setCurrentWord] = React.useState(getRandomWord());
    const [guessedLetter, setGuessedLetter] = React.useState([]);

    const wrongGuessCount = guessedLetter.filter(
        letter => !currentWord.includes(letter)).length
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameWon = currentWord.split("").every(letter => guessedLetter.includes(letter))
    const isGameOver = (wrongGuessCount == languages.length - 1) || isGameWon
    const lastGuessedLetter = guessedLetter[guessedLetter.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    const alphabets = "abcdefghijklmnopqrstuvwxyz";

    function handleGuessedLetter(newLetter) {
        setGuessedLetter((prev) => {
            return !prev.includes(newLetter) ? [...prev, newLetter] : [...prev];
        });
    }
    const languageElements = languages.map((ele, index) => {
        const style = {
            background: ele.backgroundColor,
            color: ele.color,
        };
        const isLanguageLost = index < wrongGuessCount
        const isLangLostClass = clsx("chip", isLanguageLost && "lost")
        return (
            <span
                className={isLangLostClass}
                style={style} key={ele.name}>
                {ele.name}
            </span>
        );
    });

    const letters = currentWord.split("").map((ele, index) => {
        const letterClassName = clsx(isGameLost && !guessedLetter.includes(ele) && 'missed-letter')
        return <span key={index} className={letterClassName}>
            {(guessedLetter.includes(ele)) || isGameLost ? ele : null}
        </span>;
    });

    const keyboard = alphabets.split("").map((val) => {
        const isGuessed = guessedLetter.includes(val);
        const isCorrect = isGuessed && currentWord.includes(val);
        const isWrong = !currentWord.includes(val) && isGuessed;
        const buttonClass = clsx({
            correct: isCorrect,
            wrong: isWrong,
        });
        return (
            <button
                key={val}
                className={buttonClass}
                disabled={isGameOver}
                onClick={() => handleGuessedLetter(val)}
            >
                {val.toUpperCase()}
            </button>
        );
    });

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    const startNewGame = () => {
        setCurrentWord(getRandomWord())
        setGuessedLetter([])
    }

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>
                    Guess the work in under 8 attempts to keep the programming world safe
                    from Assembly
                </p>
            </header>
            <section className={gameStatusClass}>
                {
                    (isGameOver) ?
                        ((isGameWon) ?
                            <>
                                <h2>You Win</h2>
                                <p>Well Done!</p>
                            </> :
                            <>
                                <h2>Game Over</h2>
                                <p>Learn Assembly!</p>
                            </>) :
                        <>
                            {isLastGuessIncorrect ? <p className="farewell-message">
                                {getFarewellText(languages[wrongGuessCount - 1].name)}
                            </p> : null}
                        </>
                }
            </section>
            <section className="language-chips">{languageElements}</section>
            <section className="word">{letters}</section>
            <section className="keyboard">{keyboard}</section>
            {(isGameOver || isGameWon) && <button className="new-game" onClick={startNewGame}> New Game </button>}
        </main>
    );
}
