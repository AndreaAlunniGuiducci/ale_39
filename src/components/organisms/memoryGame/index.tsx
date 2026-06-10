import React, { useState, useEffect } from "react";
import "./MemoryGame.css";

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onGameStatusChange?: (result: "win" | "lose" | undefined) => void;
}

const initialCards = [
  { id: 1, value: "🎂", isFlipped: false, isMatched: false },
  { id: 2, value: "🎂", isFlipped: false, isMatched: false },
  { id: 3, value: "🎈", isFlipped: false, isMatched: false },
  { id: 4, value: "🎈", isFlipped: false, isMatched: false },
  { id: 5, value: "🎁", isFlipped: false, isMatched: false },
  { id: 6, value: "🎁", isFlipped: false, isMatched: false },
  { id: 7, value: "🎉", isFlipped: false, isMatched: false },
  { id: 8, value: "🎉", isFlipped: false, isMatched: false },
  { id: 9, value: "🥳", isFlipped: false, isMatched: false },
  { id: 10, value: "🥳", isFlipped: false, isMatched: false },
  { id: 11, value: "🍰", isFlipped: false, isMatched: false },
  { id: 12, value: "🍰", isFlipped: false, isMatched: false },
  { id: 13, value: "🕯️", isFlipped: false, isMatched: false },
  { id: 14, value: "🕯️", isFlipped: false, isMatched: false },
  { id: 15, value: "🎊", isFlipped: false, isMatched: false },
  { id: 16, value: "🎊", isFlipped: false, isMatched: false },
  { id: 17, value: "🎀", isFlipped: false, isMatched: false },
  { id: 18, value: "🎀", isFlipped: false, isMatched: false },
  { id: 19, value: "🍾", isFlipped: false, isMatched: false },
  { id: 20, value: "🍾", isFlipped: false, isMatched: false },
];

const MemoryGame: React.FC<MemoryGameProps> = ({ onGameStatusChange }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(25);
  const [winGame, setWinGame] = useState<boolean | undefined>();

  useEffect(() => {
    setCards(shuffleCards(initialCards));
  }, []);

  useEffect(() => {
    const cardsWon = cards.filter((c) => c.isMatched);
    if (cardsWon.length === initialCards.length) {
      setWinGame(true);
    }
  }, [cards]);

  useEffect(() => {
    if (moves < 1) {
      setWinGame(false);
    }
  }, [moves]);

  useEffect(() => {
    onGameStatusChange?.(winGame ? "win" : winGame === false ? "lose" : undefined);
  }, [winGame, onGameStatusChange]);

  const shuffleCards = (cards: Card[]): Card[] => {
    let shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const newGame = () => {
    setWinGame(undefined);
    const newGameCards = shuffleCards(
      initialCards.map((c) => ({
        ...c,
        isFlipped: false,
        isMatched: false,
      }))
    );
    setCards(newGameCards);
    setMoves(25);
  };

  const handleCardClick = (card: Card) => {
    if (flippedCards.length === 2 || card.isFlipped || card.isMatched) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;
      if (firstCard.value === card.value) {
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.value === card.value ? { ...c, isMatched: true } : c
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(moves - 1);
    }
  };

  return (
    <div className="memory-game">
      <h2>Gioco delle Coppie</h2>
      <p>Mosse: {moves}</p>
      {winGame === undefined && (
        <div className="cards-container">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card ${card.isFlipped ? "flipped" : ""}`}
              onClick={() => handleCardClick(card)}
            >
              <div className="card-inner">
                <div className="card-front">🎂</div>
                <div className="card-back">{card.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {winGame === true && (
        <div>
          <h1>Complimenti!</h1>
          <p>
            Hai completato il gioco con successo! Nonostante i 39 hai ancora una buona memoria! 🎉
          </p>
        </div>
      )}
      {winGame === false && (
        <div>
          <h1>Non è andata!</h1>
          <p>
            Hai esaurito le mosse a disposizione. Ma non preoccuparti, puoi
            sempre riprovare!
          </p>
          <p>
            Non perdere la speranza, è il tuo compleanno e come regalo hai tentativi infiniti
          </p>
          <button onClick={newGame}>Gioca di nuovo</button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
