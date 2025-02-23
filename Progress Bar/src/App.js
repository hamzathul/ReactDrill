import { useEffect, useState } from "react";
import "./styles.css";

const ProgressBar = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [progress]);

  return (
    <div className="outer">
      <div
        className="inner"
        style={{
          // width: `${progress}%`,
          transform: `translateX(${animatedProgress - 100}%)`,
        }}
        role="progressbar" // for accessibility
        area-valuemin="0" // for accessibility
        area-valuemax="100" // for accessibility
        area-valuenow={progress} // for accessibility
      >
        <span>{animatedProgress}%</span>
      </div>
    </div>
  );
};

export default function App() {
  const progresses = [0, 25, 50, 75, 100];
  return (
    <div className="App">
      <h1>Progress Bar</h1>

      {progresses.map((progress) => (
        <ProgressBar progress={progress} />
      ))}
    </div>
  );
}
