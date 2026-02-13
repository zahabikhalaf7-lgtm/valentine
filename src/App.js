import { useMemo, useState } from "react";
import "./App.css";

const OPENING_LINES = [
  "Hai kamu, ada kejutan kecil di sini...",
  "Bunga-bunganya mekar khusus untuk kamu.",
  "Makasih udah hadir dan bikin hari-hari jadi manis.",
  "Jadi... mau rayain Valentine bareng aku?",
];

function App() {
  const [lineIndex, setLineIndex] = useState(0);
  const [noStyle, setNoStyle] = useState({});
  const [accepted, setAccepted] = useState(false);

  const flowers = useMemo(
    () =>
      Array.from({ length: 5 }, (_, idx) => ({
        id: idx,
        left: `${12 + idx * 17}%`,
        delay: `${idx * 0.28}s`,
        duration: `${3.9 + (idx % 2) * 0.6}s`,
        scale: `${0.9 + (idx % 3) * 0.12}`,
        stemHeight: `${120 + (idx % 3) * 20}px`,
        type: "tulip",
      })),
    []
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 26 }, (_, idx) => ({
        id: idx,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2.2}s`,
        duration: `${1.5 + Math.random() * 1.4}s`,
        size: `${12 + Math.random() * 20}px`,
      })),
    []
  );

  const currentLine = OPENING_LINES[lineIndex];
  const isLastLine = lineIndex === OPENING_LINES.length - 1;

  const nextLine = () => {
    if (!isLastLine) {
      setLineIndex((prev) => prev + 1);
    }
  };

  const runAwayNoButton = () => {
    const nextX = Math.floor(Math.random() * 230) - 115;
    const nextY = Math.floor(Math.random() * 180) - 90;
    setNoStyle({
      transform: `translate(${nextX}px, ${nextY}px) rotate(${Math.floor(
        Math.random() * 16 - 8
      )}deg)`,
    });
  };

  return (
    <main className={`app ${accepted ? "celebrate" : ""}`}>
      <div className="bg-glow" />
      <section className="card">
        <h1>Happy Valentine</h1>

        <div className="flower-field" aria-hidden="true">
          {flowers.map((flower) => (
            <span
              key={flower.id}
              className={`flower ${flower.type}`}
              style={{
                left: flower.left,
                animationDelay: flower.delay,
                animationDuration: flower.duration,
                "--flower-scale": flower.scale,
                "--stem-height": flower.stemHeight,
              }}
            >
              <span className="stem" />
              <span className="leaf leaf-left" />
              <span className="leaf leaf-right" />
              <span className="blossom">
                {flower.type === "tulip" ? (
                  <>
                    <span className="t-petal t-center" />
                    <span className="t-petal t-left" />
                    <span className="t-petal t-right" />
                  </>
                ) : (
                  <>
                    <span className="r-layer r-outer" />
                    <span className="r-layer r-mid" />
                    <span className="r-layer r-inner" />
                    <span className="r-core" />
                  </>
                )}
              </span>
            </span>
          ))}
        </div>

        {!accepted ? (
          <div className="content">
            <p>{currentLine}</p>

            {!isLastLine && (
              <button className="btn btn-next" onClick={nextLine}>
                Lanjut
              </button>
            )}

            {isLastLine && (
              <div className="actions">
                <button className="btn btn-yes" onClick={() => setAccepted(true)}>
                  Setuju
                </button>
                <button
                  className="btn btn-no"
                  style={noStyle}
                  onMouseEnter={runAwayNoButton}
                  onClick={runAwayNoButton}
                  onTouchStart={runAwayNoButton}
                >
                  Tidak
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="content accepted-copy">
            <p>Yay! Makasih udah bilang setuju.</p>
            <p>Semoga Valentine kita penuh tawa, cerita, dan momen manis.</p>
            <p>Love fireworks untuk kamu!</p>
          </div>
        )}
      </section>

      {accepted && (
        <div className="heart-fireworks" aria-hidden="true">
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="heart"
              style={{
                left: heart.left,
                animationDelay: heart.delay,
                animationDuration: heart.duration,
                "--heart-size": heart.size,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
