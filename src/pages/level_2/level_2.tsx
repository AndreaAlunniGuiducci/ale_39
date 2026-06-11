import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Puzzle from "../../components/organisms/puzzle";
import { routes } from "../../utils/routes";
import "./level_2.css";

const Level_2 = () => {
  const [gameFinished, setGameFinished] = useState(false);
  const navigate = useNavigate();

  const handleGameStatusChange = (result: "win" | "lose" | undefined) => {
    if (result === undefined) {
      setGameFinished(false);
      return;
    }
    setGameFinished(true);
  };

  const handleNextLevel = () => {
    navigate(routes.level_3);
  };

  return (
    <div className="level-2-page">
      <header>
        <h1>Livello 2: il puzzle</h1>
        <p>
          Dicono che dopo i 39 la vista cali un pochino... 👀 Mettiamola alla
          prova: ricomponi l'immagine scambiando le tessere!
        </p>
      </header>

      <section>
        <Puzzle onGameStatusChange={handleGameStatusChange} />
      </section>

      {gameFinished && (
        <section className="level-2-completed">
          <h2>Hai completato il puzzle!</h2>
          <p>
            Complimenti, hai ricomposto l'immagine e superato anche il secondo
            livello. Pronta per l'ultimo?
          </p>
          <button onClick={handleNextLevel}>Vai al livello 3</button>
        </section>
      )}
    </div>
  );
};

export { Level_2 };
