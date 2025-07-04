'use client'
import { Settings, Play, Pause, SkipForward, ArrowLeft, Save } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export let StudyTime = 0;

export function Pomodoro() {
    const [time, setTime] = useState(40 * 60); 
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    
    // Settings state
    const [sessionTime, setSessionTime] = useState(40);
    const [breakTime, setBreakTime] = useState(10);
    const [longBreakTime, setLongBreakTime] = useState(20);
    const [longBreakAfter, setLongBreakAfter] = useState(4);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('/beep.mp3');
        audioRef.current.preload = 'auto';
    }, []);

    useEffect(() => {
        if (isRunning && time > 0) {
            intervalRef.current = setInterval(() => {
                setTime(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        playSound();
                        
                        if (!isBreak) {
                            const newSessionCount = sessionCount + 1;
                            setSessionCount(newSessionCount);
                            StudyTime += sessionTime;
                            
                            const isLongBreak = newSessionCount % longBreakAfter === 0;
                            setIsBreak(true);
                            setTime((isLongBreak ? longBreakTime : breakTime) * 60);
                        } else {
                            setIsBreak(false);
                            setTime(sessionTime * 60);
                        }
                        
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, time, isBreak, sessionCount, sessionTime, breakTime, longBreakTime, longBreakAfter]);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlay = () => {
        setIsRunning(!isRunning);
    };

    const handleSkip = () => {
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (!isBreak) {
            const newSessionCount = sessionCount + 1;
            setSessionCount(newSessionCount);
            const isLongBreak = newSessionCount % longBreakAfter === 0;
            setIsBreak(true);
            setTime((isLongBreak ? longBreakTime : breakTime) * 60);
        } else {
            setIsBreak(false);
            setTime(sessionTime * 60);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsBreak(false);
        setTime(sessionTime * 60);
    };

    const saveSettings = () => {
        // In a real app, save to localStorage here
        // localStorage.setItem('pomodoroSettings', JSON.stringify({
        //     sessionTime, breakTime, longBreakTime, longBreakAfter
        // }));
        
        // Reset timer with new settings
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsBreak(false);
        setTime(sessionTime * 60);
        setShowSettings(false);
    };

    const getCircleColor = () => {
        if (time === (isBreak ? (sessionCount % longBreakAfter === 0 ? longBreakTime : breakTime) * 60 : sessionTime * 60)) {
            return 'border-gray-400'; 
        }
        return isBreak ? 'border-sky-400' : 'border-red-400';
    };

    const getProgress = () => {
        const totalTime = isBreak ? 
            (sessionCount % longBreakAfter === 0 ? longBreakTime : breakTime) * 60 : 
            sessionTime * 60;
        return ((totalTime - time) / totalTime) * 100;
    };

    if (showSettings) {
        return (
            <div className="relative">
                <div className="bg-gradient-to-br from-neutral-700/30 backdrop-blur-lg to-zinc-900 to-75% border border-white/20 drop-shadow-amber-600/20 drop-shadow-lg rounded-4xl h-[20rem] w-[20rem] p-6">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => setShowSettings(false)} className="text-white hover:text-gray-300">
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="text-white font-bold">Settings</h2>
                        <button onClick={saveSettings} className="text-white hover:text-gray-300">
                            <Save size={20} />
                        </button>
                    </div>
                    
                    <div className="space-y-3 text-white text-sm">
                        <div className="flex justify-between items-center">
                            <label>Session (min)</label>
                            <input 
                                type="number" 
                                value={sessionTime} 
                                onChange={(e) => setSessionTime(Number(e.target.value))}
                                className="w-16 px-2 py-1 bg-white/10 rounded border border-white/20 text-center"
                                min="1"
                            />
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <label>Break (min)</label>
                            <input 
                                type="number" 
                                value={breakTime} 
                                onChange={(e) => setBreakTime(Number(e.target.value))}
                                className="w-16 px-2 py-1 bg-white/10 rounded border border-white/20 text-center"
                                min="1"
                            />
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <label>Long Break (min)</label>
                            <input 
                                type="number" 
                                value={longBreakTime} 
                                onChange={(e) => setLongBreakTime(Number(e.target.value))}
                                className="w-16 px-2 py-1 bg-white/10 rounded border border-white/20 text-center"
                                min="1"
                            />
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <label>Long Break After</label>
                            <input 
                                type="number" 
                                value={longBreakAfter} 
                                onChange={(e) => setLongBreakAfter(Number(e.target.value))}
                                className="w-16 px-2 py-1 bg-white/10 rounded border border-white/20 text-center"
                                min="1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="bg-gradient-to-br  from-neutral-700/30 backdrop-blur-lg to-zinc-900 to-75% border border-white/20 drop-shadow-amber-600/20 drop-shadow-lg rounded-4xl h-[20rem] w-[20rem] flex items-center justify-center">
                <div className="relative">
                    <div className="absolute  right-2">
                        <button 
                            onClick={() => setShowSettings(true)}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <Settings size={20} />
                        </button>
                    </div>
                    
                    <div className={`relative h-[15rem] w-[15rem] flex items-center justify-center rounded-full border-8 ${getCircleColor()} transition-colors duration-300`}>
                        <div 
                            className="absolute inset-0 rounded-full border-8 border-transparent"
                            style={{
                                background: `conic-gradient(${isBreak ? '#38bdf8' : '#f87171'} transparent )`
                            }}
                        />
                        
                        <div className="text-center space-y-1 text-white z-10">
                            <h2 className="font-extrabold text-4xl">{formatTime(time)}</h2>
                            <h2 className="text-lg">
                                {isBreak ? 
                                    (sessionCount % longBreakAfter === 0 ? '#longbreak' : '#break') : 
                                    '#study'
                                }
                            </h2>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center  px-4">
                        <button 
                            onClick={handlePlay}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            {isRunning ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                        
                        <button 
                            onClick={handleSkip}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <SkipForward size={24} />
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}