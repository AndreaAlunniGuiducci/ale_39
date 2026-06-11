import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BalloonsGame from "../../components/organisms/balloons";
import { routes } from "../../utils/routes";
import "./level_4.css";

const Level_4 = () => {
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

  const handleHome = () => {
    navigate(routes.home);
  };

  return (
    <div className="level-4-page">
      <header>
        <h1>Livello 4: acchiappa i palloncini</h1>
        <p>
          A 39 anni i riflessi sono ancora scattanti? 🎈 Tocca i palloncini
          prima che volino via!
        </p>
      </header>

      <section>
        <BalloonsGame onGameStatusChange={handleGameStatusChange} />
      </section>

      {gameFinished && (
        <section className="level-4-completed">
          <h2>{gameResult === "win" ? "Riflessi al top!" : "Ci sei quasi!"}</h2>
          <p>
            {gameResult === "win"
              ? "Hai dimostrato di avere riflessi da campionessa. Pronta per il gran finale!"
              : "I palloncini sono velocissimi! Riprova quando vuoi, oppure prosegui al livello successivo."}
          </p>
          <button onClick={handleHome}>Torna alla home</button>
        </section>
      )}
    </div>
  );
};

export { Level_4 };
