import { secondsToTime } from '../utils/seconds-to-time';

interface Props {
  mainTime: number;
}
export function Timer({ mainTime }: Props): JSX.Element {
  return <div className="timer">{secondsToTime(mainTime)}</div>;
}
