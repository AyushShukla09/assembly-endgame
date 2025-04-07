import React from "react";
import { languages } from "./languages";

export default function Hangman() {

    const [currentWord, setCurrentWord] = React.useState("React")

  const languageElements = languages.map((ele) => {
    const style = {
      background: ele.backgroundColor,
      color: ele.color,
    };
    return (
      <span 
        className="chips" 
        style={style}
        key={ele.name}>
        {ele.name}
      </span>
    );
  });
  const letters = currentWord.split('').map((ele,index)=>{
    return (
        <span key={index}>{ele.toUpperCase()}</span>
    )
  })
  const alphabets = 'abcdefghijklmnopqurstuvwxyz'
  const keyboard = alphabets.split('').map((val,index)=>{
    return (
      <button key={index}>{val.toUpperCase()}</button>
    )
  })
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
      <section className="word">
        {letters}
      </section>
      <section className="keyboard">
        {keyboard}
      </section>
      <button className="new-game">New Game</button>
    </main>
  );
}
