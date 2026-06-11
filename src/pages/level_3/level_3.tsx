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

  const handleNextLevel = () => {
    navigate(routes.level_4);
  };

  return (
    <div className="level-3-page">
      <header>
        <h1>Livello 3: la linea del tempo</h1>
        <p>
          La memoria a breve termine l'abbiamo testata... ma con 39 anni di
          ricordi, com'è messa quella a lungo termine? 🧠 Rimetti i 5 eventi
          nell'ordine giusto, dal più vecchio al più recente!
        </p>
      </header>

      <section>
        <TimelineGame onGameStatusChange={handleGameStatusChange} />
      </section>

      {gameFinished && (
        <section className="level-3-completed">
          <h2>Memoria di ferro!</h2>
          <p>
            Hai ricostruito la nostra linea del tempo senza un'esitazione. Ma il
            gioco non è finito: ci sono ancora i tuoi riflessi da mettere alla
            prova!
          </p>
          <button onClick={handleNextLevel}>Vai al livello 4</button>
        </section>
      )}
    </div>
  );
};

export { Level_3 };
