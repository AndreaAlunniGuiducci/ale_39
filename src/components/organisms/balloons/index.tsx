import React, { useState, useEffect, useRef } from "react";
import "./balloons.css";

interface BalloonsGameProps {
  /** Punteggio da raggiungere per vincere. Default 15. */
  target?: number;
  /** Durata della partita in secondi. Default 30. */
  duration?: number;
  onGameStatusChange?: (result: "win" | "lose" | undefined) => void;
}

interface Balloon {
  id: number;
  x: number; // % orizzontale
  y: number; // % verticale
  emoji: string;
}

type Status = "idle" | "playing" | "win" | "lose";

const EMOJIS = ["🎈", "🎈", "🎈", "🎂", "🎁", "🎉"];
const SPAWN_MS = 700;
const LIFETIME_MS = 1600;

const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const BalloonsGame: React.FC<BalloonsGameProps> = ({
  target = 15,
  duration = 30,
  onGameStatusChange,
}) => {
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    onGameStatusChange?.(
      status === "win" ? "win" : status === "lose" ? "lose" : undefined
    );
  }, [status, onGameStatusChange]);

  // Conto alla rovescia
  useEffect(() => {
    if (status !== "playing") return;
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  // Fine tempo
  useEffect(() => {
    if (status !== "playing" || timeLeft > 0) return;
    setBalloons([]);
    setStatus((prev) => (prev === "playing" ? "lose" : prev));
  }, [timeLeft, status]);

  // Comparsa palloncini
  useEffect(() => {
    if (status !== "playing") return;
    const interval = setInterval(() => {
      const id = ++idRef.current;
      const balloon: Balloon = {
        id,
        x: randomBetween(6, 82),
        y: randomBetween(8, 78),
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      };
      setBalloons((prev) => [...prev, balloon]);
      setTimeout(() => {
        setBalloons((prev) => prev.filter((b) => b.id !== id));
      }, LIFETIME_MS);
    }, SPAWN_MS);
    return () => clearInterval(interval);
  }, [status]);

  // Vittoria al raggiungimento del punteggio
  useEffect(() => {
    if (status === "playing" && score >= target) {
      setBalloons([]);
      setStatus("win");
    }
  }, [score, target, status]);

  const start = () => {
    setScore(0);
    setTimeLeft(duration);
    setBalloons([]);
    setStatus("playing");
  };

  const popBalloon = (id: number) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="balloons-game">
      <h2>Acchiappa i palloncini</h2>

      {status === "idle" && (
        <>
          <p className="balloons-intro">
            Tocca {target} palloncini in {duration} secondi! 🎈
          </p>
          <button type="button" onClick={start}>
            Via!
          </button>
        </>
      )}

      {status === "playing" && (
        <>
          <div className="balloons-hud">
            <span className="balloons-badge">🎈 {score}/{target}</span>
            <span className="balloons-badge time">⏱️ {timeLeft}s</span>
          </div>
          <div className="balloons-field">
            {balloons.map((b) => (
              <button
                key={b.id}
                type="button"
                className="balloon"
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
                onClick={() => popBalloon(b.id)}
                aria-label="Palloncino"
              >
                {b.emoji}
              </button>
            ))}
          </div>
        </>
      )}

      {status === "win" && (
        <div className="balloons-result">
          <h1>Riflessi felini! 🥳</h1>
          <p>
            Hai acchiappato {target} palloncini al volo. A 39 anni sei ancora un
            fulmine! ⚡
          </p>
          <button type="button" onClick={start}>
            Gioca di nuovo
          </button>
        </div>
      )}

      {status === "lose" && (
        <div className="balloons-result">
          <h1>Quasi quasi!</h1>
          <p>
            Tempo scaduto: ne hai presi {score} su {target}. I palloncini sono
            volati via... ma puoi sempre riprovare! 🎈
          </p>
          <button type="button" onClick={start}>
            Riprova
          </button>
        </div>
      )}
    </div>
  );
};

export default BalloonsGame;
