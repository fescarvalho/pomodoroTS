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
  const [timeCounting, settimeCounting] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
  }, [working]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWorking = () => {
    setWorking(true);
    settimeCounting(true);
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
          text="Ola"
          className="button"
          onClick={() => console.log('1')}
        />
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          className="button"
          onClick={() => settimeCounting(!timeCounting)}
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
