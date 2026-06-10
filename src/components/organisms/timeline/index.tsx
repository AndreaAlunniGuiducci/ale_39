import React, { useState, useEffect } from "react";
import "./timeline.css";

interface TimelineEvent {
  id: number;
  label: string;
  /** Anno usato per stabilire l'ordine corretto (nascosto fino alla vittoria). */
  year: number;
  emoji?: string;
}

interface TimelineGameProps {
  events?: TimelineEvent[];
  onGameStatusChange?: (result: "win" | "lose" | undefined) => void;
}

const DEFAULT_EVENTS: TimelineEvent[] = [
  { id: 1, label: "Sei nata tu", year: 1987, emoji: "🎂" },
  { id: 2, label: "Il diploma", year: 2006, emoji: "🎓" },
  { id: 3, label: "Il primo lavoro", year: 2010, emoji: "💼" },
  { id: 4, label: "Ci siamo conosciuti", year: 2015, emoji: "❤️" },
  { id: 5, label: "Il tuo 39° compleanno", year: 2026, emoji: "🎉" },
];

const shuffle = (events: TimelineEvent[]): TimelineEvent[] => {
  const shuffled = [...events];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const isOrdered = (events: TimelineEvent[]): boolean =>
  events.every((e, i) => i === 0 || events[i - 1].year <= e.year);

const TimelineGame: React.FC<TimelineGameProps> = ({
  events = DEFAULT_EVENTS,
  onGameStatusChange,
}) => {
  const buildShuffled = (): TimelineEvent[] => {
    let next = shuffle(events);
    while (isOrdered(next)) next = shuffle(events);
    return next;
  };

  const [items, setItems] = useState<TimelineEvent[]>(buildShuffled);
  const [checked, setChecked] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    onGameStatusChange?.(won ? "win" : undefined);
  }, [won, onGameStatusChange]);

  const move = (index: number, direction: -1 | 1) => {
    if (won) return;
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setChecked(false);
  };

  const verify = () => {
    setChecked(true);
    if (isOrdered(items)) setWon(true);
  };

  const newGame = () => {
    setWon(false);
    setChecked(false);
    setItems(buildShuffled());
  };

  return (
    <div className="timeline-game">
      <h2>Metti in ordine</h2>
      <p>Ordina i 5 eventi dal più vecchio al più recente</p>

      {!won && (
        <>
          <ul className="timeline-list">
            {items.map((event, index) => (
              <li key={event.id} className="timeline-item">
                <span className="timeline-index">{index + 1}</span>
                <span className="timeline-label">
                  {event.emoji && (
                    <span className="timeline-emoji">{event.emoji}</span>
                  )}
                  {event.label}
                </span>
                <span className="timeline-controls">
                  <button
                    type="button"
                    className="timeline-move"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label="Sposta su"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    className="timeline-move"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    aria-label="Sposta giù"
                  >
                    ▼
                  </button>
                </span>
              </li>
            ))}
          </ul>

          {checked && !isOrdered(items) && (
            <p className="timeline-feedback">
              Non è ancora l'ordine giusto, riprova! 🤔
            </p>
          )}

          <button type="button" onClick={verify}>
            Verifica
          </button>
        </>
      )}

      {won && (
        <div className="timeline-win">
          <h1>Ordine perfetto! 🥳</h1>
          <ul className="timeline-list solved">
            {items.map((event) => (
              <li key={event.id} className="timeline-item">
                <span className="timeline-year">{event.year}</span>
                <span className="timeline-label">
                  {event.emoji && (
                    <span className="timeline-emoji">{event.emoji}</span>
                  )}
                  {event.label}
                </span>
              </li>
            ))}
          </ul>
          <p>Hai ricostruito la linea del tempo nell'ordine giusto! 🎂</p>
          <button type="button" onClick={newGame}>
            Gioca di nuovo
          </button>
        </div>
      )}
    </div>
  );
};

export default TimelineGame;
