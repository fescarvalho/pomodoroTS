import { useCallback, useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './Buttons';
import { Timer } from './Timer';

import bellStart from '../sounds/bell-start.mp3';
import bellStop from '../sounds/bell-finish.mp3';
import { secondsToTime } from '../utils/seconds-to-time';

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellStop);

interface Props {
  pomodoroTimer: number | any;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTimer);
  const [working, setWorking] = useState(false);
  const [timeCounting, setTimeCounting] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWorking = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTimer);
    audioStartWorking.play();
  }, [
    setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.pomodoroTimer,
  ]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
      audioStopWorking.play();
    },
    [setTimeCounting, setWorking, setResting, setMainTime, props.longRestTime],
  );

  useEffect(() => {
    if (working) {
      document.body.classList.add('working');
    }
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }
    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWorking();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    configureWorking,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>
        Você esta:{' '}
        <span className={working ? 'work' : ''}>
          {working ? 'Trabalhando' : 'Descansando'}
        </span>
      </h2>
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
        <p>
          Ciclos Conluidos: <span>{completedCycles}</span>{' '}
        </p>
        <p>
          Horas Trabalhadas: <span>{secondsToTime(fullWorkingTime)}</span>
        </p>
        <p>
          Numeros de Pomodoros Concluidos: <span>{numberOfPomodoros}</span>
        </p>
      </div>
    </div>
  );
}
