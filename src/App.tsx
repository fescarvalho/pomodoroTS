import './App.css';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTimer={5}
        shortRestTime={10}
        longRestTime={50}
        cycles={4}
      />
    </div>
  );
}

export default App;
