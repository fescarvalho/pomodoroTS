import { useState } from 'react';
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

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>Hellow, what time?</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text="Ola"
          className="button"
          onClick={() => console.log('1')}
        />
        <Button
          text="Ola"
          className="button"
          onClick={() => console.log('1')}
        />
        <Button
          text="Ola"
          className="button"
          onClick={() => console.log('1')}
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
