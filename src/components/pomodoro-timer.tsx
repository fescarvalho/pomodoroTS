import { useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './Buttons';
import { Timer } from './Timer';

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
