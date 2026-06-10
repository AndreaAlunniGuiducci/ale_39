import React, { useState, useEffect, useMemo } from "react";
import "./Puzzle.css";

interface PuzzleProps {
  /** Immagine da ricomporre. Default: una torta di compleanno. */
  imageUrl?: string;
  /** Numero di tessere per lato (3 = griglia 3x3). Default 3. */
  gridSize?: number;
  onGameStatusChange?: (result: "win" | "lose" | undefined) => void;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80";

const shuffle = (array: number[]): number[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const isSolved = (tiles: number[]): boolean =>
  tiles.every((tile, index) => tile === index);

const Puzzle: React.FC<PuzzleProps> = ({
  imageUrl = DEFAULT_IMAGE,
  gridSize = 3,
  onGameStatusChange,
}) => {
  const total = gridSize * gridSize;

  const buildShuffled = (): number[] => {
    const ordered = Array.from({ length: total }, (_, i) => i);
    let next = shuffle(ordered);
    // Evita di partire già risolto.
    while (isSolved(next)) next = shuffle(ordered);
    return next;
  };

  const [tiles, setTiles] = useState<number[]>(buildShuffled);
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (isSolved(tiles)) setWon(true);
  }, [tiles]);

  useEffect(() => {
    onGameStatusChange?.(won ? "win" : undefined);
  }, [won, onGameStatusChange]);

  const handleTileClick = (position: number) => {
    if (won) return;

    if (selected === null) {
      setSelected(position);
      return;
    }

    if (selected === position) {
      setSelected(null);
      return;
    }

    setTiles((prev) => {
      const next = [...prev];
      [next[selected], next[position]] = [next[position], next[selected]];
      return next;
    });
    setMoves((m) => m + 1);
    setSelected(null);
  };

  const newGame = () => {
    setWon(false);
    setSelected(null);
    setMoves(0);
    setTiles(buildShuffled());
  };

  const tileStyle = useMemo(
    () => (pieceIndex: number): React.CSSProperties => {
      const row = Math.floor(pieceIndex / gridSize);
      const col = pieceIndex % gridSize;
      return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
        backgroundPosition: `${(col * 100) / (gridSize - 1)}% ${
          (row * 100) / (gridSize - 1)
        }%`,
      };
    },
    [imageUrl, gridSize]
  );

  return (
    <div className="puzzle-game">
      <h2>Ricomponi l'immagine</h2>
      <p>Mosse: {moves}</p>

      {!won && (
        <>
          <div
            className="puzzle-board"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {tiles.map((pieceIndex, position) => (
              <button
                key={position}
                type="button"
                className={`puzzle-tile ${
                  selected === position ? "selected" : ""
                } ${pieceIndex === position ? "correct" : ""}`}
                style={tileStyle(pieceIndex)}
                onClick={() => handleTileClick(position)}
                aria-label={`Tessera in posizione ${position + 1}`}
              />
            ))}
          </div>
          <p className="puzzle-hint">
            Tocca due tessere per scambiarle e ricomporre l'immagine 🎁
          </p>
          <button type="button" onClick={newGame}>
            Mescola di nuovo
          </button>
        </>
      )}

      {won && (
        <div className="puzzle-win">
          <h1>Immagine ricomposta! 🥳</h1>
          <img className="puzzle-preview" src={imageUrl} alt="Immagine ricomposta" />
          <p>Bravissima! Hai rimesso insieme tutti i pezzi in {moves} mosse 🎂</p>
          <button type="button" onClick={newGame}>
            Gioca di nuovo
          </button>
        </div>
      )}
    </div>
  );
};

export default Puzzle;
