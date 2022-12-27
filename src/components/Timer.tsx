import { secondsToMinutes } from '../utils/seconds-to-minutes';

interface Props {
  mainTime: number;
}
export function Timer({ mainTime }: Props): JSX.Element {
  return <div className="timer">{secondsToMinutes(mainTime)}</div>;
}
