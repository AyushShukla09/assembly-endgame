import React from "react";
import clsx from "clsx";
import { languages } from "./languages";

export default function Hangman() {
    const [currentWord, setCurrentWord] = React.useState("react");
    const [guessedLetter, setGuessedLetter] = React.useState([]);

    const wrongGuessCount = guessedLetter.filter(
        letter => !currentWord.includes(letter)).length

    


    const alphabets = "abcdefghijklmnopqrstuvwxyz";

    function handleGuessedLetter(newLetter) {
        setGuessedLetter((prev) => {
            return !prev.includes(newLetter) ? [...prev, newLetter] : [...prev];
        });
    }

    const languageElements = languages.map((ele,index) => {
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
        return <span key={index}>{(guessedLetter.includes(ele)) ? ele : null}</span>;
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
                onClick={() => handleGuessedLetter(val)}
            >
                {val.toUpperCase()}
            </button>
        );
    });
    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>
                    Guess the work in under 8 attempts to keep the programming world safe
                    from Assembly
                </p>
            </header>
            <section className="game-status">
                <h2>You Win</h2>
                <p>Well Done!</p>
            </section>
            <section className="language-chips">{languageElements}</section>
            <section className="word">{letters}</section>
            <section className="keyboard">{keyboard}</section>
            <button className="new-game">New Game</button>
        </main>
    );
}
