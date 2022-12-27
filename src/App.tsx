import { useState } from 'react';
import './App.css';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTimer={1200}
        shortRestTime={300}
        longRestTime={1000}
        cycles={4}
      />
    </div>
  );
}

export default App;
