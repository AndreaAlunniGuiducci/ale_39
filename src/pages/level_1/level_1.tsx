import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MemoryGame from "../../components/organisms/memoryGame";
import { routes } from "../../utils/routes";

const Level_1 = () => {
  const [gameFinished, setGameFinished] = useState(false);
  const [gameResult, setGameResult] = useState<"win" | "lose" | undefined>();
  const navigate = useNavigate();

  const handleGameStatusChange = (result: "win" | "lose" | undefined) => {
    if (result === undefined) {
      setGameFinished(false);
      setGameResult(undefined);
      return;
    }
    setGameResult(result);
    setGameFinished(true);
  };

  const handleNextLevel = () => {
    navigate(routes.level_2);
  };

  return (
    <div className="level-1-page">
      <header>
        <h1>Primo livello: gioco della memoria</h1>
        <p>
          Questo è il primo livello del gioco creato per il 39° compleanno della tua ragazza.
          Scopri le coppie prima di esaurire le mosse.
        </p>
      </header>

      <section>
        <MemoryGame onGameStatusChange={handleGameStatusChange} />
      </section>

      {gameFinished && (
        <section className="level-1-completed">
          <h2>{gameResult === "win" ? "Complimenti!" : "Ottimo lavoro!"}</h2>
          <p>
            {gameResult === "win"
              ? "Hai superato il primo livello con successo. Ora possiamo andare avanti al prossimo livello!"
              : "Hai terminato il livello 1. Quando sei pronta, prosegui verso il livello successivo."}
          </p>
          <button onClick={handleNextLevel}>Vai al livello 2</button>
        </section>
      )}
    </div>
  );
};

export { Level_1 };
