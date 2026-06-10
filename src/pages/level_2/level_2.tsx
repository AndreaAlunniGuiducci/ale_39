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

  const handleHome = () => {
    navigate(routes.home);
  };

  return (
    <div className="level-2-page">
      <header>
        <h1>Secondo livello: il puzzle</h1>
        <p>
          Ben fatto! In questo livello devi ricomporre l'immagine scambiando le
          tessere. Rimetti insieme tutti i pezzi!
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
            livello. Buon 39° compleanno!
          </p>
          <button onClick={handleHome}>Torna alla home</button>
        </section>
      )}
    </div>
  );
};

export { Level_2 };
