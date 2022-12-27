import { useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './Buttons';
import { Timer } from './Timer';

import bellStart from '../sounds/bell-start.mp3';
import bellStop from '../sounds/bell-finish.mp3';

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellStop);

interface Props {
  pomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTimer);
  const [working, setWorking] = useState(false);
  const [timeCounting, setTimeCounting] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWorking = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTimer);
    audioStartWorking.play();
  };

  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
    audioStopWorking.play();
  };

  return (
    <div className="pomodoro">
      <h2>Hellow, what time?</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text="Working"
          className="button"
          onClick={() => configureWorking()}
        />
        <Button
          text="Rest"
          className="button"
          onClick={() => configureRest(false)}
        />
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          className={!working && !resting ? 'hidden' : ''}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>
      <div className="details">
        <p>detalhes</p>
        <p>detalhes</p>
        <p>detalhes</p>
        <p>detalhes</p>
      </div>
    </div>
  );
}
