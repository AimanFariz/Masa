import React, { useState, useEffect } from 'react';
import ninonino from '../sounds/ninonino.mp3';

export default function Timer() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [running, setRunning] = useState(false);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [soundAlarm, setSoundAlarm] = useState(false);
  const [audio, setAudio] = useState(null); // Store audio instance

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 10 : 0)); // countdown
      }, 10);
    } else {
      clearInterval(interval);
    }

    // Check if time is zero to trigger sound
    if (time === 0 && running) {
      setSoundAlarm(true);
    }

    return () => {
      clearInterval(interval);
    };
  }, [running, time]);

 // Play sound when time reaches zero
  // Play sound when time reaches zero
  useEffect(() => {
    if (soundAlarm) {
      const alarm = new Audio(ninonino);
      alarm.loop = true; // Enable continuous looping
      setAudio(alarm); // Save the audio object to state
      alarm.play();
      setSoundAlarm(false); // Reset soundAlarm to prevent multiple triggers
    }
  }, [soundAlarm]);

  // Function to initialize time from input
  const initializeTime = () => {
    const totalMilliseconds =
      inputHours * 3600000 + inputMinutes * 60000 + inputSeconds * 1000;
    setTime(totalMilliseconds);
    setRunning(true); // Start the timer once time is set
    setPaused(false); // Reset paused state
  };

  // Function to format time
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}:${('0' + milliseconds).slice(-2)}`;
  };

  const pauseTimer = () => {
    setRunning(false);
    setPaused(true);
  };

  const resumeTimer = () => {
    setRunning(true);
    setPaused(false);
  };

  const resetTimer = () => {
    setRunning(false);
    setPaused(false);
    setTime(0);
    if (audio) {
        audio.pause(); // Stop the audio
        audio.currentTime = 0; // Reset the audio to the start
      }
  };

  return (
    <div className='border border-blue-600 border-x flex flex-col items-center justify-center bg-white px-3 py-2 rounded-lg'>
      <input
        placeholder='Add Timer Name'
        className='text-center text-lg py-2 font-semibold text-blue-600'
      />

      {/* Initial time input */}
      <div className='flex flex-row gap-3 pt-1'>
        <input
          placeholder='0'
          type='number'
          className='w-7 text-center text-lg'
          onChange={(e) => setInputHours(Number(e.target.value))}
        />
        <p>:</p>
        <input
          placeholder='0'
          type='number'
          className='w-7 text-center text-lg'
          onChange={(e) => setInputMinutes(Number(e.target.value))}
        />
        <p>:</p>
        <input
          placeholder='0'
          type='number'
          className='w-7 text-center text-lg'
          onChange={(e) => setInputSeconds(Number(e.target.value))}
        />
      </div>

      <div className='text-xl font-semibold py-2'>
        {/* Display formatted time */}
        <span>{formatTime(time)}</span>
      </div>

      <div className='flex flex-row justify-between gap-2'>
        {running ? (
          <button className='border rounded py-2 px-2' onClick={pauseTimer}>
            Pause
          </button>
        ) : paused ? (
          <button className='border rounded py-2 px-2' onClick={resumeTimer}>
            Resume
          </button>
        ) : (
          <button className='border rounded py-2 px-2' onClick={initializeTime}>
            Start
          </button>
        )}
        <button className='border rounded py-2 px-2' onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}
