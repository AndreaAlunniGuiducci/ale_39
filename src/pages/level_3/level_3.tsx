import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimelineGame from "../../components/organisms/timeline";
import { routes } from "../../utils/routes";
import "./level_3.css";

const Level_3 = () => {
  const [gameFinished, setGameFinished] = useState(false);
  const navigate = useNavigate();

  const handleGameStatusChange = (result: "win" | "lose" | undefined) => {
    if (result === undefined) {
      setGameFinished(false);
      return;
    }
    setGameFinished(true);
  };

  const handleHome = () => {
    navigate(routes.home);
  };

  return (
    <div className="level-3-page">
      <header>
        <h1>Terzo livello: la linea del tempo</h1>
        <p>
          Ultimo livello! Rimetti i 5 eventi nell'ordine giusto, dal più vecchio
          al più recente.
        </p>
      </header>

      <section>
        <TimelineGame onGameStatusChange={handleGameStatusChange} />
      </section>

      {gameFinished && (
        <section className="level-3-completed">
          <h2>Hai completato il gioco!</h2>
          <p>
            Hai superato tutti e tre i livelli e ricostruito la nostra linea del
            tempo. Buon 39° compleanno, amore mio!
          </p>
          <button onClick={handleHome}>Torna alla home</button>
        </section>
      )}
    </div>
  );
};

export { Level_3 };
